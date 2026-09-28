/**
 * Turns a project's `content` field (MDX-style JSX stored as a Hygraph
 * string) into a plain JSON tree at build time. The page renders that tree
 * with <PostContent>, so no MDX compiler or `eval` ships to the browser.
 *
 * Only what the posts use is supported: markdown, the post components, and
 * attribute or child expressions that are literals or lookups into the
 * render scope (`images[1].url`, `theme.red`, `color1`). Anything else fails
 * the build with the offending line, rather than rendering wrongly.
 */
import type { Expression, Program } from "estree";
import type { Element, ElementContent, Root, RootContent } from "hast";
import type {
  RootContent as MdastContent,
  Parent as MdastParent,
  Paragraph,
} from "mdast";
import type {} from "mdast-util-mdx";
import type {
  MdxJsxFlowElementHast,
  MdxJsxTextElementHast,
} from "mdast-util-mdx-jsx";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Node } from "unist";

/** A path into the render scope, e.g. `["images", 1, "url"]`. */
export interface ScopeRef {
  ref: (string | number)[];
}

export type PostValue = string | number | boolean | null | ScopeRef;

export interface PostElement {
  tag: string;
  props: Record<string, PostValue>;
  children: PostNode[];
}

export type PostNode = string | ScopeRef | PostElement;

const whitespace = /^[\t\n\f\r ]*$/;

/** A paragraph's children, if it holds only JSX, expressions and spaces. */
function unravelParagraph(node: Paragraph): MdastContent[] | undefined {
  let hasMdx = false;
  for (const child of node.children) {
    if (
      child.type === "mdxJsxTextElement" ||
      child.type === "mdxTextExpression"
    ) {
      hasMdx = true;
    } else if (child.type !== "text" || !whitespace.test(child.value)) {
      return undefined;
    }
  }
  if (!hasMdx) return undefined;
  return node.children.flatMap((child): MdastContent[] => {
    if (child.type === "mdxJsxTextElement") {
      return [{ ...child, type: "mdxJsxFlowElement" } as MdastContent];
    }
    if (child.type === "mdxTextExpression") {
      return [{ ...child, type: "mdxFlowExpression" }];
    }
    return [];
  });
}

/**
 * Same as MDX's own unravel step: a paragraph holding only JSX, expressions
 * and whitespace (like a lone `<Title>...</Title>` line) becomes those
 * elements, instead of wrapping them in a <p>.
 */
function unravel(parent: MdastParent) {
  const children: MdastContent[] = [];
  for (const node of parent.children) {
    if ("children" in node) unravel(node);
    const unravelled =
      node.type === "paragraph" ? unravelParagraph(node) : undefined;
    children.push(...(unravelled ?? [node]));
  }
  parent.children = children as typeof parent.children;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(() => unravel)
  .use(remarkRehype, {
    passThrough: [
      "mdxJsxFlowElement",
      "mdxJsxTextElement",
      "mdxFlowExpression",
      "mdxTextExpression",
      "mdxjsEsm",
    ],
  });

class PostContentError extends Error {
  constructor(message: string, node?: Pick<Node, "position">) {
    const line = node?.position?.start.line;
    super(line ? `${message} (content line ${line})` : message);
  }
}

function evaluate(node: Expression): PostValue {
  switch (node.type) {
    case "Literal":
      if (
        typeof node.value === "string" ||
        typeof node.value === "number" ||
        typeof node.value === "boolean" ||
        node.value === null
      ) {
        return node.value;
      }
      break;
    case "Identifier":
      return { ref: [node.name] };
    case "MemberExpression": {
      if (node.object.type === "Super") break;
      const object = evaluate(node.object);
      if (typeof object !== "object" || object === null) break;
      let key: PostValue;
      if (node.computed) {
        if (node.property.type === "PrivateIdentifier") break;
        key = evaluate(node.property);
      } else if (node.property.type === "Identifier") {
        key = node.property.name;
      } else {
        break;
      }
      if (typeof key !== "string" && typeof key !== "number") break;
      return { ref: [...object.ref, key] };
    }
    case "UnaryExpression":
      if (node.operator === "-" && node.argument.type === "Literal") {
        const value = evaluate(node.argument);
        if (typeof value === "number") return -value;
      }
      break;
  }
  throw new PostContentError(
    `Unsupported expression ${node.type}${node.loc ? ` (content line ${node.loc.start.line})` : ""}`,
  );
}

function evaluateProgram(
  program: Program | null | undefined,
  node: Pick<Node, "position">,
): PostValue {
  const statement = program?.body[0];
  if (program?.body.length !== 1 || statement?.type !== "ExpressionStatement") {
    throw new PostContentError("Expected a single expression", node);
  }
  return evaluate(statement.expression);
}

function convertAttributes(
  element: MdxJsxFlowElementHast | MdxJsxTextElementHast,
): Record<string, PostValue> {
  const props: Record<string, PostValue> = {};
  for (const attribute of element.attributes) {
    if (attribute.type === "mdxJsxExpressionAttribute") {
      throw new PostContentError(
        "Spread attributes are not supported",
        element,
      );
    }
    const { value } = attribute;
    if (value === null || value === undefined) {
      props[attribute.name] = true;
    } else if (typeof value === "string") {
      props[attribute.name] = value;
    } else {
      props[attribute.name] = evaluateProgram(value.data?.estree, element);
    }
  }
  return props;
}

/** hast properties of plain markdown elements, as React props. */
function convertProperties(element: Element): Record<string, PostValue> {
  const props: Record<string, PostValue> = {};
  for (const [name, value] of Object.entries(element.properties)) {
    if (value === undefined || value === false) continue;
    if (Array.isArray(value)) {
      props[name] = value.join(" ");
    } else {
      props[name] = value;
    }
  }
  return props;
}

function convertChildren(
  children: readonly (RootContent | ElementContent)[],
  components: ReadonlySet<string>,
): PostNode[] {
  return children.flatMap((child) => convertNode(child, components));
}

function convertNode(
  node: RootContent | ElementContent,
  components: ReadonlySet<string>,
): PostNode[] {
  switch (node.type) {
    case "text":
      return [node.value];
    case "element":
      return [
        {
          tag: node.tagName,
          props: convertProperties(node),
          children: convertChildren(node.children, components),
        },
      ];
    case "mdxJsxFlowElement":
    case "mdxJsxTextElement": {
      if (node.name === null) {
        // A fragment (<>...</>) just contributes its children.
        return convertChildren(node.children, components);
      }
      const isComponent = /^[A-Z]/.test(node.name);
      if (isComponent && !components.has(node.name)) {
        throw new PostContentError(`Unknown component <${node.name}>`, node);
      }
      return [
        {
          tag: node.name,
          props: convertAttributes(node),
          children: convertChildren(node.children, components),
        },
      ];
    }
    case "mdxFlowExpression":
    case "mdxTextExpression": {
      const value = evaluateProgram(node.data?.estree, node);
      return value === null || typeof value === "boolean"
        ? []
        : [typeof value === "number" ? String(value) : value];
    }
    case "mdxjsEsm":
      throw new PostContentError("import/export is not supported", node);
    case "comment":
    case "doctype":
    case "raw":
      return [];
  }
  return [];
}

/**
 * Parses post content into a serializable tree. `components` lists the
 * capitalized tags the renderer knows; any other component fails the build.
 */
export function parsePostContent(
  source: string,
  components: Iterable<string>,
): PostNode[] {
  const mdast = processor.parse(source);
  const hast = processor.runSync(mdast) as Root;
  return convertChildren(hast.children, new Set(components));
}

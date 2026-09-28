import { type ComponentType, createElement, type ReactNode } from "react";
import type { PostNode, PostValue, ScopeRef } from "@/lib/postContent";

// Post components take differing props; the content decides which it passes.
// biome-ignore lint/suspicious/noExplicitAny: props come from CMS content
type PostComponents = Record<string, ComponentType<any>>;

interface PostContentProps {
  content: PostNode[];
  components: PostComponents;
  /** Values the content's expressions can read, e.g. `images`, `theme`. */
  scope: Record<string, unknown>;
}

function isRef(value: PostValue | PostNode): value is ScopeRef {
  return typeof value === "object" && value !== null && "ref" in value;
}

function resolve(ref: ScopeRef, scope: Record<string, unknown>): unknown {
  let value: unknown = scope;
  for (const key of ref.ref) {
    if (value === null || value === undefined) return undefined;
    value = (value as Record<string | number, unknown>)[key];
  }
  return value;
}

function renderNodes(
  nodes: PostNode[],
  components: PostComponents,
  scope: Record<string, unknown>,
): ReactNode[] {
  return nodes.map((node, index) => {
    if (typeof node === "string") return node;
    if (isRef(node)) return resolve(node, scope) as ReactNode;
    const props: Record<string, unknown> = { key: index };
    for (const [name, value] of Object.entries(node.props)) {
      props[name] = isRef(value) ? resolve(value, scope) : value;
    }
    const type = components[node.tag] ?? node.tag;
    const children = renderNodes(node.children, components, scope);
    return children.length > 0
      ? createElement(type, props, ...children)
      : createElement(type, props);
  });
}

/** Renders a tree from `parsePostContent` with the given components. */
export default function PostContent({
  content,
  components,
  scope,
}: PostContentProps) {
  return <>{renderNodes(content, components, scope)}</>;
}

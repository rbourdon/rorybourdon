import {
  animate,
  MotionConfig,
  type MotionValue,
  motion,
  type Transition,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react";
import styled, { useTheme } from "styled-components";
import MotionLink from "@/components/utils/MotionLink";
import { noDrag, noSelect } from "@/components/utils/styles";
import ArrowIcon from "../Icons/ArrowIcon";

const Bubble = styled(motion.li)`
  min-width: 80px;
  height: 40px;
  width: max-content;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${noSelect}
  position: relative;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
`;

const Outline = styled(motion.div)`
  height: calc(100% + 10px);
  position: absolute;
  width: calc(100% + 10px);
  border-radius: 30px;
  ${noSelect}
  pointer-events: none;
`;

const BubbleLink = styled(MotionLink)`
  ${noDrag}
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 27px;

  &:focus {
    outline: none;
  }
`;

const Title = styled(motion.p)`
  font-weight: 300;
  font-size: 1rem;
  width: max-content;
  height: min-content;
`;

const Arrow = styled(motion.div)`
  width: 11px;
  margin-left: 0px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  position: absolute;
`;

const arrowV: Variants = {
  hidden: {
    opacity: 0,
    right: 35,
  },
  hover: {
    opacity: 1,
    right: 17,
    transition: {
      delay: 0.05,
      type: "tween",
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

const titleV: Variants = {
  hidden: {
    x: 0,
    scale: 1,
  },
  visible: {
    x: 0,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover: {
    x: -9,
    scale: 1.02,
    transition: {
      delay: 0.05,
      type: "tween",
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

interface SkillBubbleProps {
  transition?: Transition;
  top?: boolean;
  bottom?: boolean;
  variants?: Variants;
  custom?: number;
  bgColor?: MotionValue<string>;
  hoverColor: { bg?: MotionValue<string>; text?: MotionValue<string> };
  select?: ((title: string) => void) | null;
  selected?: boolean;
  canHover?: boolean;
  outlineTransition?: Transition;
  title: string;
  id: string;
  children?: ReactNode;
}

export default function SkillBubble({
  transition = { type: "spring", stiffness: 30 },
  top = false,
  bottom = false,
  variants,
  custom = 0,
  bgColor,
  hoverColor,
  select = null,
  selected = false,
  canHover = true,
  outlineTransition = { type: "spring", stiffness: 30 },
  title,
  id,
}: SkillBubbleProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);
  const opacity = useMotionValue(bottom || top ? 0 : 1);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (top) {
      const exiting = animate(opacity, 0, { duration: 0.215 });
      return exiting.stop;
    } else if (bottom) {
      opacity.set(0);
    } else {
      const visible = animate(opacity, 1, { duration: 0.3 });
      return visible.stop;
    }
  }, [top, bottom, opacity]);

  const handleTap = () => {
    animateHover(0);
  };

  const handleHoverStart = () => {
    // Every caller passes `select`; the null default is never hit.
    select!(title);
    if (canHover && !hovering) {
      animateHover(1);
      setHovering(true);
    }
  };

  const handleHoverEnd = () => {
    animateHover(0);
    setHovering(false);
  };

  const disableLinkDrag = (e: SyntheticEvent | Event) => {
    e.preventDefault();
    if (hovering) {
      animateHover(0);
      setHovering(false);
    }
  };

  const animateHover = (t: number) => {
    animate(hover, t, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const backgroundColor = useTransform(
    // Mixed string/number inputs; the tuple type below reads them back.
    [
      bgColor || theme.primary_light,
      hoverColor?.bg || theme.teal,
      hover,
    ] as MotionValue<string | number>[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
  );

  const outlineColor = useTransform(
    [theme.primary_dark, hoverColor?.bg || theme.teal, hover] as MotionValue<
      string | number
    >[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
  );

  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "thin solid " + latestColor1,
  );

  // useTransform rather than useMotionTemplate: React Compiler can't compile
  // tagged templates with interpolations and would skip this component.
  const boxShadowNormal = useTransform(
    [theme.shadow_key, theme.shadow_ambient],
    ([key, ambient]) => `0px 0px 0px 0px ${key}, 0px 0px 0x 0px ${ambient}`,
  );

  const boxShadowHover = useTransform(
    [theme.shadow_key, theme.shadow_ambient],
    ([key, ambient]) => `1px 2px 0px 4px ${key}, 0px 0px 10px 5px ${ambient}`,
  );

  const boxShadow = useTransform(
    [boxShadowNormal, boxShadowHover, hover] as MotionValue<string | number>[],
    ([latestBoxShadowNormal, latestBoxShadowHover, latestHover]: (
      | string
      | number
    )[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestBoxShadowNormal as string, latestBoxShadowHover as string],
      ),
  );

  const outlineOffset = useTransform(hover, [0, 1], ["0px", "-7px"]);
  const outlineWidth = useTransform(hover, [0, 1], ["1px", "6px"]);

  const titleColor = useTransform(
    [
      theme.primary_verydark,
      hoverColor.text || theme.primary_dark,
      hover,
    ] as MotionValue<string | number>[],
    ([latestColor3, latestColor4, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor3 as string, latestColor4 as string],
      ),
  );

  return (
    <MotionConfig transition={transition}>
      <Bubble
        layoutId={`${id}_bubble`}
        onHoverStart={handleHoverStart}
        onTapStart={handleHoverStart}
        onTap={handleTap}
        onHoverEnd={handleHoverEnd}
        variants={variants}
        custom={custom}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
        style={{
          boxShadow,
          zIndex: selected ? 1 : 0,
          opacity,
          border,
          backgroundColor,
        }}
      >
        <BubbleLink
          href={`/skills/${id}`}
          scroll={false}
          draggable={false}
          onClick={canHover ? undefined : disableLinkDrag}
          onTapStart={disableLinkDrag}
          onDragStart={disableLinkDrag}
          initial="hidden"
          animate={hovering ? "hover" : "visible"}
        >
          <Title
            layoutId={`${id}_bubbleLinkTitle`}
            style={{ color: titleColor }}
            variants={titleV}
          >
            {title}
          </Title>
          {selected && hovering && (
            <Arrow variants={arrowV} style={{ color: titleColor, rotate: 90 }}>
              <ArrowIcon />
            </Arrow>
          )}
        </BubbleLink>
        {selected && (
          <Outline
            layoutId="bubbleOutline"
            style={{
              outlineColor: outlineColor,
              outlineWidth,
              outlineStyle: "solid",
              outlineOffset,
              borderRadius: "30px",
            }}
            transition={outlineTransition}
          />
        )}
      </Bubble>
    </MotionConfig>
  );
}

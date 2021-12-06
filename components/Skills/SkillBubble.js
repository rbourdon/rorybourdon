import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  MotionConfig,
  transform,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ArrowIcon from "../Icons/ArrowIcon";

const Bubble = styled(motion.li)`
  min-width: 80px;
  height: 40px;
  width: max-content;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
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
  user-select: none;
  pointer-events: none;
`;

const BubbleLink = styled(motion.a)`
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;
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

const arrowV = {
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

const titleV = {
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

export default function SkillBubble({
  transition = { type: "spring", stiffness: 30 },
  height = 37,
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
}) {
  const theme = useContext(ThemeContext);
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
    select(title);
    if (canHover && !hovering) {
      animateHover(1);
      setHovering(true);
    }
  };

  const handleHoverEnd = () => {
    animateHover(0);
    setHovering(false);
  };

  const disableLinkDrag = (e) => {
    e.preventDefault();
    if (hovering) {
      animateHover(0);
      setHovering(false);
    }
  };

  const animateHover = (t) => {
    animate(hover, t, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const backgroundColor = useTransform(
    [bgColor || theme.primary_light, hoverColor?.bg || theme.teal, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const outlineColor = useTransform(
    [theme.primary_dark, hoverColor?.bg || theme.teal, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "thin solid " + latestColor1
  );

  const boxShadowNormal = useMotionTemplate`0px 0px 0px 0px ${theme.shadow_key}, 0px 0px 0x 0px ${theme.shadow_ambient}`;

  const boxShadowHover = useMotionTemplate`1px 2px 0px 4px ${theme.shadow_key}, 0px 0px 10px 5px ${theme.shadow_ambient}`;

  const boxShadow = useTransform(
    [boxShadowNormal, boxShadowHover, hover],
    ([latestBoxShadowNormal, latestBoxShadowHover, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [latestBoxShadowNormal, latestBoxShadowHover]
      )
  );

  const outlineOffset = useTransform(hover, [0, 1], ["0px", "-7px"]);
  const outlineWidth = useTransform(hover, [0, 1], ["1px", "6px"]);

  const titleColor = useTransform(
    [theme.primary_verydark, hoverColor.text || theme.primary_dark, hover],
    ([latestColor3, latestColor4, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor3, latestColor4])
  );

  return (
    <MotionConfig transition={transition}>
      <Bubble
        $height={height}
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
        <Link href={`/skills/${id}`} passHref scroll={false}>
          <BubbleLink
            onClick={canHover ? null : disableLinkDrag}
            onTapStart={disableLinkDrag}
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
              <Arrow
                variants={arrowV}
                style={{ color: titleColor, rotate: 90 }}
              >
                <ArrowIcon />
              </Arrow>
            )}
          </BubbleLink>
        </Link>
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

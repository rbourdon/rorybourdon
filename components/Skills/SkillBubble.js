import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  MotionConfig,
  transform,
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
  z-index: 4;
  -webkit-tap-highlight-color: transparent;
`;

const Outline = styled(motion.div)`
  height: calc(100% + 10px);
  position: absolute;
  width: calc(100% + 10px);
  border-radius: 30px;
  user-select: none;
`;

const BubbleLink = styled(motion.a)`
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;
  width: 100%;
  height: 100%;
  z-index: 2;
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
  visible: {
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
  const [hovering, setHovering] = useState(true);

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

  // useEffect(() => {
  //   !hovering && hover.stop();
  //   !hovering &&
  //     animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
  // }, [hovering, hover]);

  const handleHoverStart = () => {
    select(title);
    if (canHover) {
      animate(hover, 1, { type: "tween", duration: 0.2, ease: "easeInOut" });
      setHovering(true);
    }
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
    setHovering(false);
  };

  const disableLinkDrag = (e) => {
    e.preventDefault();
    if (hovering) {
      animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
      setHovering(false);
    }
  };

  const backgroundColor = useTransform(
    [bgColor || theme.primary_light, hoverColor?.bg || theme.teal, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const backgroundColor2 = useTransform(
    [theme.primary_dark, hoverColor?.bg || theme.teal, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "thin solid " + latestColor1
  );

  const boxShadow = useTransform(
    [hover, theme.shadow_key, theme.shadow_ambient],
    ([latestHover, latestShadow1, latestShadow2]) =>
      transform(
        latestHover,
        [0, 1],
        [
          "0px 0px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 0x 0px " +
            latestShadow2,
          "1px 2px 0px 4px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 10px 5px " +
            latestShadow2,
        ]
      )
  );

  const outlineOffset = useTransform(hover, [0, 1], ["0px", "-7px"]);
  const outlineWidth = useTransform(hover, [0, 1], ["1px", "6px"]);
  // const outlineColor = useTransform(
  //   [hover, backgroundColor2, theme.shadow_ambient],
  //   ([latestHover, latestBackgroundColor2, latestShadow2]) =>
  //     transform(
  //       latestHover,
  //       [0, 1],
  //       [latestBackgroundColor2, latestBackgroundColor2]
  //     )
  // );

  const titleColor = useTransform(
    [theme.primary_verydark, hoverColor.text || theme.primary_dark, hover],
    ([latestColor3, latestColor4, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor3, latestColor4])
  );
  // const titleX = useTransform(hover, [0, 1], [0, -9]);
  //const scale = useTransform(hover, [0, 1], [1, 1.125]);

  return (
    <MotionConfig transition={transition}>
      <Bubble
        $height={height}
        layoutId={`${id}_bubble`}
        onHoverStart={handleHoverStart}
        onTap={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        variants={variants}
        custom={custom}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
        style={{
          boxShadow,
          zIndex: selected ? 10 : 2,
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
            animate="visible"
            whileHover="hover"
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
            layoutDependency={selected}
            style={{
              outlineColor: backgroundColor2,
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

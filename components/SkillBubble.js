import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useEffect } from "react";

const Bubble = styled(motion.li)`
  height: ${(props) => props.$height + "px"};
  min-width: 75px;
  width: max-content;
  padding: 0 22px;
  font-weight: 300;
  font-size: 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  cursor: pointer;
`;

const Outline = styled(motion.div)`
  height: calc(100% + 10px);
  position: absolute;
  width: calc(100% + 10px);
  border-radius: 20px;
  user-select: none;
  left: -5px;
  top: -5px;
`;

const handleHoverStart = (hover, title, onHover) => {
  onHover && onHover(title);
  animate(hover, 1, { type: "tween", duration: 0.25 });
};

const handleHoverEnd = (hover) => {
  animate(hover, 0, { type: "tween", duration: 0.25 });
};

export default function SkillBubble({
  title = "Oops! No Title!",
  transition = { type: "spring", stiffness: 30 },
  height = 36,
  top = false,
  bottom = false,
  variants,
  custom = 0,
  bgColor,
  onHover = null,
  hovering = false,
  outlineTransition,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const opacity = useMotionValue(bottom || top ? 0 : 1);

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
  //   if (hovering) {
  //     onHover && onHover(title);
  //     animate(hover, 1, { type: "tween", duration: 0.25 });
  //   } else {
  //     animate(hover, 0, { type: "tween", duration: 0.25 });
  //   }
  // }, [hovering, hover]);

  const backgroundColor = useTransform(
    [bgColor || theme.primary_light, theme.blue, theme.teal, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 2], [latestColor2, latestColor3]),
        ]
      )
  );

  const backgroundColor2 = useTransform(
    [theme.primary_dark, theme.blue, theme.teal, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 2], [latestColor2, latestColor3]),
        ]
      )
  );

  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "thin solid  " + latestColor1
  );

  const outline = useTransform(
    [backgroundColor2, hover],
    ([latestColor1, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [`1px solid ${latestColor1}`, `6px solid ${latestColor1}`]
      )
  );

  const outlineOffset = useTransform(hover, [0, 1], ["0px", "-8px"]);

  const titleColor = useTransform(
    [theme.primary_verydark, theme.primary_dark, hover],
    ([latestColor3, latestColor4, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor3, latestColor4])
  );

  const scale = useTransform(hover, [0, 1], [1, 1.125]);

  return (
    <Bubble
      $height={height}
      layoutId={`${title}_bubble`}
      transition={transition}
      onHoverStart={() =>
        onHover ? handleHoverStart(hover, title, onHover) : null
      }
      onHoverEnd={() => (onHover ? handleHoverEnd(hover) : null)}
      variants={variants}
      custom={custom}
      style={{
        scale,
        color: titleColor,
        zIndex: hovering ? 10 : 1,
        opacity,
        border,
        backgroundColor:
          backgroundColor.get() === "var(--color-teal)"
            ? theme.primary
            : backgroundColor,
      }}
    >
      {hovering && (
        <Outline
          layoutId="bubbleOutline"
          $height={height + 10}
          style={{
            outline,
            outlineOffset,
            borderRadius: "20px",
          }}
          transition={outlineTransition}
        />
      )}
      {title}
    </Bubble>
  );
}

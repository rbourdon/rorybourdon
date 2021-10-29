import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  MotionConfig,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useEffect } from "react";
import Link from "next/link";

const Bubble = styled(motion.li)`
  height: ${(props) => props.$height + "px"};
  min-width: 75px;
  width: max-content;
  padding: 0 22px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  cursor: pointer;
  z-index: 4;
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

const BubbleLink = styled.a`
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;

  z-index: 4;

  &:focus {
    outline: none;
  }
`;

const Title = styled(motion.p)`
  font-weight: 300;
  font-size: 1rem;
`;

export default function SkillBubble({
  transition = { type: "spring", stiffness: 30 },
  height = 36,
  top = false,
  bottom = false,
  variants,
  custom = 0,
  bgColor,
  onHover = null,
  hasOutline = false,
  active = true,
  outlineTransition = { type: "spring", stiffness: 30 },
  title,
  slug,
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

  const handleHoverStart = () => {
    onHover && onHover(title);
    active &&
      animate(hover, 1, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const handleHoverEnd = () => {
    hover.get() > 0 &&
      animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

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
          transform(latestHover, [0, 1], [latestColor2, latestColor3]),
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
          transform(latestHover, [0, 1], [latestColor2, latestColor3]),
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
    <MotionConfig transition={transition}>
      <Bubble
        $height={height}
        layoutId={`${slug}_bubble`}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        variants={variants}
        custom={custom}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd} // onBlur={handleHoverEnd}
        style={{
          scale,
          color: titleColor,
          zIndex: hasOutline ? 10 : 1,
          opacity,
          border,
          backgroundColor:
            backgroundColor.get() === "var(--color-teal)"
              ? theme.primary
              : backgroundColor,
        }}
      >
        {active ? (
          <Link href={`/skills/${slug}`} passHref scroll={false}>
            <BubbleLink onDragStart={(e) => e.preventDefault()}>
              <Title layoutId={`${slug}_bubbleLink`}>{title}</Title>
            </BubbleLink>
          </Link>
        ) : (
          <BubbleLink onDragStart={(e) => e.preventDefault()}>
            <Title layoutId={`${slug}_bubbleLink`}>{title}</Title>
          </BubbleLink>
        )}
        {hasOutline && (
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
      </Bubble>
    </MotionConfig>
  );
}

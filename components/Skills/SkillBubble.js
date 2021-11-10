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
  border-radius: 20px;
  user-select: none;
  left: -5px;
  top: -5px;
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
  padding: 0 22px;

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
  select = null,
  selected = false,
  hovering = false,
  canHover = true,
  outlineTransition = { type: "spring", stiffness: 30 },
  title,
  id,
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

  useEffect(() => {
    !hovering && hover.stop();
    !hovering &&
      animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
  }, [hovering, hover]);

  const handleHoverStart = () => {
    select && select(title);
    canHover && hover.stop();
    canHover &&
      animate(hover, 1, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const handleHoverEnd = () => {
    hover.stop();
    animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const disableLinkDrag = (e) => {
    e.preventDefault();
  };

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
          "3px 5px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 30px 3px " +
            latestShadow2,
        ]
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
          scale,
          color: titleColor,
          zIndex: selected ? 10 : 1,
          opacity,
          border,
          backgroundColor:
            backgroundColor.get() === "var(--color-teal)"
              ? theme.primary
              : backgroundColor,
        }}
      >
        <Link href={`/skills/${id}`} passHref scroll={false}>
          <BubbleLink
            onClick={canHover ? null : disableLinkDrag}
            onTapStart={disableLinkDrag}
          >
            <Title layoutId={`${id}_bubbleLinkTitle`}>{title}</Title>
          </BubbleLink>
        </Link>
        {selected && (
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

import { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useEffect } from "react";

export default function GridGuideCell({
  variants = { x: 550, y: 550 },
  hightlight,
  delay = 0,
}) {
  const theme = useContext(ThemeContext);

  const phase = useMotionValue(0);
  const backgroundColor = useTransform(
    [theme.primary_slightlydark, theme.teal, theme.orange, theme.green, phase],
    ([latestColor1, latestColor2, latestColor3, latestColor4, latestPhase]) =>
      transform(
        latestPhase,
        [0, 1, 2, 3],
        [latestColor1, latestColor2, latestColor3, latestColor4]
      )
  );
  useEffect(() => {
    animate(phase, [1, 1, 2, 2, 3, 3], {
      type: "tween",
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6,
    });
  }, [phase]);

  return (
    <motion.span
      initial={false}
      animate="visible"
      variants={variants}
      custom={delay}
      style={{
        backgroundColor: hightlight ? backgroundColor : theme.primary_verydark,
        width: 25,
        height: 25,
        borderRadius: hightlight ? "50px" : "8px",
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}

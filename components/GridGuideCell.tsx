import {
  animate,
  type MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "styled-components";

interface GridGuideCellProps {
  variants?: Variants;
  hightlight?: boolean;
  delay?: number;
}

export default function GridGuideCell({
  // Not a valid Variants shape, but it is the original fallback; kept as-is.
  variants = { x: 550, y: 550 } as unknown as Variants,
  hightlight,
  delay = 0,
}: GridGuideCellProps) {
  const theme = useTheme();

  const phase = useMotionValue(0);
  const backgroundColor = useTransform(
    // mixed string/number inputs; useTransform's overloads want one element type
    [
      theme.primary_slightlydark,
      theme.teal,
      theme.orange,
      theme.green,
      phase,
    ] as MotionValue<string | number>[],
    ([latestColor1, latestColor2, latestColor3, latestColor4, latestPhase]: (
      | string
      | number
    )[]) =>
      transform(latestPhase as number, [0, 1, 2, 3], [
        latestColor1,
        latestColor2,
        latestColor3,
        latestColor4,
      ] as string[]),
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

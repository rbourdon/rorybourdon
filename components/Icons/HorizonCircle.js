import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "@/components/utils/useWindowSize";

const Circle = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const circleV = {
  hidden: {
    pathLength: 1,
    pathOffset: 1,
    pathSpacing: 1,
  },
  visible: (dir) => ({
    pathOffset: 0.1,
    pathSpacing: 0.15,
    rotate: [0, 720 * dir],
    pathLength: 1,
    transition: {
      type: "tween",
      duration: 42,
      repeat: Infinity,
      ease: "linear",
      repeatType: "mirror",
    },
  }),
};

export default function HorizonCircle({ cx = "50%", cy = "50%", r = 0.5 }) {
  const theme = useContext(ThemeContext);
  const { width = 330 } = useWindowSize();
  return (
    <Circle
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 400 400`}
      fill="none"
      width="100%"
      height="100%"
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 550 - r * (width * 0.08) * 0.965}
        variants={circleV}
        custom={-1}
        strokeWidth={1}
        stroke={theme.primary_slightlydark}
        vectorEffect="non-scaling-stroke"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 550 - r * (width * 0.08)}
        custom={1}
        variants={circleV}
        strokeWidth={1}
        stroke={theme.primary_slightlydark}
        vectorEffect="non-scaling-stroke"
      />
    </Circle>
  );
}

import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "@/components/utils/useWindowSize";

const Circle = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const circleV = {
  hidden: {
    pathLength: 1,
    pathOffset: 1,
  },
  visible: {
    pathOffset: [1, 0.25, 1],
    pathSpacing: [0, 0.9, 0],
    rotate: [0, 180, 360],
    pathLength: 1,
    transition: {
      type: "tween",
      duration: 12,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function HorizonCircle({ cx = "92%", cy = "15%", r = 330 }) {
  const theme = useContext(ThemeContext);
  const { width = 330 } = useWindowSize();
  return (
    <Circle
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 400 400`}
      fill="none"
    >
      <motion.circle
        cx={cx}
        cy={cy}
        r={r - width * 0.1}
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r - width * 0.101}
        variants={circleV}
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </Circle>
  );
}

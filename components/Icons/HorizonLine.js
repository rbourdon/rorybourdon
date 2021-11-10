import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../utils/useWindowSize";

const Line = styled(motion.svg)`
  position: absolute;
  left: 0;
  pointer-events: none;
  top: ${(props) => props.$top};
`;

const lineV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 10,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

const line1V = {
  hidden: {
    pathLength: 2,
    pathSpacing: 10,
  },
  visible: {
    pathOffset: [-2, 10],
    transition: {
      type: "tween",
      duration: 8.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const line2V = {
  hidden: {
    pathLength: 4,
    pathSpacing: 10,
  },
  visible: {
    pathOffset: [10, -4],
    transition: {
      type: "tween",
      duration: 8.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function HorizonLine({ top = "50vh", slope = -16, yLoc = 94 }) {
  const theme = useContext(ThemeContext);
  const { width } = useWindowSize();

  return (
    <Line
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 200 200`}
      $top={width < 1920 ? `${(1920 - width) * 0.2}px` : "0"}
    >
      <motion.path
        custom={{ length: 2, offset: 0.2, spacing: 8 }}
        variants={line1V}
        d={`M0,${yLoc - 1} l200,${slope}`}
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        variants={lineV}
        d={`M0,${yLoc} l200,${slope}`}
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        custom={{ length: 4, offset: 3.6, spacing: 0.9 }}
        variants={line2V}
        d={`M0,${yLoc + 1} l200,${slope}`}
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </Line>
  );
}

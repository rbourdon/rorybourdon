import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Line = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
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

export default function HorizonLine({
  bottom = "-35vw",
  slope = -16,
  yLoc = 94,
}) {
  const theme = useContext(ThemeContext);

  return (
    <Line
      $bottom={bottom}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 200 200`}
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

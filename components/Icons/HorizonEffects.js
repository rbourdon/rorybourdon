import { motion, useMotionValue } from "framer-motion";
import React, { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import useWindowSize from "../utils/useWindowSize";

const Effects = styled.svg`
  width: max-content;
  min-width: 100%;
  position: absolute;
  left: 0;
  pointer-events: none;
  top: 0;
`;

const lineV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      type: "tween",
      duration: 2,
    },
  },
};

const line1V = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathOffset: [10, 0],
    pathLength: [0, 0.15, 0],
    transition: {
      delay: 3.5,
      type: "tween",
      duration: 35.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    },
  },
};

const line2V = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathOffset: [0, 10],
    pathLength: [0, 0.15, 0],
    transition: {
      type: "tween",
      duration: 37.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    },
  },
};

const circleV = {
  hidden: {
    pathLength: 0,
    pathOffset: 1,
  },
  visible: {
    pathOffset: [0, 10],
    pathLength: [0, 0.15, 0],
    transition: {
      delay: 1.5,
      type: "tween",
      duration: 35,
      repeat: Infinity,
      ease: "linear",
      repeatType: "reverse",
    },
  },
};

const circle2V = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      type: "tween",
      duration: 4,
      ease: "easeInOut",
    },
  },
};

export default function HorizonEffects({ lines = [], circles = [] }) {
  const theme = useContext(ThemeContext);
  const { width = 1910 } = useWindowSize();
  const strokeWidth = useMotionValue(0.5);

  useEffect(() => {
    strokeWidth.set(0.33 - width * 0.0001);
  }, [strokeWidth, width]);

  return (
    <Effects xmlns="http://www.w3.org/2000/svg" viewBox={"0 0 200 200"}>
      {lines.map((line, index) => {
        return (
          <React.Fragment key={line.yLoc + "_frag_" + index}>
            <motion.path
              key={line.yLoc + "_1_" + index}
              variants={line1V}
              d={`M0,${line.yLoc - 1} l200,${line.slope}`}
              stroke={theme.primary_slightlydark}
              style={{ strokeWidth }}
              strokeDasharray="0 1"
              fill="none"
            />
            <motion.path
              key={line.yLoc + "_0_" + index}
              variants={lineV}
              d={`M0,${line.yLoc} l200,${line.slope}`}
              stroke={theme.primary_slightlydark}
              style={{ strokeWidth }}
              strokeDasharray="0 1"
              fill="none"
            />
            <motion.path
              key={line.yLoc + "_2_" + index}
              variants={line2V}
              d={`M0,${line.yLoc + 1} l200,${line.slope}`}
              stroke={theme.primary_slightlydark}
              style={{ strokeWidth }}
              strokeDasharray="0 1"
              fill="none"
            />
          </React.Fragment>
        );
      })}
      {circles.map((circle, index) => {
        return (
          <React.Fragment key={circle.cx + "_circlefrag_" + index}>
            <motion.circle
              key={circle.cx + "_circle1_" + index}
              cx={circle.cx}
              cy={circle.cy}
              r={
                circle.r * 550 -
                circle.r * (width * 0.115) -
                1.5 +
                width * 0.0002
              }
              variants={circleV}
              fill="none"
              style={{ strokeWidth }}
              stroke={theme.primary_slightlydark}
              strokeDasharray="0 1"
            />
            <motion.circle
              key={circle.cx + "_circle2_" + index}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r * 550 - circle.r * (width * 0.115)}
              fill="none"
              variants={circle2V}
              style={{ strokeWidth }}
              stroke={theme.primary_slightlydark}
              strokeDasharray="0 1"
            />
          </React.Fragment>
        );
      })}
    </Effects>
  );
}

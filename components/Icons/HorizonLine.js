import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Line = styled(motion.svg)`
  position: absolute;
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

export default function TreeIcon() {
  const theme = useContext(ThemeContext);

  return (
    <Line xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 200 200`}>
      <motion.path
        variants={lineV}
        d="M20,104.5 l50,-6.5"
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        variants={lineV}
        d="M0,108 l200,-26"
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        variants={lineV}
        d="M145,90 l50,-6.5"
        stroke={theme.primary_slightlydark}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </Line>
  );
}

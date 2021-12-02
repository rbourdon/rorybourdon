import { motion, useMotionValue } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useBackgroundEffect from "../utils/useBackgroundEffect";

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  pointer-events: none;
  top: 0;
  will-change: opacity translate;
`;

const containerV = {
  hidden: {
    scale: 0,
    transition: {
      staggerChildren: 0.1,
      type: "tween",
      duration: 0.2,
    },
  },
  visible: (custom) => ({
    scale: custom.scale,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.7,
      type: "tween",
      duration: 0.8,
    },
  }),
  selected: {
    scale: 0,
    transition: {
      staggerChildren: 0.05,
      type: "tween",
      duration: 0.35,
    },
  },
};

const lineV = {
  hidden: {
    scaleX: 0,
    originX: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "linear",
    },
  },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  selected: {
    scaleX: 0,
    originX: 0,
    transition: {
      type: "tween",
      duration: 0.15,
      ease: "linear",
    },
  },
};

export default function SocialsBackgroundEffect({
  inView = false,
  effectStyle = { x: 0, y: 0, scale: 1, delay: 0 },
}) {
  const theme = useContext(ThemeContext);
  const x = useMotionValue(effectStyle.x);
  const y = useBackgroundEffect(inView, effectStyle);

  return (
    <Container style={{ x, y }} variants={containerV} custom={effectStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1 -1 130 130"
        width={130}
        height={130}
      >
        <motion.path
          fill={theme.primary_slightlydark}
          d="M63.86 127.53h-.09a63.75 63.75 0 1 1 44-17.63l12.83 14.38-.66.28c-10.64 4.51-21.41-1.64-25.81-4.72a63.58 63.58 0 0 1-30.27 7.69ZM63.77 1a62.75 62.75 0 1 0 30.16 117.79l.29-.15.26.18c4 2.85 14.25 8.93 24.41 5.06l-12.53-14 .36-.34A62.74 62.74 0 0 0 63.77 1Z"
        />
        <motion.path
          variants={lineV}
          fill={theme.green}
          d="M83.52 53.33c-13.09-.13-26.17-.37-39.26-.54q-6.54-.09-13.09-.16c-3.76 0-3.77-5.88 0-5.85 13.09.14 26.17.38 39.26.55l13.09.16c3.75.04 3.76 5.88 0 5.84Z"
        />
        <motion.path
          variants={lineV}
          fill={theme.green}
          d="M97.85 67 45 66.42l-15-.15c-3.76 0-3.77-5.89 0-5.85l52.81.58 15 .16c3.8.01 3.81 5.84.04 5.84Z"
        />
        <motion.path
          variants={lineV}
          fill={theme.green}
          d="M97.85 80.61 45 80.06l-15-.15c-3.76 0-3.77-5.89 0-5.85l52.89.55 15 .16c3.72.03 3.73 5.88-.04 5.84Z"
        />
      </svg>
    </Container>
  );
}

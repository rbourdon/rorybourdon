import useBackgroundEffect from "@/components/utils/useBackgroundEffect";
import { motion, useMotionValue } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  pointer-events: none;
  top: 0;
  will-change: rotate opacity translate;
`;

const containerV = {
  hidden: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  visible: (custom) => ({
    opacity: 1,
    rotate: [0, 360],
    transition: {
      type: "tween",
      duration: 0.2,
      rotate: {
        type: "tween",
        duration: 35 * (custom.scale / 2),
        ease: "linear",
        repeat: Infinity,
      },
    },
  }),
  selected: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.35,
    },
  },
};

export default function ProjectsBackgroundEffect({
  inView = false,
  effectStyle = { x: 0, y: 0, scale: 1, delay: 0 },
}) {
  const theme = useContext(ThemeContext);
  const y = useBackgroundEffect(inView, effectStyle);
  const x = useMotionValue(effectStyle.x);
  const scale = useMotionValue(effectStyle.scale);

  return (
    <Container
      style={{ x, y, scale }}
      variants={containerV}
      custom={effectStyle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1 -1 170 170"
        width={170}
        height={170}
      >
        <motion.path
          fill={theme.primary_light}
          stroke={theme.primary_slightlydark}
          strokeMiterlimit={10}
          strokeWidth={1}
          d="M157.49 67.72a9.72 9.72 0 0 1-9-6l-3-7.29a9.73 9.73 0 0 1 2.11-10.59 10.36 10.36 0 0 0 0-14.66l-8.54-8.54a10.37 10.37 0 0 0-14.65 0 9.72 9.72 0 0 1-10.6 2.11l-7.29-3a9.72 9.72 0 0 1-6-9A10.36 10.36 0 0 0 90.15.38H78.08a10.36 10.36 0 0 0-10.36 10.36 9.71 9.71 0 0 1-6 9l-7.29 3a9.71 9.71 0 0 1-10.59-2.11 10.38 10.38 0 0 0-14.66 0l-8.54 8.54a10.38 10.38 0 0 0 0 14.66 9.71 9.71 0 0 1 2.11 10.59l-3 7.29a9.71 9.71 0 0 1-9 6A10.36 10.36 0 0 0 .38 78.08v12.07a10.36 10.36 0 0 0 10.36 10.37 9.72 9.72 0 0 1 9 6l3 7.29a9.73 9.73 0 0 1-2.11 10.6 10.37 10.37 0 0 0 0 14.65l8.54 8.54a10.36 10.36 0 0 0 14.66 0 9.73 9.73 0 0 1 10.59-2.11l7.29 3a9.72 9.72 0 0 1 6 9 10.36 10.36 0 0 0 10.36 10.37h12.08a10.37 10.37 0 0 0 10.37-10.37 9.73 9.73 0 0 1 6-9l7.29-3a9.74 9.74 0 0 1 10.6 2.11 10.35 10.35 0 0 0 14.65 0l8.54-8.54a10.35 10.35 0 0 0 0-14.65 9.75 9.75 0 0 1-2.11-10.6l3-7.29a9.73 9.73 0 0 1 9-6 10.37 10.37 0 0 0 10.37-10.37V78.08a10.36 10.36 0 0 0-10.37-10.36Zm-73.37 49.92a33.53 33.53 0 1 1 33.52-33.52 33.53 33.53 0 0 1-33.52 33.52Z"
        />
      </svg>
    </Container>
  );
}

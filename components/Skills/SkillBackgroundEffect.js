import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  pointer-events: none;
  top: 0;
`;

const containerV = {
  hidden: (custom) => ({
    opacity: 0,
    y: custom + 150,
    transition: {
      staggerChildren: 0.1,
      type: "tween",
      duration: 0.2,
      y: {
        type: "spring",
        stiffness: 40,
        mass: 1.3,
        damping: 8,
      },
    },
  }),
  visible: (custom) => ({
    opacity: 1,
    y: custom,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
      type: "tween",
      duration: 0.2,
      y: {
        type: "spring",
        stiffness: 40,
        mass: 1.3,
        damping: 8,
      },
    },
  }),
  selected: (custom) => ({
    opacity: 0,
    y: custom - 150,
    transition: {
      staggerChildren: 0.05,
      type: "tween",
      duration: 0.2,
      y: {
        type: "spring",
        stiffness: 40,
        damping: 8,
        mass: 1.3,
      },
    },
  }),
};

const lineV = {
  hidden: {
    scaleX: 0,
    originX: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeInOut",
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
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const circleV = {
  hidden: {
    r: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    r: 17,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  selected: {
    r: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function SkillBackgroundEffect({
  inView = false,
  style = { x: 0, y: 0, scale: 1, delay: 0 },
}) {
  const [animating, setAnimating] = useState(true);
  const theme = useContext(ThemeContext);
  const { scrollY } = useViewportScroll();
  const x = useMotionValue(style.x);
  const y = useMotionValue(style.y + 150);

  const scale = useMotionValue(style.scale);

  useEffect(() => {
    const unsubscribeY = scrollY.onChange((progress) => {
      inView &&
        !animating &&
        y.set(
          y.get() - (progress - scrollY.prev) * 0.55 * (style.scale - 0.25)
        );
    });
    return () => {
      unsubscribeY();
    };
  }, [animating, inView, scrollY, style.scale, y]);

  return (
    <Container
      style={{ x, y, scale }}
      variants={containerV}
      custom={style.y}
      onAnimationStart={() => setAnimating(true)}
      onAnimationComplete={() => setAnimating(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={"-1 -1 165 109"}
        width={166}
        height={110}
      >
        <motion.path
          fill={theme.primary_light}
          d="M145.51 106.4H22.93A22.69 22.69 0 0 1 .25 83.73V15.19a3.55 3.55 0 0 1 3.54-3.54h141.72a3.55 3.55 0 0 1 3.54 3.54v87.67a3.54 3.54 0 0 1-3.54 3.54Z"
        />
        <motion.path
          fill={theme.primary_slightlydark}
          d="M145.51 106.65H22.93A23 23 0 0 1 0 83.73V15.19a3.79 3.79 0 0 1 3.79-3.79h141.72a3.79 3.79 0 0 1 3.79 3.79v87.67a3.79 3.79 0 0 1-3.79 3.79ZM3.79 12.4A2.79 2.79 0 0 0 1 15.19v68.54a22 22 0 0 0 21.93 21.93h122.58a2.82 2.82 0 0 0 2.8-2.8V15.19a2.81 2.81 0 0 0-2.8-2.79Z"
        />
        {/* Lines */}
        <motion.path
          variants={lineV}
          fill={theme.primary_slightlydark}
          d="M117.49 41.18H31.81a3 3 0 0 1 0-5.94h85.69a3 3 0 0 1 0 5.94Z"
        />
        <motion.path
          variants={lineV}
          fill={theme.primary_slightlydark}
          d="M117.49 61.61H31.81a3 3 0 0 1 0-5.93h85.69a3 3 0 1 1 0 5.93Z"
        />
        <motion.path
          variants={lineV}
          fill={theme.primary_slightlydark}
          d="M117.49 82.63H31.81a3 3 0 0 1 0-5.94h85.68a3 3 0 0 1 0 5.94Z"
        />
        {/* Check */}
        <motion.circle
          variants={circleV}
          cx={146}
          cy={17}
          r={17}
          fill={theme.teal}
        />
        <motion.path
          fill={theme.primary_light}
          d="M143.63 25.87a1.89 1.89 0 0 1-1.51-.76l-4.64-6.19a1.89 1.89 0 1 1 3-2.27l3 4.05L151.34 9a1.89 1.89 0 0 1 3.15 2.1L145.21 25a1.91 1.91 0 0 1-1.53.84Z"
        />
      </svg>
    </Container>
  );
}

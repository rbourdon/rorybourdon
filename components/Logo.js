import { animate, motion, useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";

const colorSquareV = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    rotate: 90,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      delay: 1,
      duration: 0.73,
      opacity: { delay: 0.95, duration: 0.15 },
    },
  },
};

const innerSquareV = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    rotate: 90,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      delay: 0.95,
      duration: 0.8,
      opacity: { delay: 0.95, duration: 0.15 },
    },
  },
};

const outerSquareV = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    rotate: -90,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      delay: 0.95,
      duration: 0.8,
      opacity: { delay: 0.95, duration: 0.15 },
    },
  },
};

const gradientSquareV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      type: "tween",
      delay: 1,
      duration: 0.8,
    },
  },
};

// const arrowV = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       type: "tween",
//       delay: 0.2,
//       duration: 0.15,
//     },
//   },
// };

export default function Logo({ onAnimationComplete, intro, strokeWidth }) {
  const x = useMotionValue(intro ? 350 : 0);
  const y = useMotionValue(intro ? -350 : 0);
  const rotate = useMotionValue(intro ? 270 : 90);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (intro) {
      animate(x, 97, {
        type: "spring",
        delay: 0.15,
        duration: 0.8,
        onComplete: () => {
          animate(x, 0, {
            type: "spring",
            stiffness: 120,
            damping: 15,
          });
        },
      });
      animate(y, -97, {
        type: "spring",
        delay: 0.15,
        duration: 0.8,
        onComplete: () => {
          animate(y, 0, {
            type: "spring",
            stiffness: 120,
            damping: 15,
          });
        },
      });
      animate(rotate, 90, {
        type: "spring",
        delay: 0.95,
        stiffness: 120,
        damping: 15,
        onComplete: onAnimationComplete
          ? () => {
              onAnimationComplete();
            }
          : null,
      });
    }
  }, []);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100.4 -100.4 389 389"
      height="100%"
      width="100%"
    >
      <motion.g stroke="#3a3a3a" strokeWidth={strokeWidth ? strokeWidth : 0.75}>
        <motion.path
          variants={outerSquareV}
          custom={{ x: 0, y: 97 }}
          fill="#e0dde3"
          d="M10.3.3h70.2a10 10 0 0110 10v80.3h0-80.2a10 10 0 01-10-10V10.2a10 10 0 0110-10z"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 97 }}
          fill="#e0dde3"
          d="M108 .3h69.5A10.4 10.4 0 01188 10.7v69.5a10.4 10.4 0 01-10.4 10.4h-80 0v-80A10.4 10.4 0 01108 .4z"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 0 }}
          fill="#e0dde3"
          d="M97.6 97.6h80.7a9.6 9.6 0 019.7 9.7v71a9.6 9.6 0 01-9.7 9.7h-71a9.6 9.6 0 01-9.7-9.7V97.6h0z"
        />
        <motion.path
          fill="#e0dde3"
          d="M90.7 97.8H.4V188h26v-45.2L72 188.1h18.8v-19.9l-45.2-44.4h45.2v-26z"
          style={{ x, y, rotate }}
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: 0, y: 97 }}
          fill="none"
          d="M26.4 26.4h38.2v38.2H26.4z"
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 97 }}
          fill="none"
          d="M123.8 26.4H162v38.2h-38.2z"
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 0 }}
          fill="none"
          d="M123.8 123.8H162V162h-38.2z"
        />
        <motion.path
          variants={colorSquareV}
          custom={{ x: 0, y: 97 }}
          fill="none"
          stroke={theme.teal.get()}
          d="M39 39h13v13h-13z"
        />
        <motion.path
          variants={colorSquareV}
          custom={{ x: -97, y: 97 }}
          fill="none"
          stroke={theme.blue.get()}
          d="M136.3 39h13v13h-13z"
        />
        <motion.path
          variants={colorSquareV}
          custom={{ x: -97, y: 0 }}
          fill="none"
          stroke={theme.purple.get()}
          d="M136.3 136.3h13v13h-13z"
        />
      </motion.g>
      <defs>
        <linearGradient id={"logoGradient"} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={theme.teal.get()} />
          <stop offset="1" stopColor={theme.purple.get()} />
        </linearGradient>
      </defs>
      <motion.path
        d={`M${-15 + 0.75 / 2},${210 * 0.5} 
        v-${220 * 0.5 - 0.75 / 2} 
        a${10},${10} 0 0 1 ${10},-${10} 
        h${220 - 10 * 2 - 0.75} 
        a${10},${10} 0 0 1 ${10},${10} 
        v${220 - 10 * 2 - 0.75} 
        a${10},${10} 0 0 1 -${10},${10} 
        h-${220 - 10 * 2 - 0.75} 
        a${10},${10} 0 0 1 -${10},-${10} 
        z `}
        stroke="url(#linear)"
        strokeWidth={strokeWidth}
        fill="none"
        style={{ zIndex: 2 }}
        variants={gradientSquareV}
      />
    </motion.svg>
  );
}

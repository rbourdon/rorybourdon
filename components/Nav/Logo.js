import { animate, motion, useMotionValue } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";

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

export default function Logo({ intro }) {
  const [introStarted, setIntroStarted] = useState(false);
  //const [introComplete, setIntroComplete] = useState(!intro);
  const x = useMotionValue(intro ? 350 : 0);
  const y = useMotionValue(intro ? -350 : 0);
  const rotate = useMotionValue(intro ? 180 : 0);
  //const theme = useContext(ThemeContext);

  useEffect(() => {
    if (intro && !introStarted) {
      animate(x, 97, {
        type: "spring",
        delay: 0.15,
        stiffness: 130,
        damping: 15,
        restDelta: 5,
        restSpeed: 20,
        onComplete: () => {
          animate(x, 0, {
            type: "spring",
            stiffness: 130,
            damping: 15,
            restDelta: 1,
            restSpeed: 1,
          });
        },
      });
      animate(y, -97, {
        type: "spring",
        delay: 0.15,
        stiffness: 130,
        damping: 15,
        restDelta: 5,
        restSpeed: 20,
        onComplete: () => {
          animate(y, 0, {
            type: "spring",
            stiffness: 130,
            damping: 15,
            restDelta: 1,
            restSpeed: 1,
          });
          animate(rotate, 0, {
            type: "spring",
            stiffness: 130,
            damping: 15,
            restDelta: 1,
            restSpeed: 1,
            // onComplete: () => {
            //   setIntroComplete(true);
            // },
          });
        },
      });
      setIntroStarted(true);
    }
  }, [intro, introStarted, rotate, x, y]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 -100 388 388"
      height="100%"
      width="100%"
    >
      <g fill="currentColor">
        <path d="M159 121.11a16.87 16.87 0 0 1-12-5c-9.67-9.66-38.06-7.12-49.53-4.47-5.6 1.36-55.65 11.95-81.13-13.52a17 17 0 0 1 24-24c8.73 8.72 34.73 7.82 49.56 4.47 5.59-1.29 55.64-11.92 81.1 13.55a17 17 0 0 1-12 29Z" />
        <path d="M130.42 188.66A56.42 56.42 0 0 1 90.26 172a17 17 0 0 1 24-24 22.86 22.86 0 1 0 32.33-32.32 17 17 0 0 1 24-24 56.8 56.8 0 0 1-40.17 97Z" />
        <path d="M28.61 103.23a16.88 16.88 0 0 1-12-5 56.79 56.79 0 1 1 80.32-80.3 17 17 0 0 1-24 24 22.86 22.86 0 1 0-32.32 32.33 17 17 0 0 1-12 29Z" />
        <path d="M79.28 76.06c3.47-.48 6.73-1.06 9.65-1.72a177.08 177.08 0 0 1 24.56-3.6c.29-17.41-2.79-38.91-16.82-52.95a17 17 0 0 0-24 24c6.15 6.21 7.51 20.91 6.61 34.27Z" />
        <path d="M108.08 114.22c-3.72.5-7 1.09-9.61 1.69a175.1 175.1 0 0 1-24.6 3.6c-.29 17.42 2.78 38.92 16.82 53a17 17 0 0 0 24-24c-6.15-6.2-7.52-20.94-6.61-34.29Z" />
        <path d="M68.76 120.05a117.7 117.7 0 0 1-23-1l-32.19 32.19a17 17 0 0 0 24 24l32.15-32.15a117.7 117.7 0 0 1-.96-23.04Z" />
        <path d="M101.29 13.57a17.47 17.47 0 0 1 1.5 1.74c6.4 7.17 10.26 16 12.47 25.12a22.85 22.85 0 0 1 32.14 32.5c-.11.1-.19.22-.29.32 10 2.25 19.69 6.42 27.35 13.65.16.15.33.28.48.44l.33.35a.47.47 0 0 1 .1.1c.06 0 .11.12.17.18.62.64 1.22 1.28 1.81 2A56.79 56.79 0 0 0 98.1 10.64c1.09.94 2.16 1.9 3.19 2.93Z" />
      </g>
    </motion.svg>
  );
}

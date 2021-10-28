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
  const theme = useContext(ThemeContext);

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
      <motion.g stroke={theme.primary_verydark} strokeWidth={1}>
        <defs>
          <linearGradient
            id="a"
            x1="97.5"
            y1="90.5"
            x2="174.8"
            y2="13.2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={theme.blue.get()} />
            <stop offset="1" stopColor={theme.teal.get()} />
          </linearGradient>
          <linearGradient
            id="b"
            x1="97.5"
            y1="97.5"
            x2="174.8"
            y2="174.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={theme.teal.get()} />
            <stop offset="1" stopColor={theme.green.get()} />
          </linearGradient>
          <linearGradient
            id="c"
            x1="3.9"
            y1="184.1"
            x2="90.5"
            y2="97.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={theme.purple.get()} />
            <stop offset="1" stopColor={theme.blue.get()} />
          </linearGradient>
          <linearGradient
            id="d"
            x1="13.3"
            y1="13.3"
            x2="90.5"
            y2="90.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={theme.blue.get()} />
            <stop offset="1" stopColor={theme.purple.get()} />
          </linearGradient>
          <linearGradient
            id="e"
            x1="28.9"
            y1="159.1"
            x2="90.5"
            y2="97.5"
            xlinkHref="#a"
          />
          <linearGradient
            id="f"
            x1="53"
            y1="135"
            x2="90.5"
            y2="97.5"
            xlinkHref="#b"
          />
        </defs>
        {/*Gradient shapes*/}
        <motion.path
          variants={outerSquareV}
          custom={{ x: 0, y: 97 }}
          d="M45.2 0A45.2 45.2 0 0 0 0 45.2a45.2 45.2 0 0 0 45.2 45.3h45.3V45.2A45.2 45.2 0 0 0 45.2 0Zm19.2 45.2a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 97 }}
          d="M142.8 0h-.1a45.2 45.2 0 0 0-45.2 45.2v45.3h45.3A45.2 45.2 0 0 0 188 45.3v-.1A45.2 45.2 0 0 0 142.8 0ZM162 45.2a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 0 }}
          d="M142.9 97.5H97.5V143a45.1 45.1 0 0 0 45.2 45.1h.2A45.1 45.1 0 0 0 188 143v-.3a45.1 45.1 0 0 0-45.1-45Zm-.1 64.4a19.1 19.1 0 1 1 19.1-19.1 19.1 19.1 0 0 1-19.1 19.1Z"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/*Arrow*/}
        <motion.path
          style={{ x, y, rotate }}
          d="M13 97.5h77.5V175a13 13 0 0 1-13 13 13 13 0 0 1-13-13v-32.2L22.6 184a13.3 13.3 0 0 1-9.4 3.9A13.3 13.3 0 0 1 0 174.7v-1a13.3 13.3 0 0 1 4-9.5l41.3-40.6H13a13 13 0 0 1-13-13 13 13 0 0 1 13-13Z"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/*Black pieces*/}
        <motion.path
          variants={innerSquareV}
          custom={{ x: 0, y: 97 }}
          d="M45.2 22A23.2 23.2 0 0 0 22 45.2a23.2 23.2 0 0 0 23.2 23.3h23.3V45.2A23.2 23.2 0 0 0 45.2 22Zm19.2 23.2a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill={theme.primary_verydark}
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 97 }}
          d="M142.8 22.7a22.5 22.5 0 0 0-22.6 22.5v22.5h22.6a22.5 22.5 0 0 0 22.5-22.4v-.1a22.5 22.5 0 0 0-22.5-22.5Zm19.1 22.5a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill={theme.primary_verydark}
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 0 }}
          d="M142.8 120.3h-22.6v22.5a22.5 22.5 0 0 0 22.5 22.5h.1a22.5 22.5 0 0 0 22.5-22.5 22.5 22.5 0 0 0-22.5-22.6Zm0 41.6a19.1 19.1 0 1 1 19.2-19.1 19.1 19.1 0 0 1-19.2 19.1Z"
          fill={theme.primary_verydark}
        />
      </motion.g>
    </motion.svg>
  );
}

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
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
  const [introComplete, setIntroComplete] = useState(!intro);
  const x = useMotionValue(intro ? 350 : 0);
  const y = useMotionValue(intro ? -350 : 0);
  const arrow2x = useTransform(x, [350, 97, 0], [350, 70, 0]);
  const arrow2y = useTransform(y, [-350, -97, 0], [-350, -70, 0]);
  const arrow3x = useTransform(x, [350, 97, 0], [350, 47, 0]);
  const arrow3y = useTransform(y, [-350, -97, 0], [-350, -47, 0]);
  const rotate = useMotionValue(intro ? 180 : 0);
  const theme = useContext(ThemeContext);
  console.log(introComplete);
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
            onComplete: () => {
              setIntroComplete(true);
            },
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
      <motion.g stroke="none">
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
          fill="url(#d)"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 97 }}
          d="M142.8 0h-.1a45.2 45.2 0 0 0-45.2 45.2v45.3h45.3A45.2 45.2 0 0 0 188 45.3v-.1A45.2 45.2 0 0 0 142.8 0ZM162 45.2a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill="url(#a)"
        />
        <motion.path
          variants={outerSquareV}
          custom={{ x: -97, y: 0 }}
          d="M142.9 97.5H97.5V143a45.1 45.1 0 0 0 45.2 45.1h.2A45.1 45.1 0 0 0 188 143v-.3a45.1 45.1 0 0 0-45.1-45Zm-.1 64.4a19.1 19.1 0 1 1 19.1-19.1 19.1 19.1 0 0 1-19.1 19.1Z"
          fill="url(#b)"
        />
        {/*Arrow*/}
        <motion.path
          style={{ x, y, rotate }}
          d="M13 97.5h77.5V175a13 13 0 0 1-13 13 13 13 0 0 1-13-13v-32.2L22.6 184a13.3 13.3 0 0 1-9.4 3.9A13.3 13.3 0 0 1 0 174.7v-1a13.3 13.3 0 0 1 4-9.5l41.3-40.6H13a13 13 0 0 1-13-13 13 13 0 0 1 13-13Z"
          fill="url(#c)"
        />
        <motion.path
          style={{ x: arrow2x, y: arrow2y, rotate }}
          d="M35.4 97.5h55v55.1a9.3 9.3 0 0 1-9.2 9.3 9.3 9.3 0 0 1-9.3-9.3v-22.9l-29.7 29.5a9.5 9.5 0 0 1-6.6 2.7 9.5 9.5 0 0 1-9.5-9.5v-.7a9.5 9.5 0 0 1 2.8-6.7l29.4-28.9h-23a9.3 9.3 0 0 1-9.2-9.2 9.3 9.3 0 0 1 9.3-9.4Z"
          fill="url(#e)"
        />
        <motion.path
          style={{ x: arrow3x, y: arrow3y, rotate }}
          d="M57 97.5h33.5v33.6a5.7 5.7 0 0 1-5.7 5.6 5.7 5.7 0 0 1-5.6-5.6v-14l-18 17.9a5.8 5.8 0 0 1-4.1 1.7 5.8 5.8 0 0 1-5.8-5.8v-.4a5.8 5.8 0 0 1 1.7-4.1l17.9-17.6h-14a5.7 5.7 0 0 1-5.6-5.6 5.7 5.7 0 0 1 5.6-5.7Z"
          fill="url(#f)"
        />
        {/*Black pieces*/}
        <motion.path
          variants={innerSquareV}
          custom={{ x: 0, y: 97 }}
          d="M45.2 22A23.2 23.2 0 0 0 22 45.2a23.2 23.2 0 0 0 23.2 23.3h23.3V45.2A23.2 23.2 0 0 0 45.2 22Zm19.2 23.2a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill="#494949"
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 97 }}
          d="M142.8 22.7a22.5 22.5 0 0 0-22.6 22.5v22.5h22.6a22.5 22.5 0 0 0 22.5-22.4v-.1a22.5 22.5 0 0 0-22.5-22.5Zm19.1 22.5a19.1 19.1 0 1 1-38.3 0 19.1 19.1 0 0 1 38.3 0Z"
          fill="#494949"
        />
        <motion.path
          variants={innerSquareV}
          custom={{ x: -97, y: 0 }}
          d="M142.8 120.3h-22.6v22.5a22.5 22.5 0 0 0 22.5 22.5h.1a22.5 22.5 0 0 0 22.5-22.5 22.5 22.5 0 0 0-22.5-22.6Zm0 41.6a19.1 19.1 0 1 1 19.2-19.1 19.1 19.1 0 0 1-19.2 19.1Z"
          fill="#494949"
        />
      </motion.g>
    </motion.svg>
  );
}

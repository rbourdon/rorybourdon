import { motion } from "framer-motion";

const underlineV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: [0, 0, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export default function Underline({ width, sWidth, id, color1, color2 }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${sWidth}`}
    >
      <defs>
        <linearGradient
          id={id ? id + "_underline" : "linearUnderline"}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".2" stopColor={color1} />
          <stop offset=".8" stopColor={color2} />
        </linearGradient>
      </defs>

      <motion.path
        d={`M${width / 2},${sWidth / 2} l-${width / 2},0`}
        stroke={`url(#${id ? id + "_underline" : "linearUnderline"})`}
        strokeWidth={sWidth / 2}
        fill="none"
        variants={underlineV}
      />
      <motion.path
        d={`M${width / 2},${sWidth / 2} l${width / 2},0`}
        stroke={`url(#${id ? id + "_underline" : "linearUnderline"})`}
        strokeWidth={sWidth / 2}
        fill="none"
        variants={underlineV}
      />
    </motion.svg>
  );
}

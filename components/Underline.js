import { motion } from "framer-motion";

export default function Underline({
  variants,
  width,
  sWidth,
  id,
  color1,
  color2,
}) {
  console.log(
    `0 0 ${width} ${sWidth}   `,
    "line: ",
    `M${width / 2},${sWidth / 2} l-${width / 2},0`
  );
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      height={sWidth}
      width={width}
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
        strokeWidth={sWidth}
        fill="none"
        variants={variants}
      />
      <motion.path
        d={`M${width / 2},${sWidth / 2} l${width / 2},0`}
        stroke={`url(#${id ? id + "_underline" : "linearUnderline"})`}
        strokeWidth={sWidth}
        fill="none"
        variants={variants}
      />
    </motion.svg>
  );
}

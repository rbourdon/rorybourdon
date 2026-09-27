import { type MotionValue, motion, type Variants } from "framer-motion";

interface UnderlineProps {
  variants?: Variants;
  width: number;
  sWidth: number;
  id?: string;
  color1: MotionValue<string>;
  color2: MotionValue<string>;
}

export default function Underline({
  variants,
  width,
  sWidth,
  id,
  color1,
  color2,
}: UnderlineProps) {
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
          <motion.stop offset="0" stopColor={color1} />
          <motion.stop offset="1" stopColor={color2} />
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

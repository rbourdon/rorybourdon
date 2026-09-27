import { motion } from "framer-motion";

export default function ArrowIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.4 15.5">
      <motion.g
        fill="none"
        stroke={color || "currentColor"}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={1.2}
      >
        <motion.line
          vectorEffect="non-scaling-stroke"
          d="M6.2 15V1"
          x1="6.2"
          y1=".5"
          x2="6.2"
          y2="15"
        />
        <motion.path
          vectorEffect="non-scaling-stroke"
          d="M.5 6.2 6.1.5a.1.1 0 0 1 .2 0l5.6 5.7"
        />
      </motion.g>
    </svg>
  );
}

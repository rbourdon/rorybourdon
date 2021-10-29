import { motion } from "framer-motion";

export default function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.4 15.5">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
      >
        <motion.path vectorEffect="non-scaling-stroke" d="M6.2 15V1" />
        <motion.path
          vectorEffect="non-scaling-stroke"
          d="M.5 6.2 6.1.5a.1.1 0 0 1 .2 0l5.6 5.7"
        />
      </g>
    </svg>
  );
}

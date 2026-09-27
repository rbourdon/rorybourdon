import { motion } from "framer-motion";

export default function CodeIcon({ width = 23, height = 23, rotate = 0 }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23 23"
      rotate={rotate}
    >
      <defs>
        <clipPath id="a">
          <path fill="none" d="M0 0h23v23H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" fill="currentColor">
        <path d="m22.6 10.5-10-10a1.5 1.5 0 0 0-2.1 0l-2.2 2L11 5.2a1.8 1.8 0 0 1 2.2 1 1.8 1.8 0 0 1 0 1.2l2.6 2.6a1.8 1.8 0 1 1-1.1 2.3 1.8 1.8 0 0 1 0-1.3l-2.4-2.4v6.2a1.8 1.8 0 1 1-2.3.8 1.7 1.7 0 0 1 .3-.4 1.8 1.8 0 0 1 .6-.4V8.5a1.8 1.8 0 0 1-.6-.4 1.8 1.8 0 0 1-.4-2L7.3 3.6l-6.9 7a1.5 1.5 0 0 0 0 2l10 10a1.5 1.5 0 0 0 2.1 0l10-10a1.5 1.5 0 0 0 0-2Z" />
      </g>
    </motion.svg>
  );
}

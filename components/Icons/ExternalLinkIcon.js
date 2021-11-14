import { motion } from "framer-motion";

export default function ExternalLinkIcon({
  width = 23,
  height = 23,
  rotate = 0,
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23 23"
      rotate={rotate}
    >
      <g fill="currentColor">
        <path d="M14.7 8.3a6.8 6.8 0 0 1 0 9.7l-3 3A6.8 6.8 0 0 1 2 11.3l1.7-1.6a.7.7 0 0 1 1.2.5 8 8 0 0 0 .4 2.3.8.8 0 0 1-.1.8l-.6.6A3.2 3.2 0 1 0 9 18.5l3-3a3.2 3.2 0 0 0 0-4.6 3.4 3.4 0 0 0-.4-.4.7.7 0 0 1-.4-.6 1.8 1.8 0 0 1 .6-1.3l1-1a.7.7 0 0 1 .8 0 6.2 6.2 0 0 1 1 .7ZM21 2a6.8 6.8 0 0 0-9.7 0l-3 3a6.8 6.8 0 0 0 0 9.6 6.2 6.2 0 0 0 1 .8.7.7 0 0 0 .9 0l1-1a1.8 1.8 0 0 0 .5-1.3.7.7 0 0 0-.4-.6 3.4 3.4 0 0 1-.4-.4 3.2 3.2 0 0 1 0-4.6l3-3a3.2 3.2 0 1 1 4.5 4.6l-.6.6a.8.8 0 0 0-.1.8 8 8 0 0 1 .4 2.3.7.7 0 0 0 1.2.5l1.7-1.7A6.8 6.8 0 0 0 21 2Z" />
      </g>
    </motion.svg>
  );
}

import { motion } from "framer-motion";

const pathV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: { type: "tween", duration: 0.75, ease: "easeOut" },
  },
  hover: {
    pathLength: [1, 0, 1],
    transition: { type: "tween", duration: 0.75, ease: "easeOut" },
  },
};

const path2V = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: { type: "tween", duration: 0.75, ease: "easeOut" },
  },
  hover: {
    pathLength: 1,
    transition: { type: "tween", duration: 0.75, ease: "easeOut" },
  },
};

const gearV = {
  hidden: {
    rotate: 0,
    scale: 0.25,
  },
  visible: (custom) => ({
    rotate: [0, custom],
    scale: 1,
    transition: {
      scale: { stiffness: 65, damping: 10, mass: 1, type: "spring" },
      rotate: {
        repeat: Infinity,
        duration: 24,
        ease: "linear",
        type: "tween",
      },
    },
  }),
  hover: {
    scale: 1,
    transition: { stiffness: 65, damping: 10, mass: 2, type: "spring" },
  },
};

export default function ProjectsIcon({ iconV }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 240 279"
      variants={iconV}
    >
      <motion.g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth={1.2}
      >
        <motion.g variants={gearV} custom={360}>
          <motion.path
            variants={path2V}
            d="M96.6 17.2a92.7 92.7 0 0 1 14.5-8.8 5 5 0 0 1 5.2.6l12 9.4a72.6 72.6 0 0 1 16-2.8l8.2-13A4.9 4.9 0 0 1 157 .5 95.7 95.7 0 0 1 167.6 2a97.7 97.7 0 0 1 10.2 3 4.9 4.9 0 0 1 3.3 4l1.9 15.2a75.3 75.3 0 0 1 13.3 9.3l15-3.4a4.9 4.9 0 0 1 4.8 1.7 90.2 90.2 0 0 1 11.4 18 4.9 4.9 0 0 1-.5 5.1L217.6 67a73.6 73.6 0 0 1 2.8 16l13 8.1a4.9 4.9 0 0 1 2.2 4.7 94.2 94.2 0 0 1-1.7 10.5h0a95 95 0 0 1-3 10.3 4.9 4.9 0 0 1-4 3.2l-15 1.8a71.4 71.4 0 0 1-9.5 13.4l3.4 14.9a4.9 4.9 0 0 1-1.6 4.8 87.4 87.4 0 0 1-18 11.5 4.9 4.9 0 0 1-5.1-.6l-12-9.4a72 72 0 0 1-16.1 2.9l-8.2 12.9a5 5 0 0 1-4.6 2.3 86.8 86.8 0 0 1-10.5-1.7 89.4 89.4 0 0 1-10.3-3 5 5 0 0 1-3.2-4l-1.9-15a72.8 72.8 0 0 1-13.3-9.4l-15 3.3a4.9 4.9 0 0 1-4.8-1.7 89.3 89.3 0 0 1-11.4-18 5 5 0 0 1 .6-5l9.4-12a71.3 71.3 0 0 1-2.9-16.2l-12.9-8a5 5 0 0 1-2.3-4.7 95.8 95.8 0 0 1 1.7-10.5 93.2 93.2 0 0 1 3-10.3 4.9 4.9 0 0 1 4-3.2L85.5 53a72.2 72.2 0 0 1 9.4-13.4l-3.4-15a4.9 4.9 0 0 1 1.7-4.8l3.4-2.6Z"
          />
          <motion.circle cx="148.7" cy="87.3" r="21.2" />
          <motion.path
            variants={pathV}
            d="M180 48.1a50.3 50.3 0 0 1 13.2 62.4"
          />
          <motion.path
            variants={pathV}
            d="M108.2 57.6a50.4 50.4 0 0 1 33.1-20"
          />
          <motion.path variants={pathV} d="M99.4 77.6a49.8 49.8 0 0 1 2-7" />
          <motion.path
            variants={pathV}
            d="M169 133.2a49.6 49.6 0 0 1-13 3.8 50.5 50.5 0 0 1-24.2-2.4"
          />
        </motion.g>
        <motion.g variants={gearV} custom={-360}>
          <motion.path
            variants={path2V}
            d="M47.8 154.6a65.2 65.2 0 0 1 11.7-1.4 3.4 3.4 0 0 1 3.1 1.8l5 9.4a50.2 50.2 0 0 1 11 2.7l8.8-6a3.4 3.4 0 0 1 3.6 0 65.6 65.6 0 0 1 6.2 4 68.2 68.2 0 0 1 5.7 4.7 3.4 3.4 0 0 1 1 3.5l-3.1 10.2a52.1 52.1 0 0 1 5.8 9.7l10.4 2a3.4 3.4 0 0 1 2.7 2.4 62.5 62.5 0 0 1 2.1 14.7 3.4 3.4 0 0 1-1.8 3.1l-9.4 5a51.3 51.3 0 0 1-2.7 11l5.9 8.8a3.4 3.4 0 0 1 .1 3.6 64 64 0 0 1-4 6.2h0a65.7 65.7 0 0 1-4.8 5.7 3.4 3.4 0 0 1-3.4 1l-10.2-3.2a50.1 50.1 0 0 1-9.7 5.9l-2 10.4a3.4 3.4 0 0 1-2.4 2.6 60.6 60.6 0 0 1-14.7 2.2 3.4 3.4 0 0 1-3.1-1.8l-5-9.4a49.7 49.7 0 0 1-11-2.7l-8.8 5.9a3.4 3.4 0 0 1-3.6 0 61.6 61.6 0 0 1-6.2-4 62.5 62.5 0 0 1-5.8-4.6 3.4 3.4 0 0 1-.9-3.5l3.1-10.1a49.7 49.7 0 0 1-5.8-9.7L5 232.6a3.4 3.4 0 0 1-2.6-2.5 62 62 0 0 1-2.1-14.6 3.4 3.4 0 0 1 1.8-3.1l9.3-5a49.5 49.5 0 0 1 2.8-11l-6-8.8a3.4 3.4 0 0 1 0-3.6 57.5 57.5 0 0 1 8.7-12 3.4 3.4 0 0 1 3.5-.8l10.1 3a49.8 49.8 0 0 1 9.7-5.8l2.2-10.4a3.4 3.4 0 0 1 2.4-2.6l3-.8Z"
          />
          <motion.circle cx="61.1" cy="213.9" r="14.7" />
          <motion.path variants={pathV} d="M41 238.8a33 33 0 0 1-8.7-40.9" />
          <motion.path variants={pathV} d="M88 232.5a33 33 0 0 1-21.7 13.1" />
          <motion.path
            variants={pathV}
            d="M93.8 219.5a34.3 34.3 0 0 1-1.3 4.6"
          />
          <motion.path variants={pathV} d="M48.1 183a33 33 0 0 1 24.4-1" />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

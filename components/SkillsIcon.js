import { motion } from "framer-motion";
//import styled from "styled-components";

export default function SkillsIcon({ iconV }) {
  return (
    // <Container>
    <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153.06 184.04">
      <g fill="none" stroke="#494949" strokeLinecap="round" strokeWidth="1">
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="M108.6 142.9H132"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="M132 156.3h-.1"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="M120.3 156.3h0"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="M108.7 156.3h-.1"
        />
        <motion.path
          variants={iconV}
          d="M120.4 46.1a43.9 43.9 0 0 1-87.8 0Z"
          strokeLinejoin="round"
        />
        <motion.path
          variants={iconV}
          d="m58.5 86.1-5.8 10.2A26.2 26.2 0 0 1 36 109l-10.3 2.5A33.2 33.2 0 0 0 .4 143.7v40h152.3v-40a33.2 33.2 0 0 0-25.4-32.3L117 109a26.2 26.2 0 0 1-16.7-12.6L94.6 86"
          strokeLinejoin="round"
        />
        <motion.rect
          x="67.84"
          y="108.72"
          width="17.38"
          height="17.38"
          rx="0.23"
          transform="rotate(45 76.5 117.4)"
          strokeLinejoin="round"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="M69.6 112.1 51.8 98.6"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="m101.2 98.7-17.7 13.4"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="m70 182.7 6.5-21 6.5 21"
        />
        <motion.path
          variants={iconV}
          strokeLinejoin="round"
          d="m60.1 182.7 16.5-53.5 16.3 53.5"
        />
        <motion.path
          variants={iconV}
          d="M39.7 45.5V34a.8.8 0 0 1 1-.7h9a.8.8 0 0 1 .8.8v11.3"
          strokeMiterlimit="10"
        />
        <motion.path
          variants={iconV}
          d="M60.1 15.5v-3.8a.8.8 0 0 1 1-.8h9a.8.8 0 0 1 .9.7v33.9"
          strokeMiterlimit="10"
        />
        <motion.path
          variants={iconV}
          strokeMiterlimit="10"
          d="M60.1 45.5v-17"
        />
        <motion.path
          variants={iconV}
          d="M80.6 45.5V24.3a.8.8 0 0 1 .9-.8h9a.8.8 0 0 1 .9.8v21.2"
          strokeMiterlimit="10"
        />
        <motion.path
          variants={iconV}
          strokeMiterlimit="10"
          d="M111.9 21.1v24.4"
        />
        <motion.path
          variants={iconV}
          d="M101 45.5V1a.8.8 0 0 1 1-.7h9a.8.8 0 0 1 .8.7v8.6"
          strokeMiterlimit="10"
        />
      </g>
    </motion.svg>
    //</Container>
  );
}

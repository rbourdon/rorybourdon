import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.$zIndex};
  margin: ${(props) => props.$margin};
  pointer-events: none;
  user-select: none;
`;

const computerV = {
  hidden: { x: 60, y: 30 },
  visible: (custom) => ({ x: custom ? 65 : 0, y: custom ? 30 : 0 }),
  selected: (custom) => ({ x: custom ? 65 : 0, y: custom ? 30 : 0 }),
};

const chairV = {
  hidden: { x: -80, y: 30 },
  visible: (custom) => ({ x: custom ? -85 : 0, y: custom ? 30 : 0 }),
  selected: (custom) => ({ x: custom ? -85 : 0, y: custom ? 30 : 0 }),
};

const plantV = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  selected: { opacity: 1, x: 0 },
};

const rightPlantV = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  selected: { opacity: 1, x: 0 },
};

const groundV = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
  selected: { scaleX: 1 },
};

const emailV = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.9,
      opacity: { duration: 0.3, delay: 0.8 },
    },
  },
  selected: { x: 0, opacity: 1 },
};

const noteV = {
  hidden: { x: 100, opacity: 0 },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: custom.duration,
      delay: custom.delay,
    },
  }),
  selected: { x: 0, opacity: 1 },
};

const computerLineV = {
  hidden: { pathLength: 0 },
  visible: (custom) => ({
    pathLength: 1,
    transition: {
      duration: custom.duration,
      delay: custom.delay,
    },
  }),
  selected: { pathLength: 1 },
};

export default function ProjectsSceneIcon({
  margin = "0px",
  zIndex = 1,
  collapsed = true,
  scale = 1,
}) {
  const theme = useContext(ThemeContext);
  return (
    <Container
      $margin={margin}
      $zIndex={zIndex}
      style={{ scale }}
      layoutId="projectSceneIcon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={"100%"}
        viewBox="0 0 542 404"
      >
        {!collapsed && (
          <>
            {/* Right Plant */}
            <motion.g variants={rightPlantV}>
              <path
                d="M518.9 350.3c.6-17.8-7.5-35.5-23.4-41.6 3.8 18.2.6 38.7-8.9 56.7-3.7 7-8.4 14.5-7.1 21.6.8 4.5 4 8 7.8 10s8.1 3.4 12.5 4.4l.8.8c9.7-16.3 17.7-34.1 18.3-52Z"
                fill="#e0dde3"
              />
              <path
                d="M495.3 309a62.5 62.5 0 0 1 11.1 40 32.1 32.1 0 0 1-1.8 9.5 21 21 0 0 1-5.6 8c-2.3 2.1-4.8 4-6.6 6.6a11.4 11.4 0 0 0-1.8 8.7c.6 3.6 2.6 6.5 4.6 9.3 2.2 3 4.6 6.2 5.2 10.3 0 .5.8.2.7-.3-.9-7-7-11.1-9.2-17.5a11 11 0 0 1 .7-9.5c1.7-2.7 4.3-4.7 6.6-6.8a22.5 22.5 0 0 0 5.7-7.7 30.3 30.3 0 0 0 2.2-9.4 65 65 0 0 0-1.7-20.9 60.7 60.7 0 0 0-9.5-20.9c-.3-.4-.9.2-.6.6Z"
                fill="#eceaef"
              />
              <path
                d="M507 344.3a12.6 12.6 0 0 0 9.6-11c0-.5-.7-.5-.8 0a11.7 11.7 0 0 1-9 10.2.4.4 0 0 0 .2.7Z"
                fill="#eceaef"
              />
              <path
                d="M500.3 365.6a17 17 0 0 1-7.2-11.9c0-.5-.8-.2-.8.3a17.6 17.6 0 0 0 7.5 12.3c.4.3.9-.4.5-.7Z"
                fill="#eceaef"
              />
              <path
                d="M502.7 322.5a5.7 5.7 0 0 1-5.6-.4c-.4-.3-.8.4-.4.7a6.4 6.4 0 0 0 6.1.4.5.5 0 0 0 .4-.5.3.3 0 0 0-.4-.2Z"
                fill="#eceaef"
              />
              <path
                d="m439.4 339.6.7.5a63.5 63.5 0 0 1 8.8 8l.6.8a69 69 0 0 1 14 25 72.1 72.1 0 0 1 2.6 11.5c.7 5.4 1.1 11.5 3.6 16a10 10 0 0 0 .9 1.3l28.9.5.2-.1h1.1V402a1.5 1.5 0 0 1 0-.2 228 228 0 0 0-.4-3.6 106.7 106.7 0 0 0-5.7-26.4l-.3-.8a64.5 64.5 0 0 0-5.2-10.6 54.4 54.4 0 0 0-3.7-5.3 45.8 45.8 0 0 0-12.3-10.8 41.8 41.8 0 0 0-32.8-4.9Z"
                fill="#e0dde3"
              />
              <path
                d="M439.4 340a58.3 58.3 0 0 1 34.2 21.8 25.1 25.1 0 0 1 4.2 7.9 17.1 17.1 0 0 1 0 9c-.7 3-1.8 5.8-1.8 8.8a9 9 0 0 0 3.6 7.3c2.8 2.1 6.3 3 9.7 3.8 4 .8 8 1.6 10.9 4.2.3.3.9-.3.5-.6-5-4.5-13-3.7-18.8-6.9-2.7-1.5-4.9-3.9-5.1-7.2-.2-3 .9-6 1.7-8.9a18.4 18.4 0 0 0 .3-9 23.5 23.5 0 0 0-3.8-8 55.3 55.3 0 0 0-14.2-13.9 61 61 0 0 0-21.1-9c-.5-.2-.7.6-.2.7Z"
                fill="#eceaef"
              />
              <path
                d="M471.2 358c3.9-4 4.7-9.8 1.9-13.7-.3-.4-1 .1-.7.5 2.6 3.7 1.8 9-1.8 12.7-.4.4.2.9.6.5Z"
                fill="#eceaef"
              />
              <path
                d="M478.3 377.3a18 18 0 0 1-13.6-4.2c-.3-.3-.9.4-.5.7a18.8 18.8 0 0 0 14.1 4.2c.5 0 .5-.8 0-.7Z"
                fill="#eceaef"
              />
              <path
                d="M454.2 345a7 7 0 0 1-5.2 3.1c-.5 0-.5.8 0 .8a8 8 0 0 0 5.7-3.4.4.4 0 0 0 0-.6.4.4 0 0 0-.5.1Z"
                fill="#eceaef"
              />
            </motion.g>
            {/* Left Plant */}
            <motion.g variants={plantV}>
              <path
                d="m51.7 299.7-3.9 4.8a19.6 19.6 0 0 0 4.9.3 30.6 30.6 0 0 1-8 13.6l-1.2 1-.2.2-.3-1-2-5.3a18.1 18.1 0 0 1-4.8-9 17.4 17.4 0 0 1-.3-6c1-8.6 8.4-16.5 6.6-25a30.4 30.4 0 0 1 9 12.3l-3 3.8a19.7 19.7 0 0 0 4.4.3 29.4 29.4 0 0 1 .9 6.5v1l-2 2.4Z"
                fill="#e0dde3"
              />
              <path
                d="M54.4 219.5a14.1 14.1 0 0 1-1.3 4 18.8 18.8 0 0 1-7.8 8.1l-.6.3-.7-1a25.1 25.1 0 0 1-3.5-7.9c-.7-3.3-.3-7 1.8-9.5s6-3.8 9-2.1a6.4 6.4 0 0 1 2 2l-.8 1-.1.1-.8 1-3.1 3.8a19.7 19.7 0 0 0 4.5.3h1.4Z"
                fill="#e0dde3"
              />
              <path d="M43 232.7a17.5 17.5 0 0 0 1.7-.8v.1Z" fill="#e0dde3" />
              <path
                d="m51.7 299.7-3.9 4.8a19.6 19.6 0 0 0 4.9.3 30.6 30.6 0 0 1-8 13.6l-1.2 1-.2.2-.3-1-2-5.3a18.1 18.1 0 0 1-4.8-9 17.4 17.4 0 0 1-.3-6c1-8.6 8.4-16.5 6.6-25a30.4 30.4 0 0 1 9 12.3l-3 3.8a19.7 19.7 0 0 0 4.4.3 29.4 29.4 0 0 1 .9 6.5v1l-2 2.4Z"
                fill="#e0dde3"
              />
              <path
                d="m33.3 245.2-.4 5.2-.1 1.4-.3-.1a29.9 29.9 0 0 1-16.8-24l6.1-1a20 20 0 0 0-6-5.2 30.2 30.2 0 0 1 5.4-14.5c.6 8.8 9.7 14.3 13 22.4a18.2 18.2 0 0 1-.9 15.8Z"
                fill="#e0dde3"
              />
              <path
                d="M31.6 291H30a30.6 30.6 0 0 1-22-9.6 29.7 29.7 0 0 1-5.5-8.5h.2l6-1a19.9 19.9 0 0 0-8.2-6.3 30.2 30.2 0 0 1-.1-8.5c4.5 7.5 15.3 8 22 13.6a18.3 18.3 0 0 1 6.3 10.6 17.8 17.8 0 0 1 .3 3v.8l.1.3Z"
                fill="#e0dde3"
              />
              <path
                d="M54.4 219.5a14.1 14.1 0 0 1-1.3 4 18.8 18.8 0 0 1-7.8 8.1l-.6.3-.7-1a25.1 25.1 0 0 1-3.5-7.9c-.7-3.3-.3-7 1.8-9.5s6-3.8 9-2.1a6.4 6.4 0 0 1 2 2l-.8 1-.1.1-.8 1-3.1 3.8a19.7 19.7 0 0 0 4.5.3h1.4Z"
                fill="#e0dde3"
              />
              <path
                d="m33.3 245.2-.4 5.2-.1 1.4-.3-.1a29.9 29.9 0 0 1-16.8-24l6.1-1a20 20 0 0 0-6-5.2 30.2 30.2 0 0 1 5.4-14.5c.6 8.8 9.7 14.3 13 22.4a18.2 18.2 0 0 1-.9 15.8Z"
                fill="#e0dde3"
              />
              <path
                d="M49.6 326.2a71.2 71.2 0 0 1-12.3-16.4 72.8 72.8 0 0 1-7.3-19 69.8 69.8 0 0 1-1.5-20.7 72.4 72.4 0 0 1 15-38.7l1.6-2c.6-.7 1.7.3 1.1 1a69.8 69.8 0 0 0 4.5 94.7.8.8 0 0 1-1 1Z"
                fill="#e0dde3"
              />
              <path
                d="M89 383.6a20.7 20.7 0 0 1-9.4 13.7 25 25 0 0 1-3.6 2 31.2 31.2 0 0 1-4.3 1.6c-6.5 2-13.4 2-20.2 2l-20.5.2c-5.4 0-11 0-16-2h-.2c-5-2.2-9.1-6.9-9-12.2a11 11 0 0 1 1.5-5.3 15.5 15.5 0 0 1 2.3-3 37.6 37.6 0 0 1 10-6.8c5.8-3 12.4-6.8 14.1-12.8a10.6 10.6 0 0 0 .4-2c.4-4-1.6-7.9-4.2-11.3l-.7-1-1.8-2-.8-1a32 32 0 0 1-6-8.9 13 13 0 0 1-.9-4.3c0-5.3 5.8-10.7 10.3-8.2l6.7-.6 8-.8 1.9-.2 16.8-1.7c2.5-.3 5.4-.3 7 1.6 1.8 2 .9 5.4-.9 7.5s-4.2 3.6-5.8 5.8a12.5 12.5 0 0 0-2 9.8 18.1 18.1 0 0 0 .8 3 20 20 0 0 0 2.5 4.9c3.7 5.2 9.2 8.7 14 12.8s9.4 9.3 10 15.6v.6a15 15 0 0 1 0 3Z"
                fill="#e0dde3"
              />
            </motion.g>
          </>
        )}

        {/* Desk */}
        <motion.path
          layoutId="projectSceneChair"
          variants={computerV}
          custom={collapsed}
          d="M225.4 263c0-3.4-1.1-6-2.5-6H118.6c-1.4 0-2.5 2.6-2.5 6v138.1a1.3 1.3 0 0 1-1.1 1.3l-3 .3-1.7.1-.9-1.6a1.2 1.2 0 0 1-.1-.6V252.3a37 37 0 0 1 .5-3.8c1.1-5.8 3.5-9.8 6.2-9.8h109.6a2.9 2.9 0 0 1 1.1.3 4.4 4.4 0 0 1 1.4 1 9 9 0 0 1 1.4 1.9 25 25 0 0 1 2.7 10s0 0 0 .1v3l.2 13.5v8l.2 25.1v9l.3 91.5a1.3 1.3 0 0 1-1.2 1.3h-5a1.3 1.3 0 0 1-1.3-1.3Z"
          fill={theme.primary_verydark}
        />
        {/* Chair */}
        <motion.g
          fill={theme.primary_verydark}
          variants={chairV}
          custom={collapsed}
        >
          <path d="m430.9 330-1.3-.1v-28.6h-41.3v2.3h-18.7a8.2 8.2 0 0 0-8.2 8.2v11.8a8.2 8.2 0 0 0 8.2 8.3h61.9c.3-.3-1-1.5-.6-1.8Z" />
          <path d="M431.3 330.6c-1.4 2-2.5 2-3.4.6a10.4 10.4 0 0 1-1.3-2.4c-3-7.5-4.8-24.9-10.4-18.8l-3.3 3.6-6.4 6.6a2 2 0 0 0 0-.2c-1 1-.3-8-.7-10.5-.1-.5-.2-.8-.5-.5v-.8a11.5 11.5 0 0 1 0-1.1 10 10 0 0 1 .2-1.1l18.2-97.1a12.1 12.1 0 0 1 14.2-9.7l3.3.6a12.4 12.4 0 0 1 3.7 1.3 12.2 12.2 0 0 1 6 12.8Z" />
          <path d="m376.1 402.3-7.6.1 21.2-73.8 7.7 2.4-21.3 71.3z" />
          <path d="m426.3 402.4-7.7-.1-21-70.4-.2-1 4.9-1.4h3l.7 2.4Z" />
          <path d="M415 264.5a5.4 5.4 0 0 1-3.4 5 5 5 0 0 1-1.6.4 3 3 0 0 1-.4 0h-10.5v51l-.5.6-2.7 3.5-.6.7-1 1.1-.2.4-1.6 1.8-.3.3-1.2 1.5a5.3 5.3 0 0 1-1.5-1.3 5.3 5.3 0 0 1-.7-1 5.3 5.3 0 0 1-.5-2.3v-56.3h-23.7a5.3 5.3 0 0 1-2-.4 5.4 5.4 0 0 1-3.2-3.8 5.4 5.4 0 0 1 .4-3.6 5.1 5.1 0 0 1 1-1.4 5.5 5.5 0 0 1 3.9-1.6h45a5.5 5.5 0 0 1 5.4 5.4Z" />
          <path d="M445 159.2a17 17 0 0 0-19.9 13.6 17 17 0 0 0 10.5 19l-5.1 27.4 10.7 2 11.3-60.6Z" />
        </motion.g>

        {/* Computer */}
        <motion.g variants={computerV} custom={collapsed}>
          <motion.path
            d="m186 234.1-42.5-.2h-9.7a1.7 1.7 0 0 0-1.2.4l-5.3 5.3a1.3 1.3 0 0 0-.3.5 1.8 1.8 0 0 0 .9 2.4 1.9 1.9 0 0 0 .6.2h55.2a1.8 1.8 0 0 0 1.6-1l.4-1 .9-1.9 1-2.1a1.7 1.7 0 0 0 .1-.8 1.8 1.8 0 0 0-1.7-1.8Z"
            fill={theme.primary_verydark}
          />
          <motion.path
            d="m186 234.1-42.5-.2h-9.7a1.7 1.7 0 0 0-1.2.4l-5.3 5.3a1.3 1.3 0 0 0-.3.5 1.8 1.8 0 0 0 .9 2.4 1.9 1.9 0 0 0 .6.2h55.2a1.8 1.8 0 0 0 1.6-1l.4-1 .9-1.9 1-2.1a1.7 1.7 0 0 0 .1-.8 1.8 1.8 0 0 0-1.7-1.8Z"
            fill={theme.primary_verydark}
          />
          <motion.path
            d="m185.6 240.7-.4.9a1.8 1.8 0 0 1-1.6 1h-55.1a1.8 1.8 0 0 1-1.7-1.8 1.7 1.7 0 0 1 .1-.7.6.6 0 0 1 .1-.1Z"
            fill={theme.primary_superdark}
          />
          <motion.path
            d="M164.8 199.2 148 72a1.9 1.9 0 0 0-.7-1.2l-11.5-14.4-1-.8a1.8 1.8 0 0 0-1.3-.4l-1.8.3a1.8 1.8 0 0 0-1.5 2l17.3 131.6 1 8 1.3 9.6 2 14.9a1.8 1.8 0 0 0 .8 1.2 1.8 1.8 0 0 0 1.4.3l1.1-.3a1.9 1.9 0 0 0 1-.7l.5-.7.2-.3 7.6-20.9a1.8 1.8 0 0 0 .3-1.1Z"
            fill={theme.primary_verydark}
          />
          <motion.path
            fill={theme.primary_dark}
            d="m151.1 201.5-7.3 31.9-4.6 5.1h-3.4l13.8-58 .7 9.8.8 11.2z"
          />
          <motion.path
            fill={theme.primary_superdark}
            d="m150.3 190.3-11.8 48.2h-2.7l13.8-58 .7 9.8z"
          />
          <motion.path
            d="m135.9 56.5 21 164.8-.3.3-.4.7a1.8 1.8 0 0 1-1 .7l-1.1.3a1.8 1.8 0 0 1-2.2-1.3 1.8 1.8 0 0 1 0-.2L130.2 57.6a1.8 1.8 0 0 1 1.6-2l1.7-.2a1.8 1.8 0 0 1 1.4.3Z"
            fill={theme.primary_superdark}
          />
          <motion.path
            fill={theme.orange}
            d="m136.5 61.2 11.2 15.9 13.2 100.8-7.2 14.3-17.2-131z"
          />
          <motion.path
            d="m175.6 201.3-4 4.5a1.3 1.3 0 0 1-1.5.2 4.2 4.2 0 0 1-1.7-1.2 60.2 60.2 0 0 0-9.8-9 4.2 4.2 0 0 1-1.4-1.6 1.3 1.3 0 0 1 0-1.3c0-2.5 1.4-4 4.1-4.6.5-.5 1.6-.3 2.5.4a99.2 99.2 0 0 1 11.2 10.1c.8 1 1 2 .6 2.5Z"
            fill={theme.orange}
          />
          <motion.path
            d="m165 191.6-3.4 3.8c-.1.1-.4 0-.6-.2s-.4-.4-.2-.6l3.4-3.8c.1-.1.4 0 .7.2s.3.5.2.6Z"
            fill={theme.primary_verylight}
          />
          <motion.path
            d="m168.5 194.7-3.5 3.8c0 .1-.4 0-.6-.2s-.4-.5-.2-.6l3.4-3.8c.1-.1.4 0 .7.2s.3.5.2.6Z"
            fill={theme.primary_verylight}
          />
          <motion.path
            d="m171.9 197.8-3.5 3.8c0 .1-.4 0-.6-.2s-.3-.5-.2-.6l3.4-3.8c.1-.1.4 0 .6.1s.4.6.3.7Z"
            fill={theme.primary_verylight}
          />
          {!collapsed && (
            <>
              {/* Computer Lines */}
              <motion.path
                variants={computerLineV}
                custom={{ delay: 1.05, duration: 0.5 }}
                fill="none"
                stroke="#3f3d56"
                strokeWidth={1}
                d="m146 101 l98 -76"
              />
              <motion.path
                variants={computerLineV}
                custom={{ delay: 0.9, duration: 0.5 }}
                d="m150 136 l96 12"
                fill="none"
                stroke="#3f3d56"
                strokeWidth={1}
              />

              <motion.g variants={noteV} custom={{ delay: 1.3, duration: 0.7 }}>
                {/* Note 2 */}
                <path
                  d="M281 42.8h-38.3a3.9 3.9 0 0 1-3.8-4v-35a3.9 3.9 0 0 1 3.8-3.8H281a3.9 3.9 0 0 1 3.9 3.9v35a3.9 3.9 0 0 1-3.9 3.9Z"
                  fill="#e6e6e6"
                />
                <path
                  d="M278.3 39.5h-32.9a3.4 3.4 0 0 1-3.4-3.4V6.7a3.4 3.4 0 0 1 3.4-3.5h33a3.5 3.5 0 0 1 3.4 3.5V36a3.5 3.5 0 0 1-3.5 3.4Z"
                  fill="#eceaef"
                />
                <motion.path
                  d="M275 11.8h-26.3a.9.9 0 1 1 0-1.7H275a.9.9 0 1 1 0 1.7Z"
                  fill={theme.orange}
                />
                <motion.path
                  d="M275 15.2h-26.3a.9.9 0 0 1 0-1.7H275a.9.9 0 1 1 0 1.7Z"
                  fill={theme.orange}
                />
                <motion.path
                  d="M260.1 18.6h-11.4a.9.9 0 0 1 0-1.7h11.4a.9.9 0 1 1 0 1.7Z"
                  fill={theme.orange}
                />
                <path
                  d="M275 25.7h-26.3a.9.9 0 1 1 0-1.7H275a.9.9 0 1 1 0 1.7Z"
                  fill="#d8d5db"
                />
                <path
                  d="M275 29h-26.3a.9.9 0 1 1 0-1.6H275a.9.9 0 0 1 0 1.7Z"
                  fill="#d8d5db"
                />
                <path
                  d="M260.1 32.5h-11.4a.9.9 0 0 1 0-1.8h11.4a.9.9 0 1 1 0 1.8Z"
                  fill="#d8d5db"
                />
              </motion.g>
              <motion.g variants={noteV} custom={{ delay: 1.1, duration: 0.7 }}>
                {/* Note 1 */}
                <path
                  d="M275.4 176.8H237a3.9 3.9 0 0 1-3.9-3.9v-50.7a3.9 3.9 0 0 1 3.9-3.8h38.3a3.9 3.9 0 0 1 3.8 3.8V173a3.9 3.9 0 0 1-3.8 3.9Z"
                  fill="#e6e6e6"
                />
                <path
                  d="M272.7 173.6h-33a3.4 3.4 0 0 1-3.3-3.5V125a3.4 3.4 0 0 1 3.4-3.4h32.9a3.4 3.4 0 0 1 3.4 3.4v45a3.4 3.4 0 0 1-3.4 3.6Z"
                  fill="#eceaef"
                />
                <motion.path
                  d="M269.4 130.2H243a.9.9 0 1 1 0-1.7h26.3a.9.9 0 1 1 0 1.7Z"
                  fill={theme.orange}
                />
                <motion.path
                  d="M269.4 133.6H243a.9.9 0 0 1 0-1.8h26.3a.9.9 0 0 1 0 1.8Z"
                  fill={theme.orange}
                />
                <motion.path
                  d="M254.5 137H243a.9.9 0 1 1 0-1.7h11.4a.9.9 0 1 1 0 1.7Z"
                  fill={theme.orange}
                />
              </motion.g>
            </>
          )}
        </motion.g>
        {/* Email */}
        {!collapsed && (
          <motion.g variants={emailV}>
            <path
              d="M269.4 144H243a.9.9 0 0 1 0-1.7h26.3a.9.9 0 0 1 0 1.8Z"
              fill="#d8d5db"
            />
            <path
              d="M269.4 147.4H243a.9.9 0 1 1 0-1.7h26.3a.9.9 0 1 1 0 1.8Z"
              fill="#d8d5db"
            />
            <path
              d="M254.5 150.8H243a.9.9 0 0 1 0-1.7h11.4a.9.9 0 0 1 0 1.7Z"
              fill="#d8d5db"
            />
            <path
              d="M269.4 158H243a.9.9 0 0 1 0-1.7h26.3a.9.9 0 1 1 0 1.7Z"
              fill="#d8d5db"
            />
            <path
              d="M269.4 161.3H243a.9.9 0 0 1 0-1.7h26.3a.9.9 0 0 1 0 1.7Z"
              fill="#d8d5db"
            />
            <path
              d="M254.5 164.7H243a.9.9 0 1 1 0-1.7h11.4a.9.9 0 1 1 0 1.7Z"
              fill="#d8d5db"
            />
            <path
              d="M216 210.1h-47.2a2.8 2.8 0 0 0-2.8 2.8v29.4a2.8 2.8 0 0 0 2.8 2.8H216a2.8 2.8 0 0 0 2.8-2.8v-29.4a2.8 2.8 0 0 0-2.8-2.8Z"
              fill="#eceaef"
            />
            <path
              d="M216 210.1h-47.2a2.8 2.8 0 0 0-2.8 2.8v29.4a2.8 2.8 0 0 0 2.8 2.8H216a2.8 2.8 0 0 0 2.8-2.8v-29.4a2.8 2.8 0 0 0-2.8-2.8Zm1 21.1a11.4 11.4 0 0 1-11.3 11.4h-3.2l-32-.1a2.6 2.6 0 0 1-2.6-2.6v-27a1 1 0 0 1 .9-.9H216a1 1 0 0 1 1 1Z"
              fill="#e0dde3"
            />
            <path
              d="M209.8 228.9h-36a1.5 1.5 0 0 1-1.4-1l-5.6-15.6a1.6 1.6 0 0 1 1.5-2l48.2-.2a1.5 1.5 0 0 1 1.5 1.6 1.6 1.6 0 0 1-.1.6l-6.7 15.6a1.5 1.5 0 0 1-1.4 1Z"
              fill="#e0dde3"
            />
            <circle cx="192.4" cy="228.9" r="3.8" fill="#494949" />
          </motion.g>
        )}
        {/* Ground */}
        {!collapsed && (
          <motion.path
            variants={groundV}
            d="M542 403 H-3.0"
            fill="none"
            strokeWidth={1.2}
            style={{ stroke: theme.primary_slightlydark }}
          />
        )}
      </svg>
    </Container>
  );
}

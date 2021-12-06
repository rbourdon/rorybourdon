import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export default function Logo({ color, variants = {} }) {
  const theme = useContext(ThemeContext);

  return (
    <Container variants={variants}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 311.3 311.3"
        height="100%"
        width="100%"
      >
        <motion.g fill={color || theme.primary_verydark}>
          <path d="M157.9 79.5a6.5 6.5 0 0 0-.7-4.7 7.2 7.2 0 0 0-.8-1.2L122 37.3a13.6 13.6 0 0 0-9.8-4.2H61a13.6 13.6 0 0 0-12.5 8.3l-34.2 81a13.5 13.5 0 0 0 3 14.8L54 174a13.5 13.5 0 0 0 9.6 4h25.7a13.6 13.6 0 0 0 13.5-13.5v-9.4a13.6 13.6 0 0 0-13.5-13.6H78.8a13.5 13.5 0 0 1-9.6-4l-10.6-10.7a13.5 13.5 0 0 1-3-14.7L69.7 78a13.6 13.6 0 0 1 12.6-8.4h15a13.6 13.6 0 0 1 9.7 4l13 13.1a13.6 13.6 0 0 1 4 9.6v131.4a4.2 4.2 0 0 0 3.8 4.2l6 .6a4.2 4.2 0 0 0 4.6-3.6Z" />
          <path d="M153.4 231.8a6.2 6.2 0 0 0 1.5 5.9l34.3 36.3a13.6 13.6 0 0 0 9.8 4.3h51.2a13.6 13.6 0 0 0 12.5-8.3l34.2-81a13.5 13.5 0 0 0-3-14.9l-36.7-36.7a13.6 13.6 0 0 0-9.6-4h-25.7a13.5 13.5 0 0 0-13.5 13.5v9.4a13.6 13.6 0 0 0 13.5 13.6h10.6a13.5 13.5 0 0 1 9.6 4l10.7 10.7a13.5 13.5 0 0 1 3 14.7l-14.2 34.1a13.6 13.6 0 0 1-12.5 8.4h-15.2a13.6 13.6 0 0 1-9.5-4l-13.2-13.2a13.5 13.5 0 0 1-4-9.6V84.8a4.3 4.3 0 0 0-3.8-4.2l-5.8-.6a4.3 4.3 0 0 0-4.7 3.7Z" />
        </motion.g>
      </motion.svg>
    </Container>
  );
}

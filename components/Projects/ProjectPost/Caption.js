import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

const ImageCaption = styled(motion.figcaption)`
  height: max-content;
  width: 100%;
  font-size: clamp(0.9rem, 0.9vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 1.5vw, 1.55rem);
  padding: 5px 0;
`;

export default function Caption({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <ImageCaption style={{ color: theme.primary_mediumdark }}>
      {children}
    </ImageCaption>
  );
}

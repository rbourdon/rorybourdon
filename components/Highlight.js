import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

const HighlightedText = styled(motion.em)`
  display: inline;
  font-weight: 300;
  font-style: normal;
`;

export default function Highlight({ children }) {
  const theme = useContext(ThemeContext);
  return (
    <HighlightedText style={{ color: theme.teal }}>{children}</HighlightedText>
  );
}

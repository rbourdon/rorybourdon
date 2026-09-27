import { motion } from "framer-motion";
import styled from "styled-components";

const HighlightedText = styled(motion.em)`
  display: inline;
  font-weight: 300;
  font-style: normal;
`;

export default function Highlight({ children, color }) {
  return <HighlightedText style={{ color }}>{children}</HighlightedText>;
}

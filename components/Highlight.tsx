import { type MotionValue, motion } from "framer-motion";
import type { ReactNode } from "react";
import styled from "styled-components";

const HighlightedText = styled(motion.em)`
  display: inline;
  font-weight: 300;
  font-style: normal;
`;

interface HighlightProps {
  children: ReactNode;
  color: MotionValue<string>;
}

export default function Highlight({ children, color }: HighlightProps) {
  return <HighlightedText style={{ color }}>{children}</HighlightedText>;
}

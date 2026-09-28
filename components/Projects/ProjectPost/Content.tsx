import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styled from "styled-components";

// A div, not a <p>: multi-line <Content> in the CMS wraps its text in a
// markdown <p>, and a <p> inside a <p> made server HTML and React disagree
// (hydration error #418).
const Text = styled(motion.div)`
  width: 100%;
  height: max-content;
  font-size: clamp(1.2rem, 4vw, 1.45rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  padding: 1vw 0;
`;

export default function Content({ children }: { children?: ReactNode }) {
  return <Text>{children}</Text>;
}

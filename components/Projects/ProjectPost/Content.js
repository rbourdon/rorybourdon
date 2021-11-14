import styled from "styled-components";
import { motion } from "framer-motion";

const Text = styled(motion.p)`
  width: 100%;
  height: max-content;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  padding: 10px 0;
`;

export default function Content({ children }) {
  return <Text>{children}</Text>;
}
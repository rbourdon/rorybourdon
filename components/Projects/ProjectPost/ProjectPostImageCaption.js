import styled from "styled-components";
import { motion } from "framer-motion";

const Caption = styled(motion.figcaption)`
  height: max-content;
  width: 100%;
  font-size: clamp(0.9rem, 1vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 1.5vw, 1.55rem);
  padding: 5px 0;
`;

export default function ProjectPostImageCaption({ children }) {
  return <Caption>{children}</Caption>;
}

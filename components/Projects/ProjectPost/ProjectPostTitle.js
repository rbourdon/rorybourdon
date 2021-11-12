import styled from "styled-components";
import { motion } from "framer-motion";

const Title = styled(motion.h2)`
  font-size: clamp(1rem, 4vw, 1.7525rem);
  font-weight: 100;
`;

export default function ProjectPostTitle({ children }) {
  return <Title>{children}</Title>;
}

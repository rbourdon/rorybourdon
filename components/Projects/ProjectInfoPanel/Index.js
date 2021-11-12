import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.section)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  align-self: start;
`;

export default function ProjectInfoPanel({ children }) {
  return <Container>{children}</Container>;
}

import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.section)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3vw 0 0 0;

  @media (max-width: 555px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export default function ProjectInfoPanel({ children }) {
  return <Container>{children}</Container>;
}

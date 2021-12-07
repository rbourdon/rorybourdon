import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export default function TitleBlock({ children }) {
  return <Container>{children}</Container>;
}

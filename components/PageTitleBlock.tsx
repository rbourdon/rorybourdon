import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export default function TitleBlock({ children }) {
  return <Container>{children}</Container>;
}

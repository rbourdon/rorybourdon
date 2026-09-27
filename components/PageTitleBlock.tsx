import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export default function TitleBlock({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 1;
`;

const containerV = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.4,
    },
  },
  selected: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function CardEffect({ position = "absolute", children }) {
  return (
    <Container
      layout
      style={{ position: position }}
      variants={containerV}
      transition={{ type: "spring", stiffness: 100, mass: 1, damping: 14 }}
    >
      {children}
    </Container>
  );
}

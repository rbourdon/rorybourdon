import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.span)`
  width: 100%;
  max-width: 100%;
  height: 1400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 31;

  @media (max-width: 780px) {
    height: 200vh;
  }
`;

const containerV = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  visible: (custom) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: custom,
    },
  }),
  selected: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export default function CardEffect({
  position = "absolute",
  children,
  delay = 0,
}) {
  return (
    <Container
      layout
      style={{ position: position }}
      variants={containerV}
      custom={delay}
      transition={{ type: "spring", stiffness: 100, mass: 1, damping: 14 }}
    >
      {children}
    </Container>
  );
}

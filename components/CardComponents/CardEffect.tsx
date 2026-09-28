import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
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

const containerV: Variants = {
  hidden: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  visible: (custom: number) => ({
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

interface CardEffectProps {
  position?: "absolute" | "fixed";
  children?: ReactNode;
  delay?: number;
}

export default function CardEffect({
  position = "absolute",
  children,
  delay = 0,
}: CardEffectProps) {
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

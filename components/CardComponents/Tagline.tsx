import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import styled, { useTheme } from "styled-components";

const Text = styled(motion.p)<{ $padding: string }>`
  height: max-content;
  max-width: 80%;
  text-align: center;
  font-weight: 300;
  font-size: 1.125rem;
  padding: ${(props) => props.$padding};
  user-select: none;
`;

interface TaglineProps {
  children?: ReactNode;
  height: number;
  bRadius: number;
  stemLoc: number;
  stemDir?: string;
  variants?: Variants;
}

export default function Tagline({
  children,
  height,
  bRadius,
  stemLoc,
  variants,
}: TaglineProps) {
  const theme = useTheme();
  const y = {
    visible:
      stemLoc === 3 || stemLoc === 8
        ? (height - bRadius * 2) * 0.335 + bRadius / 2
        : stemLoc === 4 || stemLoc === 7
          ? (height - bRadius * 2) * 0.665 + bRadius / 2
          : 0,
    hidden:
      stemLoc === 3 || stemLoc === 8
        ? (height - bRadius * 2) * 0.335 + bRadius / 2 + 50
        : stemLoc === 4 || stemLoc === 7
          ? (height - bRadius * 2) * 0.665 + bRadius / 2 + 50
          : stemLoc === 1 || stemLoc === 2
            ? -50
            : 50,
  };

  return (
    <Text
      $padding={
        stemLoc === 3 || stemLoc === 4
          ? "2px 0 0 10px"
          : stemLoc === 7 || stemLoc === 8
            ? "2px 10px 0 0"
            : "2px 0 0 0"
      }
      custom={y}
      variants={variants}
      style={{ color: theme.primary_dark }}
    >
      {children}
    </Text>
  );
}

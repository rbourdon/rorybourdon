import styled from "styled-components";
import { motion } from "framer-motion";

const Text = styled(motion.p)`
  height: max-content;
  min-width: max-content;
  font-weight: 300;
  font-size: 1.125rem;
  padding: ${(props) => props.$padding};
`;

export default function Tagline({
  children,
  height,
  bRadius,
  stemLoc,
  variants,
}) {
  const y = {
    visible:
      stemLoc === 3 || stemLoc === 8
        ? (height - bRadius * 2) * 0.335 + bRadius / 2
        : (height - bRadius * 2) * 0.665 + bRadius / 2,
    hidden:
      stemLoc === 3 || stemLoc === 8
        ? (height - bRadius * 2) * 0.335 + bRadius / 2 + 50
        : (height - bRadius * 2) * 0.665 + bRadius / 2 + 50,
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
    >
      {children}
    </Text>
  );
}

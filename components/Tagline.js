import styled from "styled-components";
import { motion } from "framer-motion";

const Text = styled(motion.p)`
  height: max-content;
  min-width: max-content;
  font-weight: 300;
  font-size: 1.125rem;
  padding-left: 10px;
  padding-top: 2px;
`;

const tagV = {
  hidden: (custom) => ({ y: custom.hidden, opacity: 0 }),
  visible: (custom) => ({
    opacity: 1,
    y: custom.visible,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  }),
};

export default function Tagline({ children, cardHeight, bRadius }) {
  const y = {
    visible: (cardHeight - bRadius * 2) * 0.335 + bRadius / 2,
    hidden: (cardHeight - bRadius * 2) * 0.335 + bRadius / 2 + 50,
  };
  return (
    <Text custom={y} variants={tagV}>
      {children}
    </Text>
  );
}

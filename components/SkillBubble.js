import styled, { ThemeContext } from "styled-components";
import { motion, useTransform } from "framer-motion";
import { useContext } from "react";

const Bubble = styled(motion.div)`
  height: 36px;
  width: max-content;
  min-width: 75px;
  padding: 0 22px;
  font-weight: 300;
  font-size: 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const bubbleV = {
  hidden: { y: 45, opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function SkillBubble({ title, pos }) {
  const theme = useContext(ThemeContext);
  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "1px solid  " + latestColor1
  );
  return (
    <Bubble
      key={title + "_bub"}
      variants={bubbleV}
      layout
      custom={pos}
      style={{ border }}
    >
      {title}
    </Bubble>
  );
}

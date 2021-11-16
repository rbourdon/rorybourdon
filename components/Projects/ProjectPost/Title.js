import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

const PostTitle = styled(motion.h2)`
  font-weight: 100;
  width: 100%;
  text-align: center;
  padding: 3vw 0 3vw 0;
`;

export default function Title({
  children,
  color,
  variants = {
    hidden: {
      y: 500,
    },
    visible: {
      y: 0,
    },
  },
}) {
  const theme = useContext(ThemeContext);
  return (
    <PostTitle
      style={{ color: color || theme.primary_dark }}
      variants={variants}
    >
      {children}
    </PostTitle>
  );
}

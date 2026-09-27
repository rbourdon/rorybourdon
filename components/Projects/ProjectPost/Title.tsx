import { motion } from "framer-motion";

import styled, { useTheme } from "styled-components";

const PostTitle = styled(motion.h2)`
  font-weight: 200;
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
  const theme = useTheme();
  return (
    <PostTitle
      style={{ color: color || theme.primary_dark }}
      variants={variants}
    >
      {children}
    </PostTitle>
  );
}

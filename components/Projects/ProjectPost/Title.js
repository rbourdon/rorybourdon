import styled from "styled-components";
import { motion } from "framer-motion";

const PostTitle = styled(motion.h2)`
  font-weight: 100;
  width: 100%;
  text-align: center;
  padding: 2vw 0 3vw 0;
`;

export default function Title({ children }) {
  return <PostTitle>{children}</PostTitle>;
}

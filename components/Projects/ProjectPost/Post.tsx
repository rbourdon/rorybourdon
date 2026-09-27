import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styled from "styled-components";

const Block = styled(motion.div)`
  width: 100%;
  height: max-content;
  padding: 1vw 3vw 5vw 3vw;
  justify-self: end;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

interface PostProps {
  children?: ReactNode;
  variants?: Variants;
}

export default function Post({
  children,
  variants = {
    hidden: {
      y: 500,
    },
    visible: {
      y: 0,
    },
  },
}: PostProps) {
  return <Block variants={variants}>{children}</Block>;
}

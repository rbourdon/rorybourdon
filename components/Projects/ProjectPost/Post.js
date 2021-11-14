import styled from "styled-components";
import { motion } from "framer-motion";

const Block = styled(motion.div)`
  width: 100%;
  height: max-content;
  padding: 5vw 3.5vw;
  justify-self: end;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

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
}) {
  return <Block variants={variants}>{children}</Block>;
}

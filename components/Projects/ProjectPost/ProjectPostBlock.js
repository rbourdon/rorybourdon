import styled from "styled-components";
import { motion } from "framer-motion";

const Block = styled(motion.div)`
  width: 100%;
  height: max-content;
  padding: 100px 40px;
  justify-self: end;
  grid-column: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function ProjectPostBlock({
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

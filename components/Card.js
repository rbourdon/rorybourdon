import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const defaultWidth = 200;
const defaultHeight = 200;

export default function Card({ width, height, children, variants }) {
  return (
    <Container
      $width={width ? width : defaultWidth}
      $height={height ? height : defaultHeight}
      variants={variants}
    >
      {children}
    </Container>
  );
}

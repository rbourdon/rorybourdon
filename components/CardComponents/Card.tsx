import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styled from "styled-components";

const Container = styled(motion.div)<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const defaultWidth = 200;
const defaultHeight = 200;

interface CardProps {
  width?: number;
  height?: number;
  children?: ReactNode;
  variants?: Variants;
  id?: string;
}

export default function Card({ width, height, children, variants }: CardProps) {
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

import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const stemV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.4,
      ease: "linear",
    },
  },
  selected: {
    pathLength: 0,
    transition: {
      duration: 0.25,
      ease: "linear",
    },
  },
};

export default function CardStem({
  width,
  height,
  stemLength,
  stemLoc,
  bRadius,
  sWidth,
}) {
  const stemStart = {
    x:
      stemLoc === 2 || stemLoc === 5
        ? (width - bRadius * 2 - sWidth / 2) * 0.665 + bRadius + sWidth / 2
        : stemLoc === 1 || stemLoc === 6
        ? (width - bRadius * 2 - sWidth / 2) * 0.335 + bRadius + sWidth / 2
        : stemLoc === 7 || stemLoc === 8
        ? 0
        : stemLength,
    y:
      stemLoc === 3 || stemLoc === 8
        ? (height - bRadius * 2 - sWidth / 2) * 0.335 + bRadius + sWidth / 2
        : stemLoc === 4 || stemLoc === 7
        ? (height - bRadius * 2 - sWidth / 2) * 0.665 + bRadius + sWidth / 2
        : stemLoc === 1 || stemLoc === 2
        ? 0
        : stemLength,
  };
  const theme = useContext(ThemeContext);
  return (
    <Container $width={width + "px"} $height={height + "px"}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <motion.line
          //Draw with stem, based on passed in location
          custom={stemLength}
          x1={stemStart.x}
          y1={stemStart.y}
          x2={
            stemLoc === 3 || stemLoc === 4
              ? -stemLength
              : stemLoc === 7 || stemLoc === 8
              ? stemLength
              : stemStart.x
          }
          y2={
            stemLoc === 1 || stemLoc === 2
              ? stemLength
              : stemLoc === 5 || stemLoc === 6
              ? 0
              : stemStart.y
          }
          stroke={theme.primary_mediumdark}
          strokeWidth={sWidth}
          variants={stemV}
          fill="none"
        />
      </motion.svg>
    </Container>
  );
}

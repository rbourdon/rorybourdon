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

export default function CardStem({
  width,
  height,
  stroke,
  stemDir,
  stemLength,
  stemLoc,
  bRadius,
  sWidth,
  variants,
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
        : height,
    // stemDir === "h"
    //   ? stemLoc == 2
    //     ? height * 0.665
    //     : (height - bRadius * 2 - sWidth / 2) * 0.335 + bRadius + sWidth / 2
    //   : 0,
  };
  const theme = useContext(ThemeContext);
  return (
    <Container $width={width + "px"} $height={height + "px"}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <motion.path
          //Draw with stem, based on passed in location
          d={`M${stemStart.x},${stemStart.y} ${stemDir}${
            stemLoc === 3 || stemLoc === 4 || stemLoc === 5 || stemLoc === 6
              ? -stemLength
              : stemLength
          }`}
          stroke={stroke}
          strokeWidth={sWidth}
          style={{ zIndex: 3, stroke: theme.primary_dark }}
          variants={variants}
        />
      </motion.svg>
    </Container>
  );
}

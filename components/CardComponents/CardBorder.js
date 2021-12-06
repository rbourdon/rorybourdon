import { motion } from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
`;

function getPath(startLoc, height, width, bRadius, sWidth, offset) {
  const arc = bRadius - offset * -0.335;
  const smallVMove = Math.max(0, (height + offset - arc * 2 - sWidth) * 0.335);
  const largeVMove = Math.max(0, (height + offset - arc * 2 - sWidth) * 0.665);
  const fullVMove = Math.max(0, height + offset - arc * 2 - sWidth);
  const smallHMove = Math.max(0, (width + offset - arc * 2 - sWidth) * 0.335);
  const largeHMove = Math.max(0, (width + offset - arc * 2 - sWidth) * 0.665);
  const fullHMove = Math.max(0, width + offset - arc * 2 - sWidth);

  switch (startLoc) {
    case 1:
      return `M${
        (width + offset - arc * 2 - sWidth) * 0.335 +
        arc +
        sWidth / 2 -
        offset * 0.5
      },${offset * -0.5 + sWidth / 2} 
      h${largeHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove}
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc}
      z`;
    case 2:
      return `M${
        (width + offset - arc * 2 - sWidth) * 0.665 +
        arc +
        sWidth / 2 -
        offset * 0.5
      },${offset * -0.5 + sWidth / 2} 
      h${smallHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove}
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc}
      z`;
    case 3:
      return `M${width + offset * 0.5 - sWidth / 2},${
        (height + offset - arc * 2 - sWidth) * 0.335 +
        arc +
        sWidth / 2 -
        offset * 0.5
      } 
      v${largeVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc}  
      z`;
    case 4:
      return `M${width + offset * 0.5 - sWidth / 2},${
        (height + offset - arc * 2 - sWidth) * 0.665 +
        arc +
        sWidth / 2 -
        offset * 0.5
      } 
      v${smallVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      z`;
    case 5:
      return `M${
        (width + offset - arc * 2 - sWidth) * 0.665 +
        arc +
        sWidth / 2 -
        offset * 0.5
      },${height + offset * 0.5 - sWidth / 2} 
      h-${largeHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove}
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc}
      z`;
    case 6:
      return `M${
        (width + offset - arc * 2 - sWidth) * 0.335 +
        arc +
        sWidth / 2 -
        offset * 0.5
      },${height + offset * 0.5 - sWidth / 2} 
      h-${smallHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      v-${fullVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove}
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc}
      z`;
    case 7:
      return `M${sWidth / 2 - offset * 0.5},${
        (height + offset - arc * 2 - sWidth) * 0.665 +
        arc +
        sWidth / 2 -
        offset * 0.5
      } 
      v-${largeVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc}
      z`;
    case 8:
      return `M${sWidth / 2 - offset * 0.5},${
        (height + offset - arc * 2 - sWidth / 2) * 0.335 +
        arc +
        sWidth / 2 -
        offset * 0.5
      } 
      v-${smallVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      z`;
    default:
      return `M${sWidth / 4 - offset * 0.5},${
        (height + offset - arc * 2 - sWidth / 2) * 0.335 +
        arc +
        sWidth / 2 -
        offset * 0.5
      } 
      v-${smallVMove} 
      a${arc},${arc} 0 0 1 ${arc},-${arc} 
      h${fullHMove} 
      a${arc},${arc} 0 0 1 ${arc},${arc} 
      v${fullVMove} 
      a${arc},${arc} 0 0 1 -${arc},${arc} 
      h-${fullHMove} 
      a${arc},${arc} 0 0 1 -${arc},-${arc} 
      z`;
  }
}

export default function CardBorder({
  bRadius,
  sWidth,
  width,
  height,
  borderV,
  startLoc,
  frameV,
  innerBorderV,
  color1,
  innerOffset,
}) {
  const startLocation = startLoc ? startLoc : 8;
  const innerOff = innerOffset ? innerOffset : -10;
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        variants={frameV}
      >
        <motion.path
          d={getPath(startLocation, height, width, bRadius, sWidth, 0)}
          strokeWidth={sWidth}
          fill="none"
          stroke={theme.primary_mediumdark}
          variants={borderV}
        />
        <motion.path
          d={getPath(startLocation, height, width, bRadius, sWidth, innerOff)}
          strokeWidth={sWidth * 0.6}
          fill="none"
          stroke={color1}
          variants={innerBorderV}
        />
      </motion.svg>
    </Container>
  );
}

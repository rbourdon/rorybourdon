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
  z-index: 3;
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
  color2,
  innerOffset,
  id,
}) {
  const startLocation = startLoc ? startLoc : 8;
  const innerOff = innerOffset ? innerOffset : -10;
  const theme = useContext(ThemeContext);
  return (
    <Container layoutId={`${id}cardBorder`}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        variants={frameV}
      >
        <defs>
          <linearGradient
            id={id ? id + "_border" : "borderGradient"}
            gradientUnits="userSpaceOnUse"
            gradientTransform={`rotate(${-45 + (height - width) * 0.075}, ${
              width * 0.5
            }, ${height * 0.5})`}
          >
            <stop offset=".25" stopColor={color1} />
            <stop offset=".75" stopColor={color2} />
          </linearGradient>
        </defs>
        <motion.path
          d={getPath(startLocation, height, width, bRadius, sWidth, 0)}
          strokeWidth={sWidth}
          vector-effect="non-scaling-stroke"
          fill="none"
          style={{ zIndex: 3, stroke: theme.primary_dark }}
          variants={borderV}
        />
        <motion.path
          d={getPath(startLocation, height, width, bRadius, sWidth, innerOff)}
          stroke={`url(#${id ? id + "_border" : "borderGradient"})`}
          strokeWidth={sWidth}
          vector-effect="non-scaling-stroke"
          fill="none"
          style={{ zIndex: 3 }}
          variants={innerBorderV}
        />
      </motion.svg>
    </Container>
  );
}

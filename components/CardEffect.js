import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  overflow: hidden;
  top: ${(props) => props.$yOffset + "px"};
  left: ${(props) => props.$xOffset + "px"};
  z-index: 0;
`;

export default function CardEffect({
  sWidth,
  width,
  height,
  circleV,
  lineV,
  radius,
  color1,
  color2,
  xOff,
  yOff,
  id,
}) {
  const circleRad = radius ? radius : 150;
  const lineLoc = {
    x: circleRad * 1.5,
    y: circleRad * 1.5,
  };
  return (
    <Container
      $width={circleRad * 3 + sWidth * 2}
      $height={circleRad * 3 + sWidth * 2}
      $xOffset={width / 2 - (circleRad * 3 + sWidth * 2) / 2 + xOff}
      $yOffset={height / 2 - (circleRad * 3 + sWidth * 2) / 2 + yOff}
      layoutId={`${id}`}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${circleRad * 3 + sWidth * 2} ${
          circleRad * 3 + sWidth * 2
        }`}
      >
        <defs>
          <linearGradient
            id={id ? id + "_effect" : "cardEffectGradient"}
            gradientUnits="userSpaceOnUse"
            gradientTransform={`rotate(-45, ${width / 2}, ${height / 2})`}
            x1={"-50%"}
          >
            <stop offset="0" stopColor={color1} />
            <stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
        <motion.g>
          <motion.path
            d={`M${circleRad * 0.5},${
              circleRad * 1.5 + sWidth
            } a${circleRad},${circleRad} 0 0 1 ${circleRad},-${circleRad} a${circleRad},${circleRad} 0 0 1 ${circleRad},${circleRad} a${circleRad},${circleRad} 0 0 1 -${circleRad},${circleRad} a${circleRad},${circleRad} 0 0 1 -${circleRad},-${circleRad}`}
            stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
            strokeWidth={sWidth}
            fill="none"
            variants={circleV}
          />
          <motion.path
            d={`M${lineLoc.x},${lineLoc.y} l${circleRad},-${circleRad}`}
            stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
            strokeWidth={sWidth}
            fill="none"
            custom={{ x: 40, y: -40 }}
            variants={lineV}
          />
          <motion.path
            d={`M${lineLoc.x},${lineLoc.y - 40} l${circleRad},-${circleRad}`}
            stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
            strokeWidth={sWidth}
            fill="none"
            custom={{ x: 30, y: -30 }}
            variants={lineV}
          />
          <motion.path
            d={`M${lineLoc.x},${lineLoc.y + 40} l${circleRad},-${circleRad}`}
            stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
            strokeWidth={sWidth}
            fill="none"
            custom={{ x: 20, y: -20 }}
            variants={lineV}
          />
        </motion.g>
      </motion.svg>
    </Container>
  );
}

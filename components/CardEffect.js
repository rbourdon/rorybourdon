import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: ${(props) => props.$cWidth + "px"};
  height: ${(props) => props.$cHeight + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -${(props) => (props.$cHeight - props.$height) / 2 + "px"};
  left: -${(props) => (props.$cWidth - props.$width) / 2 + "px"};
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
  x,
  y,
  id,
}) {
  const circleRad = radius ? radius : 150;
  const lineLoc = {
    x: width * (x ? x : 0.5) + circleRad,
    y: height * (y ? y : 0.5) + circleRad / 2,
  };
  return (
    <Container
      $width={width}
      $height={height}
      $cWidth={circleRad * 2 + sWidth * 2 + width * (x ? x : 0.5)}
      $cHeight={circleRad * 2 + sWidth * 2 + height * (y ? y : 0.5)}
      $rad={circleRad}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${circleRad * 2 + sWidth * 2 + width * (x ? x : 0.5)} ${
          circleRad * 2 + sWidth * 2 + height * (y ? y : 0.5)
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
        <motion.path
          d={`M${width * (x ? x : 0.5)},${
            circleRad / 2 + sWidth * 2 + height * (y ? y : 0.5)
          } a${circleRad},${circleRad} 0 0 1 ${circleRad},-${circleRad} a${circleRad},${circleRad} 0 0 1 ${circleRad},${circleRad} a${circleRad},${circleRad} 0 0 1 -${circleRad},${circleRad} a${circleRad},${circleRad} 0 0 1 -${circleRad},-${circleRad}`}
          stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
          strokeWidth={sWidth}
          fill="none"
          variants={circleV}
        />
        <motion.path
          d={`M${lineLoc.x},${lineLoc.y} l${circleRad * 1.5},-${
            circleRad * 1.5
          }`}
          stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
          strokeWidth={sWidth}
          fill="none"
          variants={lineV}
        />
        <motion.path
          d={`M${lineLoc.x - 20},${lineLoc.y + 60} l${circleRad * 1.5},-${
            circleRad * 1.5
          }`}
          stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
          strokeWidth={sWidth}
          fill="none"
          variants={lineV}
        />
        <motion.path
          d={`M${lineLoc.x - 60},${lineLoc.y + 20} l${circleRad},-${circleRad}`}
          stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
          strokeWidth={sWidth}
          fill="none"
          variants={lineV}
        />
      </motion.svg>
    </Container>
  );
}

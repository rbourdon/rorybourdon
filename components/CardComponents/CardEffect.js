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
  radius = 150,
  color1,
  color2,
  xOff,
  yOff,
  id,
  gradientRotation = -45,
  effectRotation = 0,
}) {
  const lineLoc = {
    x: radius * 1.5,
    y: radius * 1.5,
  };
  return (
    <Container
      $width={radius * 3 + sWidth * 2}
      $height={radius * 3 + sWidth * 2}
      $xOffset={width / 2 - (radius * 3 + sWidth * 2) / 2 + xOff}
      $yOffset={height / 2 - (radius * 3 + sWidth * 2) / 2 + yOff}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${radius * 3 + sWidth * 2} ${radius * 3 + sWidth * 2}`}
      >
        <defs>
          <linearGradient
            id={id ? id + "_effect" : "cardEffectGradient"}
            gradientUnits="userSpaceOnUse"
            gradientTransform={`rotate(${gradientRotation}, ${width / 2}, ${
              height / 2
            })`}
            x1={"-50%"}
          >
            <motion.stop offset="0" stopColor={color1} />
            <motion.stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
        <motion.g>
          <motion.path
            d={`M${radius * 0.5},${
              radius * 1.5 + sWidth
            } a${radius},${radius} 0 0 1 ${radius},-${radius} a${radius},${radius} 0 0 1 ${radius},${radius} a${radius},${radius} 0 0 1 -${radius},${radius} a${radius},${radius} 0 0 1 -${radius},-${radius}`}
            stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
            strokeWidth={sWidth}
            fill="none"
            variants={circleV}
          />
          <motion.g
            variants={{
              visible: {
                originX: 0,
                originY: 1,
                rotate: effectRotation,
                transition: { duration: 0.9 },
              },
            }}
          >
            <motion.path
              d={`M${lineLoc.x},${lineLoc.y} l${radius},-${radius}`}
              stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
              strokeWidth={sWidth}
              fill="none"
              custom={{ x: 40, y: -40 }}
              variants={lineV}
            />
            <motion.path
              d={`M${lineLoc.x},${lineLoc.y - 40} l${radius},-${radius}`}
              stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
              strokeWidth={sWidth}
              fill="none"
              custom={{ x: 30, y: -30 }}
              variants={lineV}
            />
            <motion.path
              d={`M${lineLoc.x},${lineLoc.y + 40} l${radius},-${radius}`}
              stroke={`url(#${id ? id + "_effect" : "cardEffectGradient"})`}
              strokeWidth={sWidth}
              fill="none"
              custom={{ x: 20, y: -20 }}
              variants={lineV}
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </Container>
  );
}

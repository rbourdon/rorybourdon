import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const gradientBandV = {
  hidden: (custom) => ({
    clipPath: custom.start,
    transition: {
      type: "spring",
      duration: 2.25,
      bounce: 0.4,
    },
  }),
  visible: (custom) => ({
    clipPath: custom.end,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.3,
    },
  }),
  selected: (custom) => ({
    clipPath: custom.start,
    transition: {
      type: "spring",
      duration: 2.25,
      bounce: 0.4,
    },
  }),
};

const BAND_THICKNESS = 30;
const FIRST_BAND_DIST = 50;
const BAND_POINT = BAND_THICKNESS + FIRST_BAND_DIST;

export default function CardFace({
  width,
  height,
  bRadius,
  sWidth,
  faceV,
  color1,
  bands = [6, 2, 4],
}) {
  const bandPaths = bands.map((band) => {
    switch (band) {
      case 1:
        return {
          start: `polygon(-${FIRST_BAND_DIST} 0, 0 -${FIRST_BAND_DIST}, ${BAND_THICKNESS} -${FIRST_BAND_DIST}, -${FIRST_BAND_DIST} ${BAND_THICKNESS})`, //"path('M-75,-25 l50,-50 h20 l-70,70 z')",
          end: `polygon(0 ${FIRST_BAND_DIST}, ${FIRST_BAND_DIST} 0, ${BAND_POINT} 0, 0 ${BAND_POINT})`, //"path('M0,50 l50,-50 h20 l-70,70 z')",
        };
      case 2:
        return {
          start: `path('M${width},-70 h20 l50,50 v20 z')`,
          end: `path('M${width - 70},0 h20 l50,50 v20 z')`,
        };
      case 3:
        return {
          start: `path('M${width + 35},${height + 105} l70,-70 v20 l-50,50 z')`,
          end: `path('M${width - 70},${height} l70,-70 v20 l-50,50 z')`,
        };
      case 4:
        return {
          start: `path('M-135,${height + 135} l70,70 h-20 l-50,-50 z')`,
          end: `path('M0,${height - 70} l70,70 h-20 l-50,-50 z')`,
        };
      case 5:
        return {
          start: "path('M-135,-45 l90,-90 h20 l-110,110 z')",
          end: "path('M0,90 l90,-90 h20 l-110,110 z')",
        };
      case 6:
        return {
          start: `path('M${width + 55},-165 h20 l110,110 v20 z')`,
          end: `path('M${width - 110},0 h20 l110,110 v20 z')`,
        };
      case 7:
        return {
          start: `path('M${width + 55},${
            height + 165
          } l110,-110 v20 l-90,90 z')`,
          end: `path('M${width - 110},${height} l110,-110 v20 l-90,90 z')`,
        };
      case 8:
        return {
          start: `path('M-165,${height + 55} l110,110 h-20 l-90,-90 z')`,
          end: `path('M0,${height - 110} l110,110 h-20 l-90,-90 z')`,
        };
      default:
        break;
    }
  });
  return (
    <Container
      variants={faceV}
      style={{
        borderRadius: bRadius,
      }}
      $width={width}
      $height={height}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {bandPaths.map((band) => {
          return (
            <motion.rect
              key={band.end}
              x={sWidth / 2 + "px"}
              y={sWidth / 2 + "px"}
              width={width - sWidth * 1.5 + "px"}
              height={height - sWidth * 1.5 + "px"}
              stroke="none"
              style={{
                fill: color1,
              }}
              custom={band}
              variants={gradientBandV}
            />
          );
        })}
      </motion.svg>
    </Container>
  );
}

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
  z-index: 1;
  top: 0;
  left: 0;
`;

const gradientBandV = {
  hidden: (custom) => ({
    clipPath: custom.start,
    transition: {
      type: "spring",
      duration: 0.7,
      bounce: 0.4,
    },
  }),
  visible: (custom) => ({
    clipPath: custom.end,
    transition: {
      type: "spring",
      duration: 0.7,
      bounce: 0.4,
    },
  }),
  selected: (custom) => ({
    clipPath: custom.end,
    transition: {
      type: "spring",
      duration: 0.7,
      bounce: 0.4,
    },
  }),
};

// const djsha = [
//   {
//     start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
//     end: "path('M0,90 l90,-90 h20 l-110,110 v-20 z')",
//   },
//   {
//     start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
//     end: "path('M0,50 l50,-50 h20 l-70,70 v-20 z')",
//   },
//   {
//     start: `path('M${width},${height} l0,0 h0 l0,0 v0 z')`,
//     end: `path('M${width - 70},${height} l70,-70 v20 l-50,50 h-20 z')`,
//   },
// ];

export default function CardFace({
  width,
  height,
  bRadius,
  sWidth,
  faceV,
  color1,
  color2,
  bands = [6, 2, 4],
  id,
  gradientRotation = -45,
}) {
  const bandPaths = bands.map((band) => {
    switch (band) {
      case 1:
        return {
          start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
          end: "path('M0,50 l50,-50 h20 l-70,70 z')",
        };
      case 2:
        return {
          start: `path('M${width},0 l0,0 h0 l0,0 v0 z')`,
          end: `path('M${width - 70},0 h20 l50,50 v20 z')`,
        };
      case 3:
        return {
          start: `path('M${width},${height} l0,0 h0 l0,0 v0 z')`,
          end: `path('M${width - 70},${height} l70,-70 v20 l-50,50 z')`,
        };
      case 4:
        return {
          start: `path('M0,0 l0,0 h0 l0,0 v0 z')`,
          end: `path('M0,${height - 70} l70,70 h-20 l-50,-50 z')`,
        };
      case 5:
        return {
          start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
          end: "path('M0,90 l90,-90 h20 l-110,110 z')",
        };
      case 6:
        return {
          start: `path('M${width},0 l0,0 h0 l0,0 v0 z')`,
          end: `path('M${width - 110},0 h20 l110,110 v20 z')`,
        };
      case 7:
        return {
          start: `path('M${width},${height} l0,0 h0 l0,0 v0 z')`,
          end: `path('M${width - 110},${height} l110,-110 v20 l-90,90 z')`,
        };
      case 8:
        return {
          start: `path('M0,0 l0,0 h0 l0,0 v0 z')`,
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
      layoutId={`${id}CardFace`}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient
            id={id ? id + "_face" : "linear"}
            gradientUnits="userSpaceOnUse"
            gradientTransform={`rotate(${
              gradientRotation + (height - width) * 0.055
            }, ${width * 0.5}, ${height * 0.5})`}
          >
            <motion.stop offset=".2" stopColor={color1} />
            <motion.stop offset=".8" stopColor={color2} />
          </linearGradient>
        </defs>
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
                fill: `url(#${id ? id + "_face" : "linear"})`,
              }}
              custom={band}
              variants={gradientBandV}
            />
          );
        })}
        {/* <motion.rect
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth * 1.5 + "px"}
          height={height - sWidth * 1.5 + "px"}
          stroke="none"
          style={{
            fill: `url(#${id ? id + "_face" : "linear"})`,
          }}
          custom={{
            start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
            end: "path('M0,90 l90,-90 h20 l-110,110 v-20 z')",
          }}
          variants={gradientBandV}
        />
        <motion.rect
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth + "px"}
          height={height - sWidth + "px"}
          stroke="none"
          style={{
            fill: `url(#${id ? id + "_face" : "linear"})`,
          }}
          custom={{
            start: "path('M0,0 l0,0 h0 l0,0 v0 z')",
            end: "path('M0,50 l50,-50 h20 l-70,70 v-20 z')",
          }}
          variants={gradientBandV}
        />
        <motion.rect
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth + "px"}
          height={height - sWidth + "px"}
          stroke="none"
          style={{
            fill: `url(#${id ? id + "_face" : "linear"})`,
          }}
          custom={{
            start: `path('M${width},${height} l0,0 h0 l0,0 v0 z')`,
            end: `path('M${width - 70},${height} l70,-70 v20 l-50,50 h-20 z')`,
          }}
          variants={gradientBandV}
        /> */}
      </motion.svg>
    </Container>
  );
}

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
  z-index: 3;
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
};

export default function CardFace({
  width,
  height,
  bRadius,
  sWidth,
  faceV,
  color1,
  color2,
  id,
}) {
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
            gradientTransform={`rotate(${-45 + (height - width) * 0.075}, ${
              width * 0.5
            }, ${height * 0.5})`}
          >
            <stop offset=".2" stopColor={color1} />
            <stop offset=".8" stopColor={color2} />
          </linearGradient>
        </defs>
        <motion.rect
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
        />
        {/* <motion.path
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth + "px"}
          height={height - sWidth + "px"}
          stroke="#FFFFFF"
          strokeWidth={90}
          style={{
            opacity: 0.255,
            mixBlendMode: "hard-light",

            zIndex: 10,
          }}
          custom={{
            start: `M-0,0 L0,0`,
            middle: `M-${width},${height * 2} L${width * 2},-${height}`,
            end: `M-${width},${height * 2} L${width * 2},-${height}`,
            //end: `M${width},${height} L${width},${height}`,
          }}
          variants={shineBandV}
        /> */}
      </motion.svg>
    </Container>
  );
}

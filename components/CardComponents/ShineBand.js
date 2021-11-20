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
  z-index: 5;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const shineBandV = {
  hidden: (custom) => ({
    d: custom.start,
  }),
  visible: (custom) => ({
    d: [custom.start, custom.middle, custom.end],
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 5,
    },
  }),
};

export default function ShineBand({ width, height, bRadius, sWidth, shineV }) {
  return (
    <Container
      variants={shineV}
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
        <motion.path
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth + "px"}
          height={height - sWidth + "px"}
          stroke="#FFFFFF"
          strokeWidth={90}
          style={{
            opacity: 0.075,
            mixBlendMode: "hard-light",
          }}
          custom={{
            start: `M-0,0 L0,0`,
            middle: `M-${width},${height * 2} L${width * 2},-${height}`,
            end: `M${width},${height} L${width},${height}`,
          }}
          variants={shineBandV}
        />
      </motion.svg>
    </Container>
  );
}

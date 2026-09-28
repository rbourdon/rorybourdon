import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  overflow: hidden;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Band = styled(motion.div)<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

interface ShineSize {
  width: number;
  height: number;
}

const shineV: Variants = {
  hidden: (custom: ShineSize) => ({
    transition: {
      delayChildren: custom.width * custom.height * 0.0000012 - 0.75,
    },
  }),
  visible: (custom: ShineSize) => ({
    transition: {
      delayChildren: custom.width * custom.height * 0.0000012 - 0.75,
    },
  }),
  selected: (custom: ShineSize) => ({
    transition: {
      delayChildren: custom.width * custom.height * 0.0000012 - 0.75,
    },
  }),
};

const bandV: Variants = {
  hidden: (custom: ShineSize) => ({
    x: -custom.width,
  }),
  visible: (custom: ShineSize) => ({
    x: [-custom.width, custom.width * 2],
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 5,
    },
  }),
  selected: (custom: ShineSize) => ({
    x: custom.width * 2,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 5,
    },
  }),
};

interface ShineBandProps {
  width: number;
  height: number;
  bRadius: number;
  sWidth?: number;
  id?: string;
}

export default function ShineBand({ width, height, bRadius }: ShineBandProps) {
  return (
    <Container
      variants={shineV}
      style={{
        borderRadius: bRadius,
      }}
      custom={{ width: width, height: height }}
      $width={width}
      $height={height}
    >
      <Band
        variants={bandV}
        style={{ opacity: 0.08 }}
        custom={{ width: width, height: height }}
        $width={width}
        $height={height}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width} ${height}`}
        >
          <path
            stroke="#FFFFFF"
            strokeWidth={90}
            d={`M-${width},${height * 2} L${width * 2},-${height}`}
          />
        </svg>
      </Band>
    </Container>
  );
}

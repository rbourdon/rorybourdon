import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  width: max-content;
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: ${(props) => props.$zIndex};
  margin: ${(props) => props.$margin};
`;

const trunkV = {
  hidden: {
    scale: 0,
    originY: 1,
  },
  visible: (custom) => ({
    scale: 1,
    originY: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 1.2,
      damping: 11,
      restDelta: 0.01,
      restSpeed: 0.01,
      delay: custom,
    },
  }),
  selected: {
    scale: 1,
    originY: 1,
  },
};

const foliageV = {
  hidden: {
    scale: 0,
  },
  visible: (custom) => ({
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 1.2,
      damping: 11,
      restDelta: 0.01,
      restSpeed: 0.01,
      delay: custom,
    },
  }),
  selected: {
    scale: 1,
  },
};

export default function TreeIcon({
  iconV,
  delay = 0,
  layoutId = "treeIcon",
  colors = { trunk: "#494949", foliage: "#45b6bf" },
  margin = "0",
  zIndex = 1,
  scale = 1,
  width = "181px",
  height = "310px",
  transition = { type: "spring", stiffness: 40, mass: 2, damping: 12 },
}) {
  return (
    <Container
      variants={iconV}
      custom={scale}
      layoutId={layoutId}
      transition={transition}
      $margin={margin}
      $zIndex={zIndex}
      $width={width}
      $height={height}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-15 -30 125 192"
        height="100%"
        width="100%"
      >
        <motion.path
          variants={foliageV}
          custom={delay + 0.4}
          d="M95 81.3c0 35.8-21.2 48.3-47.5 48.3S0 117.1 0 81.3 47.5 0 47.5 0s47.6 45.5 47.6 81.3Z"
          fill={colors.foliage}
        />
        <motion.path
          variants={trunkV}
          custom={delay}
          fill={colors.trunk}
          d="m45.8 124.2.5-30 20.3-37.1-20.2 32.4.2-13.5 14-26.8-14 23.3.4-24.3 15-21.3-14.9 17.5.2-44.4-1.5 58.8.1-2.4-15.2-23.3 15 27.9-1.4 27.1-.1-.7-17.5-24.5 17.5 27-.2 3.4v.3l-3.6 68.7h4.8l.6-35.5 17.4-26.9-17.4 24.3z"
        />
      </svg>
    </Container>
  );
}

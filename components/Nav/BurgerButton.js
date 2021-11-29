import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Burger = styled(motion.button)`
  border: none;
  background: none;
  height: 8vw;
  width: 8vw;
  max-height: 100%;
  z-index: 9999;
  position: relative;
`;

const lineV = {
  hidden: {
    pathLength: 0,
    transition: { type: "spring", duration: 0.1 },
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    rotate: 0,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      duration: 1.1,
      opacity: { delay: 0.175, duration: 0.2 },
    },
  },
  open: (custom) => ({
    rotate: custom,
    opacity: custom !== 0 ? 1 : 0,
    x: custom === 45 ? -1.5 : -1.5,
    y: custom === 45 ? -2 : 2,
    originX: 0.8,
    originY: 0.8,
    pathLength: 1,
    transition: { type: "spring", duration: 0.1, opacity: { duration: 0.1 } },
  }),
};

const iconV = {
  hidden: {
    rotate: 180,
    originX: 0.5,
    originY: 0.5,
    transition: { type: "spring", duration: 0.1 },
  },
  visible: {
    rotate: 0,
    originX: 0.5,
    originY: 0.5,
    transition: { type: "spring", duration: 1.1 },
  },
  open: {
    rotate: 90,
    originX: 0.5,
    originY: 0.5,
    transition: { type: "spring", duration: 1.1 },
  },
};

function BurgerButton({ open = false, onClick }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, theme.primary_slightlydark, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const handleHoverEnd = () => {
    animate(hover, 0, {
      duration: 0.4,
    });
  };

  const handleHoverStart = () => {
    animate(hover, 1, {
      duration: 0.4,
    });
    console.log("hover");
  };

  return (
    <Burger
      onClick={onClick}
      variants={iconV}
      animate={open ? "open" : "visible"}
      onHoverEnd={handleHoverEnd}
      onHoverStart={handleHoverStart}
    >
      <motion.svg
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        role="img"
        viewBox="-2 -2 28 28"
      >
        <title>Hamburger Menu</title>
        <motion.line
          variants={lineV}
          custom={0}
          x1="3"
          y1="12"
          x2="21"
          y2="12"
        />
        <motion.line
          variants={lineV}
          custom={-45}
          x1="3"
          y1="6"
          x2="21"
          y2="6"
        />
        <motion.line
          variants={lineV}
          custom={45}
          x1="3"
          y1="18"
          x2="21"
          y2="18"
        />
      </motion.svg>
    </Burger>
  );
}

export default BurgerButton;

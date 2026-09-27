import {
  animate,
  type MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";

import styled, { useTheme } from "styled-components";

const Burger = styled(motion.button)`
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  z-index: 9999;
  position: relative;
`;

const lineV: Variants = {
  hidden: {
    pathLength: 0,
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
      opacity: { type: "tween", delay: 0.175, duration: 0.2 },
    },
  },
  open: (custom: number) => ({
    rotate: custom,
    opacity: custom !== 0 ? 1 : 0,
    x: custom === 45 ? -4 : -4,
    y: custom === 45 ? 2 : 6,
    originX: 0.8,
    originY: 0.8,
    pathLength: 1,
    transition: {
      type: "spring",
      duration: 1.1,
      opacity: { type: "tween", duration: 0.2 },
    },
  }),
};

const iconV: Variants = {
  hidden: {
    rotate: 180,
    originX: 0.5,
    originY: 0.5,
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

interface BurgerButtonProps {
  open?: boolean;
  onClick: () => void;
}

function BurgerButton({ open = false, onClick }: BurgerButtonProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, theme.primary_slightlydark, hover] as MotionValue<
      string | number
    >[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
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

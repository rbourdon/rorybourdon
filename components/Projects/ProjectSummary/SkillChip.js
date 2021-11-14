import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext } from "react";

const Chip = styled(motion.div)`
  height: 20px;
  width: max-content;
  padding: 0 8px;
  font-weight: 200;
  font-size: 0.75rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  margin-bottom: 5px;
  user-select: none;
  cursor: pointer;
`;

const variants = {
  hidden: (custom) => ({
    x: custom.x,
    opacity: 0,
  }),
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: custom.delay,
      duration: 0.9,
    },
  }),
};

export default function SkillChip({
  children,
  layoutId = "skillChip",
  bgColor,
  textColor,
  outline,
  custom,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const backgroundColor = useTransform(
    [bgColor, theme.primary, textColor, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 1], [latestColor2, latestColor3]),
        ]
      )
  );

  const color = useTransform(
    [textColor, theme.primary_verydark, bgColor, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 1], [latestColor2, latestColor3]),
        ]
      )
  );

  const handleHover = (to) => {
    animate(hover, to, {
      type: "tween",
      ease: "easeInOut",
    });
  };

  return (
    <Chip
      key={layoutId}
      variants={variants}
      layoutId={layoutId}
      onHoverStart={() => handleHover(1)}
      onHoverEnd={() => handleHover(0)}
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: outline,
        backgroundColor,
        color,
      }}
      transition={{
        type: "spring",
        stiffness: 50,
        mass: 0.25,
        damping: 7,
      }}
      custom={custom}
    >
      {children}
    </Chip>
  );
}

SkillChip.defaultProps = {
  transition: { type: "spring", stiffness: 30 },
};

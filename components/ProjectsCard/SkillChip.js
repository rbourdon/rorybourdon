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
`;

const handleHover = (hover, to) => {
  animate(hover, to, { type: "tween", duration: 0.2 });
};

export default function SkillChip({
  title,
  variants,
  transition,
  layoutId = "skillChip",
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "1px solid  " + latestColor1
  );
  const backgroundColor = useTransform(
    [theme.primary_light, theme.teal, theme.green, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 3.5], [latestColor2, latestColor3]),
        ]
      )
  );

  return (
    <Chip
      key={title + "_chip"}
      variants={variants}
      layoutId={layoutId}
      transition={transition}
      onHoverStart={() => handleHover(hover, 1)}
      onHoverEnd={() => handleHover(hover, 0)}
      style={{ border, backgroundColor }}
    >
      {title}
    </Chip>
  );
}

SkillChip.defaultProps = {
  transition: { type: "spring", stiffness: 30 },
};

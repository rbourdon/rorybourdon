import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext } from "react";

const Bubble = styled(motion.div)`
  height: 36px;
  min-width: 75px;
  padding: 0 22px;
  font-weight: 300;
  font-size: 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const handleHover = (hover, to) => {
  animate(hover, to, { type: "tween", duration: 0.2 });
};

export default function SkillBubble({ title, bubbleV, transition }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const border = useTransform(
    theme.primary_dark,
    (latestColor1) => "1px solid  " + latestColor1
  );
  const backgroundColor = useTransform(
    [theme.primary_light, theme.blue, theme.teal, hover],
    ([latestColor1, latestColor2, latestColor3, latestHover]) =>
      transform(
        latestHover,
        [0, 1],
        [
          latestColor1,
          transform(latestHover, [0, 3], [latestColor2, latestColor3]),
        ]
      )
  );

  return (
    <Bubble
      key={title + "_bub"}
      variants={bubbleV}
      layoutId={`${title.substring(0, 3)}Bubble`}
      transition={transition}
      onHoverStart={() => handleHover(hover, 1)}
      onHoverEnd={() => handleHover(hover, 0)}
      style={{ border, backgroundColor }}
      initial="hidden"
      animate="visible"
    >
      {title}
    </Bubble>
  );
}

SkillBubble.defaultProps = {
  transition: { type: "spring", stiffness: 30 },
};

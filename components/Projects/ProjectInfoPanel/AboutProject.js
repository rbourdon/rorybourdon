import styled, { ThemeContext } from "styled-components";
import { animate, motion, useMotionValue } from "framer-motion";
import { useContext } from "react";

const Container = styled(motion.div)`
  width: 100%;
  height 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: max-content 1fr;
  row-gap: 8px;
  padding: 0 2.25vw;
`;

const Label = styled(motion.p)`
  font-size: clamp(0.85rem, 0.7vw, 1.3rem);
  line-height: clamp(0.85rem, 0.7vw, 1.3rem);
`;

const Text = styled(motion.p)`
  font-size: clamp(0.9rem, 0.9vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 1.2vw, 1.55rem);
`;

export default function AboutProject({ description = "" }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const handleHoverStart = () => {
    animate(hover, 1, { duration: 0.3 });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { duration: 0.3 });
  };

  return (
    <Container
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      <Label style={{ color: theme.primary_mediumdark }}>
        About the Project
      </Label>
      <Text style={{ color: theme.primary_dark }}>{description}</Text>
    </Container>
  );
}

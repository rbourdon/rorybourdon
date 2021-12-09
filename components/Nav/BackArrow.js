import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import ArrowIcon from "../Icons/ArrowIcon";
import { useRouter } from "next/router";
import { useContext } from "react";

const Container = styled(motion.button)`
  width: 12vw;
  max-width: ${(props) => props.$width + "px"};
  height: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  background: none;
  color: inherit;
  border: none;
  padding: 8px 8px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const Backdrop = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  border-radius: 5px;
`;

export default function BackArrow({ width = 70, id = "generic", variants }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const router = useRouter();

  const arrowColor = useTransform(
    [theme.primary_dark, theme.primary_mediumdark, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const scale = useTransform(hover, [0, 1], [1, 1.07]);
  const x = useTransform(hover, [0, 1], [0, -20]);

  const backdropWidth = useTransform(hover, [0, 1], ["0%", "100%"]);

  const handleHoverEnd = () => {
    animate(hover, 0, {
      duration: 0.3,
      type: "tween",
    });
  };

  const handleHoverStart = () => {
    animate(hover, 1, {
      duration: 0.3,
      type: "tween",
    });
  };

  return (
    <Container
      $width={width}
      onHoverStart={() => handleHoverStart(hover)}
      onHoverEnd={() => handleHoverEnd(hover)}
      onFocus={() => handleHoverStart(hover)}
      onBlur={() => handleHoverEnd(hover)}
      onClick={() => router.back()}
      style={{ rotate: -90, scale, x }}
      layoutId={`${id}_backArrow`}
      variants={variants}
    >
      <Backdrop
        style={{
          height: backdropWidth,
          originX: 0,
          originY: 0,
        }}
      />
      <ArrowIcon color={arrowColor} />
    </Container>
  );
}

import {
  animate,
  type MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/router";

import styled, { useTheme } from "styled-components";
import ArrowIcon from "../Icons/ArrowIcon";

const Container = styled(motion.button)<{ $width: number }>`
  width: 12vw;
  max-width: ${(props) => props.$width}px;
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

interface BackArrowProps {
  width?: number;
  id?: string;
  variants?: Variants;
}

export default function BackArrow({
  width = 70,
  id = "generic",
  variants,
}: BackArrowProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);
  const router = useRouter();

  const arrowColor = useTransform(
    [theme.primary_dark, theme.primary_mediumdark, hover] as MotionValue<
      string | number
    >[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
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
      onHoverStart={() => handleHoverStart()}
      onHoverEnd={() => handleHoverEnd()}
      onFocus={() => handleHoverStart()}
      onBlur={() => handleHoverEnd()}
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

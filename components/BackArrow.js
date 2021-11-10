import styled from "styled-components";
import { animate, motion, useMotionValue } from "framer-motion";
import ArrowIcon from "./Icons/ArrowIcon";
import { useRouter } from "next/router";

const Container = styled(motion.button)`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export default function BackArrow({
  width = 175,
  height = 50,
  id = "generic",
  variants,
}) {
  const hover = useMotionValue(0);
  const router = useRouter();
  const handleHoverEnd = () => {
    animate(hover, 0, {
      duration: 0.1,
      bounce: 0.5,
      type: "tween",
    });
  };

  const handleHoverStart = () => {
    animate(hover, 1, {
      duration: 0.1,
      bounce: 0.5,
      type: "tween",
    });
  };

  return (
    <Container
      $width={width}
      $height={height}
      onHoverStart={() => handleHoverStart(hover)}
      onHoverEnd={() => handleHoverEnd(hover)}
      onClick={() => router.back()}
      style={{ rotate: -90 }}
      layoutId={`${id}_backArrow`}
      variants={variants}
    >
      <ArrowIcon />
    </Container>
  );
}

import styled from "styled-components";
import { animate, motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import ArrowIcon from "./Icons/ArrowIcon";

const Container = styled(motion.a)`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
`;

export default function BackArrow({
  href,
  width = 175,
  height = 50,
  id,
  variants,
  onClick,
}) {
  const hover = useMotionValue(0);

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
    <Link href={href ? href : "/skills"} passHref scroll={false}>
      <Container
        $width={width}
        $height={height}
        onHoverStart={() => handleHoverStart(hover)}
        onHoverEnd={() => handleHoverEnd(hover)}
        onClick={onClick}
        style={{ rotate: -90 }}
        layoutId={`${id}Button`}
        variants={variants}
      >
        <ArrowIcon />
      </Container>
    </Link>
  );
}

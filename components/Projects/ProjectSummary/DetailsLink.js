import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext } from "react";
import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";

const Container = styled(motion.a)`
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;
  font-size: 0.85rem;
  font-weight: 300;
  user-select: none;
  padding: 8px 0 0 0;
  width: 160px;
  height: max-content;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: end;

  &:focus {
    outline: none;
  }
`;

const Arrow = styled(motion.div)`
  width: 28px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0 8px;
`;

export default function DetailsLink({ href, linkColor }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const scale = useTransform(hover, [0, 1], [1, 1.1]);
  const rotate = useTransform(hover, [0, 1], [90, 270]);

  const color = useTransform(
    [linkColor, theme.primary_light, theme.primary_verydark, hover],
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

  const detailsLinkV = {
    hidden: {
      opacity: 0,
      x: -130,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1.1,
        delayChildren: 0.1,
      },
    },
  };

  const arrowV = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
  };

  const handleHover = (to) => {
    animate(hover, to, {
      type: "tween",
      ease: "easeInOut",
    });
  };

  return (
    <Link href={href} passHref>
      <Container
        onHoverStart={() => handleHover(1)}
        onHoverEnd={() => handleHover(0)}
        onFocus={() => handleHover(1)}
        onBlur={() => handleHover(0)}
        variants={detailsLinkV}
        style={{ color, scale }}
      >
        View Details
        <Arrow style={{ rotate, scale }} variants={arrowV}>
          <ArrowIcon />
        </Arrow>
      </Container>
    </Link>
  );
}

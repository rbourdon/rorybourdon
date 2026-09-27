import type { MotionValue, Variants } from "framer-motion";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";

import styled, { useTheme } from "styled-components";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import MotionLink from "@/components/utils/MotionLink";

const Container = styled(MotionLink)`
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

interface DetailsLinkProps {
  href: string;
  linkColor: MotionValue<string>;
}

export default function DetailsLink({ href, linkColor }: DetailsLinkProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);

  const scale = useTransform(hover, [0, 1], [1, 1.1]);
  const rotate = useTransform(hover, [0, 1], [90, 270]);

  const color = useTransform(
    // Mixed string/number inputs; the tuple type below reads them back.
    [
      linkColor,
      theme.primary_light,
      theme.primary_verydark,
      hover,
    ] as MotionValue<string | number>[],
    ([latestColor1, latestColor2, latestColor3, latestHover]: (
      | string
      | number
    )[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [
          latestColor1 as string,
          transform(
            latestHover as number,
            [0, 1],
            [latestColor2 as string, latestColor3 as string],
          ),
        ],
      ),
  );

  const detailsLinkV: Variants = {
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

  const arrowV: Variants = {
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

  const handleHover = (to: number) => {
    animate(hover, to, {
      type: "tween",
      ease: "easeInOut",
    });
  };

  return (
    <Container
      href={href}
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
  );
}

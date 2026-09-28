import type { MotionValue, Variants } from "framer-motion";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

import styled, { useTheme } from "styled-components";
import { noSelect } from "@/components/utils/styles";

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
  ${noSelect}
  cursor: pointer;
`;

interface ChipCustom {
  x: number;
  delay: number;
}

const variants: Variants = {
  hidden: (custom: ChipCustom) => ({
    x: custom.x,
    opacity: 0,
  }),
  visible: (custom: ChipCustom) => ({
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: custom.delay,
      duration: 0.9,
    },
  }),
};

interface SkillChipProps {
  children?: ReactNode;
  layoutId?: string;
  bgColor: MotionValue<string>;
  textColor: MotionValue<string>;
  outline: MotionValue<string>;
  custom: ChipCustom;
}

export default function SkillChip({
  children,
  layoutId = "skillChip",
  bgColor,
  textColor,
  outline,
  custom,
}: SkillChipProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);

  const backgroundColor = useTransform(
    // Mixed string/number inputs; the tuple type below reads them back.
    [bgColor, theme.primary, textColor, hover] as MotionValue<
      string | number
    >[],
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

  const color = useTransform(
    // Mixed string/number inputs; the tuple type below reads them back.
    [textColor, theme.primary_verydark, bgColor, hover] as MotionValue<
      string | number
    >[],
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

  const handleHover = (to: number) => {
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

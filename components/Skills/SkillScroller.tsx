import {
  LayoutGroup,
  motion,
  type PanInfo,
  useMotionValue,
  type Variants,
} from "framer-motion";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import SkillBubble from "@/components/Skills/SkillBubble";
import type { SkillRef } from "@/lib/types";
import useWindowSize from "../utils/useWindowSize";

const SCROLL_MULTIPLIER = 35;
const LIST_BUFFER = 2;

const Bubbles = styled(motion.ul)`
  width: 275px;
  max-width: 100%;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-rows: repeat(auto-fit, 40px);
  grid-template-columns: 100%;
  row-gap: 15px;
  padding: 0;
  margin: 0;
  cursor: grab;
  grid-auto-rows: 40px;
  touch-action: none;

  @media (max-width: 555px) {
    row-gap: 10px;
  }
`;

const Arrow = styled(motion.button)`
  width: 13px;
  height: 13px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
`;

const bubbleV: Variants = {
  hidden: (custom: number) => ({
    x: 300,
    y: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.3 },
      type: "spring",
      stiffness: 150 + custom * 5,
      mass: 2,
      damping: 20,
    },
  }),
  visible: (custom: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0.3 },
      type: "spring",
      stiffness: 150 + custom * 5,
      mass: 2,
      damping: 20,
    },
  }),
};

interface SkillScrollerProps {
  skills: SkillRef[];
}

export default function SkillScroller({ skills }: SkillScrollerProps) {
  const size = useWindowSize();
  // Before mount these are undefined; the maths then yields false/NaN, as in the JS version.
  const width = size.width as number;
  const height = size.height as number;
  const numSkills =
    width > 555
      ? (height - 450) / 50 > skills.length - LIST_BUFFER
        ? skills.length - LIST_BUFFER
        : (height - 450) / 50
      : (height - 600) / 50 > skills.length - LIST_BUFFER
        ? skills.length - LIST_BUFFER
        : (height - 600) / 50 < 3
          ? 3
          : (height - 600) / 50;
  const theme = useTheme();
  const panPos = useMotionValue(0);
  const [panning, setPanning] = useState(false);
  const [rollerPos, setRollerPos] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | false>(false);

  const handleSkillSelect = (skill: string) => {
    !panning && setSelectedSkill(skill);
  };

  const handlePan = (e: PointerEvent, pointInfo: PanInfo) => {
    panPos.set(panPos.get() + pointInfo.delta.y);
    const notchesToMove = Math.round(panPos.get() / SCROLL_MULTIPLIER);
    if (Math.abs(panPos.get()) > SCROLL_MULTIPLIER) {
      setRollerPos((prev) =>
        prev - notchesToMove < 0
          ? skills.length - 1
          : prev - notchesToMove > skills.length - 1
            ? 0
            : prev - notchesToMove,
      );
      panPos.set(0);
    }
  };

  const handlePanEnd = () => {
    panPos.set(0);
    setTimeout(() => setPanning(false), 75);
  };

  const handleClick = (dir: number) => {
    setRollerPos((prev) =>
      prev + dir < 0
        ? skills.length - 1
        : prev + dir > skills.length - 1
          ? 0
          : prev + dir,
    );
  };
  return (
    <LayoutGroup>
      <Bubbles
        onPanStart={() => setPanning(true)}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <Arrow
          onClick={() => handleClick(1)}
          layout
          style={{ color: theme.primary_dark }}
        >
          <ArrowIcon />
        </Arrow>
        {[
          ...skills.slice(rollerPos, rollerPos + numSkills),
          ...skills.slice(
            0,
            numSkills - skills.slice(rollerPos, rollerPos + numSkills).length,
          ),
        ].map((skill, index) => {
          return (
            <SkillBubble
              title={skill.title}
              key={`${skill.slug}_scroller`}
              variants={bubbleV}
              custom={index}
              bgColor={theme.primary}
              id={skill.slug}
              hoverColor={{
                bg: theme.teal,
                text: theme.primary_dark,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                mass: 0.25,
                damping: 28,
              }}
              outlineTransition={{
                type: "spring",
                stiffness: 85,
                mass: 0.25,
                damping: 10,
              }}
              select={handleSkillSelect}
              selected={selectedSkill === skill.title}
              canHover={!panning}
            />
          );
        })}
        <Arrow
          layout
          style={{ rotate: 180, color: theme.primary_dark }}
          onClick={() => handleClick(-1)}
        >
          <ArrowIcon />
        </Arrow>
      </Bubbles>
    </LayoutGroup>
  );
}

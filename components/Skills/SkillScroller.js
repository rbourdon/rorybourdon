import styled, { ThemeContext } from "styled-components";
import { LayoutGroup, motion, useMotionValue } from "framer-motion";
import SkillBubble from "@/components/Skills/SkillBubble";
import { useContext, useState } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import useWindowSize from "../utils/useWindowSize";

const SCROLL_MULTIPLIER = 35;
const LIST_BUFFER = 2;

const Bubbles = styled(motion.ul)`
  width: 275px;
  max-width: 100%;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-rows: repeat(auto-fit, 37px);
  row-gap: 10px;
  padding: 0;
  margin: 0;
  cursor: grab;
  grid-auto-rows: 37px;
  z-index: 6;
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

const bubbleV = {
  hidden: (custom) => ({
    x: 300,
    y: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 150 + custom * 5,
      mass: 2,
      damping: 20,
    },
  }),
  visible: (custom) => ({
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

export default function SkillScroller({ skills }) {
  //const numSkills = useWindowSize().width <= 555 ? 4 : 11;
  const size = useWindowSize();
  const numSkills =
    size.width > 555
      ? (size.height - 450) / 50 > skills.length - LIST_BUFFER
        ? skills.length - LIST_BUFFER
        : (size.height - 450) / 50
      : (size.height - 600) / 50 > skills.length - LIST_BUFFER
      ? skills.length - LIST_BUFFER
      : (size.height - 600) / 50 < 2
      ? 2
      : (size.height - 600) / 50;
  const theme = useContext(ThemeContext);
  const panPos = useMotionValue(0);
  const [panning, setPanning] = useState(false);
  const [rollerPos, setRollerPos] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(false);

  const handleSkillHover = (skill) => {
    !panning && setHoveredSkill(skill);
  };

  const handlePan = (e, pointInfo) => {
    panPos.set(panPos.get() + pointInfo.delta.y);
    const notchesToMove = Math.round(panPos.get() / SCROLL_MULTIPLIER);
    if (Math.abs(panPos.get()) > SCROLL_MULTIPLIER) {
      setRollerPos((prev) =>
        prev - notchesToMove < 0
          ? skills.length - 1
          : prev - notchesToMove > skills.length - 1
          ? 0
          : prev - notchesToMove
      );
      panPos.set(0);
    }
  };

  const handlePanEnd = () => {
    panPos.set(0);
    setTimeout(() => setPanning(false), 150);
  };

  const handleClick = (dir) => {
    setRollerPos((prev) =>
      prev + dir < 0
        ? skills.length - 1
        : prev + dir > skills.length - 1
        ? 0
        : prev + dir
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
            numSkills - skills.slice(rollerPos, rollerPos + numSkills).length
          ),
        ].map((skill, index) => {
          return (
            <SkillBubble
              title={skill.title}
              key={skill.slug}
              variants={bubbleV}
              custom={index}
              bgColor={theme.primary}
              id={skill.slug}
              height={36}
              transition={{
                type: "spring",
                stiffness: 200,
                mass: 0.25,
                damping: 28,
              }}
              outlineTransition={{
                type: "spring",
                stiffness: 150,
                mass: 0.25,
                damping: 10,
              }}
              onHover={handleSkillHover}
              hasOutline={hoveredSkill === skill.title && !panning}
              active={!panning}
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
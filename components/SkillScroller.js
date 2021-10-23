import styled, { ThemeContext } from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useContext, useMemo, useState } from "react";
import useInterval from "@/components/utils/useInterval";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import useWindowSize from "./utils/useWindowSize";

const SCROLL_MULTIPLIER = 35;

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
`;

const Arrow = styled(motion.div)`
  width: 13px;
  height: 13px;
`;

const bubbleV = {
  hidden: (custom) => ({
    x: 300,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 80 + custom * 4,
      mass: 3,
      damping: 20,
    },
  }),
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0.3 },
      type: "spring",
      stiffness: 80 + custom * 4,
      mass: 3,
      damping: 20,
    },
  }),
};

export default function SkillScroller({ skills }) {
  const numSkills = useWindowSize().width <= 555 ? 4 : 11;
  const theme = useContext(ThemeContext);
  const panPos = useMotionValue(0);
  const [panning, setPanning] = useState(false);
  const [rollerPos, setRollerPos] = useState(11);
  const [hoveredSkill, setHoveredSkill] = useState(false);

  const slicedSkills = useMemo(() => {
    let newSkills = [];
    for (let i = 0; i < numSkills; i++) {
      if (rollerPos + i < skills.length) {
        newSkills.push(skills[rollerPos + i]);
      } else {
        newSkills.push(skills[rollerPos + i - (skills.length - 1)]);
      }
    }
    return newSkills;
  }, [rollerPos, skills, numSkills]);

  useInterval(() => {
    const notchesToMove = Math.round(panPos.get() / SCROLL_MULTIPLIER);
    if (Math.abs(notchesToMove) > 0) {
      setRollerPos((prev) =>
        prev - notchesToMove < 0
          ? skills.length - 1
          : prev - notchesToMove > skills.length - 1
          ? 0
          : prev - notchesToMove
      );
      panPos.set(panPos.get() - notchesToMove * SCROLL_MULTIPLIER);
    }
  }, 50);

  return (
    <Bubbles
      layoutId="skillRoller"
      onPan={(e, pointInfo) => {
        panPos.set(panPos.get() + pointInfo.delta.y);
        setPanning(true);
      }}
      onPanEnd={() => {
        panPos.set(0);
        setPanning(false);
      }}
    >
      <Arrow style={{ color: theme.primary_dark }}>
        <ArrowIcon />
      </Arrow>
      {slicedSkills.map((skill, index) => {
        return (
          <SkillBubble
            title={skill.title}
            key={skill.title}
            variants={bubbleV}
            custom={index}
            bgColor={theme.primary}
            height={36}
            transition={{
              type: "spring",
              stiffness: 200,
              mass: 0.75,
              damping: 28,
            }}
            outlineTransition={{
              type: "spring",
              stiffness: 300,
              mass: 0.75,
              damping: 28,
            }}
            onHover={!panning ? setHoveredSkill : null}
            hovering={hoveredSkill === skill.title && !panning}
          >
            {skill.title}
          </SkillBubble>
        );
      })}
      <Arrow style={{ rotate: 180, color: theme.primary_dark }}>
        <ArrowIcon />
      </Arrow>
    </Bubbles>
  );
}

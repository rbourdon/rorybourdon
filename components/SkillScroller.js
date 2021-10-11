import styled, { ThemeContext } from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useContext, useState } from "react";
import useInterval from "@/components/utils/useInterval";

const SCROLL_MULTIPLIER = 35;
const NUM_SKILLS = 13;

const Bubbles = styled(motion.div)`
  padding: 20px 20px;
  width: max-content;
  height: 100%;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-rows: repeat(auto-fit, 36px);
  row-gap: 1vh;
`;

const bubbleV = {
  hidden: {
    x: 300,
    transition: {
      duration: 0.3,
    },
  },
  visible: (custom) => ({
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60 + custom * 4,
      mass: 3,
      damping: 20,
    },
  }),
};

export default function SkillScroller({ skills }) {
  const theme = useContext(ThemeContext);
  const panPos = useMotionValue(0);
  const [rollerPos, setRollerPos] = useState(11);
  const [hovering, setHovering] = useState(false);

  const slicedSkills = () => {
    let newSkills = [];
    for (let i = 0; i < NUM_SKILLS; i++) {
      if (rollerPos + i < skills.length) {
        newSkills.push(skills[rollerPos + i]);
      } else {
        newSkills.push(skills[rollerPos + i - (skills.length - 1)]);
      }
    }
    return newSkills;
  };

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
  }, 100);

  return (
    <Bubbles layoutId="skillRoller">
      {slicedSkills().map((skill, index) => {
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
              stiffness: 300,
              mass: 0.75,
              damping: 28,
            }}
            outlineTransition={{
              type: "spring",
              stiffness: 300,
              mass: 0.75,
              damping: 28,
            }}
            onHover={setHovering}
            onPan={(e, pointInfo) =>
              panPos.set(panPos.get() + pointInfo.delta.y)
            }
            hovering={hovering === skill.title}
          >
            {skill.title}
          </SkillBubble>
        );
      })}
    </Bubbles>
  );
}

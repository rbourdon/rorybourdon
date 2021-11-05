import styled from "styled-components";
import { LayoutGroup, motion } from "framer-motion";
import SkillBubble from "@/components/Skills/SkillBubble";
import { useState } from "react";
import useInterval from "@/components/utils/useInterval";

const TICK_RATE = 1600;

const Roller = styled(motion.ul)`
  width: 110%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 36px);
  grid-template-columns: 100%;
  row-gap: 15px;
  align-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export default function SkillRoller({
  skills,
  selected,
  variants,
  numSkills = 7,
}) {
  const [rollerPos, setRollerPos] = useState(0);
  const [hovering, setHovering] = useState(false);
  useInterval(
    () => {
      setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
    },
    selected ? null : TICK_RATE
  );

  return (
    <Roller layoutId="skillRoller" variants={variants}>
      <LayoutGroup>
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
              id={skill.slug}
              key={skill.slug}
              top={index === 0 ? true : false}
              bottom={index === numSkills - 1 ? true : false}
              height={36}
              transition={{
                type: "spring",
                stiffness: Math.random() * 10 + 44,
                mass: Math.random() * 0.2 + 0.4,
                damping: 4,
              }}
              outlineTransition={{
                type: "spring",
                stiffness: 80,
                mass: 0.3,
                damping: 8,
              }}
              onHover={setHovering}
              hasOutline={hovering === skill.title}
            >
              {skill.title}
            </SkillBubble>
          );
        })}
      </LayoutGroup>
    </Roller>
  );
}

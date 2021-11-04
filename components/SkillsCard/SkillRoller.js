import styled from "styled-components";
import { LayoutGroup, motion } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useState } from "react";
import useInterval from "@/components/utils/useInterval";

const NUM_SKILLS = 7;
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

export default function SkillRoller({ skills, selected, variants }) {
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
          ...skills.slice(rollerPos, rollerPos + NUM_SKILLS),
          ...skills.slice(
            0,
            NUM_SKILLS - skills.slice(rollerPos, rollerPos + NUM_SKILLS).length
          ),
        ].map((skill, index) => {
          return (
            <SkillBubble
              title={skill.title}
              slug={skill.slug}
              key={skill.title}
              top={index === 0 ? true : false}
              bottom={index === NUM_SKILLS - 1 ? true : false}
              height={36}
              transition={{
                type: "spring",
                stiffness: 200,
                mass: 1.25,
                damping: 15,
              }}
              outlineTransition={{
                type: "spring",
                stiffness: 300,
                mass: 0.75,
                damping: 28,
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

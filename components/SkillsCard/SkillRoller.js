import styled from "styled-components";
import { motion } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useState } from "react";
import useInterval from "@/components/utils/useInterval";

const NUM_SKILLS = 6;
const TICK_RATE = 1600;

const Container = styled(motion.div)`
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
`;

export default function SkillRoller({ skills, selected }) {
  const [rollerPos, setRollerPos] = useState(0);
  const [hovering, setHovering] = useState(false);
  useInterval(
    () => {
      setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
    },
    selected ? null : TICK_RATE
  );

  return (
    <Container layoutId="skillRoller">
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
            key={skill.title}
            index={index}
            height={36}
            transition={{
              type: "spring",
              stiffness: 200,
              mass: 1.25,
              damping: 15,
            }}
            outlineTransition={{
              type: "spring",
              stiffness: 200,
              mass: 1.25,
              damping: 15,
            }}
            onHover={setHovering}
            hovering={hovering === skill.title}
          >
            {skill.title}
          </SkillBubble>
        );
      })}
    </Container>
  );
}

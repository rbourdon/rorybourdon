import styled, { ThemeContext } from "styled-components";
import { motion, LayoutGroup } from "framer-motion";
import SkillBubble from "@/components/Skills/SkillBubble";
import { useContext, useState } from "react";

const Bubbles = styled(motion.ul)`
  max-width: 100%;
  width: max-content;
  height: max-content;
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-rows: repeat(auto-fit, 40px);
  grid-template-columns: 100%;
  row-gap: 12px;
  padding: 10px;
  margin: 0;
  grid-auto-rows: 40px;
  align-self: center;
  z-index: 6;
`;

export default function SkillList({ skills, bubbleColor, textColor }) {
  const theme = useContext(ThemeContext);
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <LayoutGroup>
      <Bubbles layout>
        {skills.map((skill, index) => {
          return (
            <SkillBubble
              title={skill.title}
              key={skill.slug}
              custom={index}
              hoverColor={{
                bg: bubbleColor,
                text: textColor,
              }}
              bgColor={theme.primary}
              id={skill.slug}
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
              select={handleSkillSelect}
              selected={selectedSkill === skill.title}
              canHover
            />
          );
        })}
      </Bubbles>
    </LayoutGroup>
  );
}

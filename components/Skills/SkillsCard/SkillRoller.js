import styled, { ThemeContext } from "styled-components";
import { motion, useIsPresent } from "framer-motion";
import SkillBubble from "@/components/Skills/SkillBubble";
import { useContext, useState } from "react";
import useInterval from "@/components/utils/useInterval";

const TICK_RATE = 1000;

const Roller = styled(motion.ul)`
  width: 140%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 40px);
  grid-template-columns: 100%;
  row-gap: 15px;
  grid-auto-rows: 40px;
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
  const theme = useContext(ThemeContext);
  const [rollerPos, setRollerPos] = useState(0);

  const [selectedBubble, setSelectedBubble] = useState(false);
  const isPresent = useIsPresent();
  useInterval(
    () => {
      setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
    },
    selected || !isPresent ? null : TICK_RATE
  );

  const selectBubble = (bub) => {
    setSelectedBubble(bub);
  };

  return (
    <Roller variants={variants}>
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
            hoverColor={{
              bg: theme.teal,
              text: theme.primary_dark,
            }}
            transition={{
              type: "spring",
              stiffness: 60,
              mass: 0.2,
              damping: 18,
            }}
            outlineTransition={{
              type: "spring",
              stiffness: 150,
              mass: 0.8,
              damping: 15,
            }}
            select={selectBubble}
            canHover={true}
            selected={selectedBubble === skill.title}
          >
            {skill.title}
          </SkillBubble>
        );
      })}
    </Roller>
  );
}

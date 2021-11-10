import styled from "styled-components";
import { LayoutGroup, motion, useIsPresent } from "framer-motion";
import SkillBubble from "@/components/Skills/SkillBubble";
import { useState } from "react";
import useInterval from "@/components/utils/useInterval";

const TICK_RATE = 2000;

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
  const [hovering, setHovering] = useState(true);
  const [selectedBubble, setSelectedBubble] = useState(false);
  const isPresent = useIsPresent();
  useInterval(
    () => {
      setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
      setHovering(false);
    },
    selected || !isPresent ? null : TICK_RATE
  );

  const selectBubble = (bub) => {
    setSelectedBubble(bub);
    setHovering(true);
  };

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
                stiffness: 130,
                mass: 1,
                damping: 15,
              }}
              outlineTransition={{
                type: "spring",
                stiffness: 150,
                mass: 0.8,
                damping: 15,
              }}
              select={selectBubble}
              hovering={hovering}
              canHover={true}
              selected={selectedBubble === skill.title}
            >
              {skill.title}
            </SkillBubble>
          );
        })}
      </LayoutGroup>
    </Roller>
  );
}

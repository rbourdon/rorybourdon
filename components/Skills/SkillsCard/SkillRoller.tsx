import {
  LayoutGroup,
  motion,
  useIsPresent,
  type Variants,
} from "framer-motion";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import SkillBubble from "@/components/Skills/SkillBubble";
import useInterval from "@/components/utils/useInterval";
import type { SkillRef } from "@/lib/types";

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

interface SkillRollerProps {
  skills: SkillRef[];
  selected: boolean;
  variants?: Variants;
  numSkills?: number;
}

export default function SkillRoller({
  skills,
  selected,
  variants,
  numSkills = 7,
}: SkillRollerProps) {
  const theme = useTheme();
  const [rollerPos, setRollerPos] = useState(0);

  const [selectedBubble, setSelectedBubble] = useState<string | false>(false);
  const isPresent = useIsPresent();
  useInterval(
    () => {
      setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
    },
    selected || !isPresent ? null : TICK_RATE,
  );

  const selectBubble = (bub: string) => {
    setSelectedBubble(bub);
  };

  // Never show more bubbles than there are skills: wrapping round a short list
  // repeats a skill, the duplicate key leaves an orphaned bubble behind, and
  // the home page's exit animation then never completes.
  const visible = Math.min(numSkills, skills.length);

  // The bubbles slide into their new rows via layout animations, which only
  // measure a bubble when it re-renders. React Compiler memoizes the bubble
  // elements, so on each tick only the ones whose props changed re-render and
  // the rest snap to their new row. LayoutGroup makes every bubble measure
  // whenever any one of them does.
  return (
    <LayoutGroup>
      <Roller variants={variants}>
        {[
          ...skills.slice(rollerPos, rollerPos + visible),
          ...skills.slice(
            0,
            visible - skills.slice(rollerPos, rollerPos + visible).length,
          ),
        ].map((skill, index) => {
          return (
            <SkillBubble
              title={skill.title}
              id={skill.slug}
              key={`${skill.slug}_roller`}
              top={index === 0 ? true : false}
              bottom={index === visible - 1 ? true : false}
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
    </LayoutGroup>
  );
}

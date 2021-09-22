import styled from "styled-components";
import { motion } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useEffect, useState } from "react";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 36px);
  grid-template-columns: 100%;
  row-gap: 8px;
  align-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
`;

const bubbleV = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const bubbleBottom = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const bubbleTop = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function SkillBubbles({ skills, rollerPos }) {
  const skillBubbles = [];

  for (let i = 0; i <= 6; i++) {
    const index =
      rollerPos + i > skills.length - 1
        ? rollerPos + i - (skills.length - 1) - 1
        : rollerPos + i;
    skillBubbles.push(
      <SkillBubble
        title={skills[index].title}
        key={skills[index].title}
        bubbleV={i === 0 ? bubbleTop : i === 6 ? bubbleBottom : bubbleV}
      >
        {skills[index].title}
      </SkillBubble>
    );
  }

  return skillBubbles;
}

export default function SkillRoller({ skills, selected }) {
  const [rollerPos, setRollerPos] = useState(0);
  const [scrollTimer, setScrollTimer] = useState(null);

  const scrollSkills = () => {
    setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    scrollTimer && clearInterval(scrollTimer);
    !selected && setScrollTimer(setInterval(scrollSkills, 1100));
    return function cleanup() {
      clearInterval(scrollTimer);
      setScrollTimer(null);
    };
  }, [selected]);

  return (
    <Container layoutId="skillRoller">
      <SkillBubbles skills={skills} rollerPos={rollerPos} />
    </Container>
  );
}

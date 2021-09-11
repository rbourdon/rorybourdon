import styled from "styled-components";
import { motion } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { useEffect, useState } from "react";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 40px);
  grid-template-columns: 100%;
  row-gap: 7px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
`;

const rollerV = {
  visible: { transition: { delayChildren: 1, staggerChildren: 1 } },
};

function SkillBubbles({ skills, rollerPos }) {
  const skillBubbles = [];

  for (let i = 0; i <= 3; i++) {
    const index =
      rollerPos + i > skills.length - 1
        ? rollerPos + i - (skills.length - 1) - 1
        : rollerPos + i;
    skillBubbles.push(
      <SkillBubble title={skills[index].title} key={skills[index].title}>
        {skills[index].title}
      </SkillBubble>
    );
  }

  return skillBubbles;
}

export default function SkillRoller({ skills }) {
  const [rollerPos, setRollerPos] = useState(0);

  const scrollSkills = () => {
    setRollerPos((prev) => (prev + 1 > skills.length - 1 ? 0 : prev + 1));
    setTimeout(scrollSkills, 1300);
  };

  useEffect(() => {
    setTimeout(scrollSkills, 1200);
  }, []);

  return (
    <Container variants={rollerV} initial="hidden" animate="visible">
      <SkillBubbles skills={skills} rollerPos={rollerPos} />
    </Container>
  );
}

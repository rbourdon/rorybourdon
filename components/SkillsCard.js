import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import NavCard from "@/components/NavCard";
import SkillsIcon from "@/components/SkillsIcon";
import { useContext } from "react";
import Button from "@/components/Button";
import SkillRoller from "@/components/SkillRoller";

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 35% 10% 1fr calc(10% + 40px);
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 35px 30px;
  z-index: 5;
`;

const Icon = styled(motion.div)`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Label = styled(motion.p)`
  width: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  text-align: center;
`;

const skillsCardV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3.45,
      duration: 0.1,
    },
  },
};

export default function SkillsCard({ skills }) {
  const theme = useContext(ThemeContext);
  return (
    <NavCard
      height={710}
      width={230}
      stemDir="h"
      stemLoc={1}
      stemSide="r"
      stemLength={475}
      color1={theme.red.get()}
      color2={theme.yellow.get()}
      effectLocation={{ x: 0.5, y: 0.25 }}
      effectRadius={300}
      id={"skillsCard"}
      delay={0.5}
    >
      <CardContent variants={skillsCardV}>
        <Icon>
          <SkillsIcon />
        </Icon>
        <Label>Skills</Label>
        <SkillRoller skills={skills} />
        <Button
          width={150}
          height={50}
          color1={theme.red.get()}
          color2={theme.yellow.get()}
          href="/"
          id="skillsButton"
          delay={3.5}
        >
          All Skills
        </Button>
      </CardContent>
    </NavCard>
  );
}

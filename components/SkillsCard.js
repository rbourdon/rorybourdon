import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import NavCard from "@/components/NavCard";
import SkillsIcon from "@/components/SkillsIcon";
import { useContext } from "react";
import Button from "@/components/Button";

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 35% 10% 35% 20%;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 80px 40px;
`;

const Icon = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const SkillRoller = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Label = styled(motion.p)`
  width: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  text-align: center;
`;

export default function SkillsCard() {
  const theme = useContext(ThemeContext);
  return (
    <NavCard
      height={710}
      width={230}
      stemDir="h"
      stemLoc={1}
      stemSide="r"
      stemLength={400}
      color1={theme.red.get()}
      color2={theme.yellow.get()}
      effectLocation={{ x: 0.5, y: 0.25 }}
      effectRadius={300}
      id={"skillsCard"}
      delay={0.5}
    >
      <CardContent>
        <Icon>
          <SkillsIcon />
        </Icon>
        <Label>Skills</Label>
        <SkillRoller>Roller</SkillRoller>
        <Button
          color1={theme.red.get()}
          color2={theme.yellow.get()}
          href="/"
          id="skillsButton"
          delay={3.5}
        >
          View All Skills
        </Button>
      </CardContent>
    </NavCard>
  );
}

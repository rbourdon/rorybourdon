import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import NavCard from "@/components/NavCard";
import { useContext } from "react";
import Button from "@/components/Button";

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
      delay: 710 * 230 * 0.0000012 + 2.05,
      duration: 0.4,
    },
  },
};

const iconV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 2.15,
      duration: 0.65,
    },
  },
};

export default function ProjectsCard({ selected }) {
  const theme = useContext(ThemeContext);
  return (
    <NavCard
      height={510}
      width={710}
      stemDir="h"
      stemLoc={7}
      stemLength={475}
      color1={theme.teal.get()}
      color2={theme.green.get()}
      effectOffset={{ x: 600, y: 20 }}
      effectRadius={375}
      id={"projectsCard"}
      delay={0.5}
      tagline="I have a wide variety of skills and love to learn."
      selected={selected}
    >
      <CardContent variants={skillsCardV}>
        <Icon variants={iconV}></Icon>
        <Label>Projects</Label>
        <Button
          width={150}
          height={50}
          color1={theme.teal.get()}
          color2={theme.green.get()}
          href="/"
          id="projectsButton"
          delay={710 * 230 * 0.0000012 + 2.15}
        >
          All Projects
        </Button>
      </CardContent>
    </NavCard>
  );
}

import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import NavCard from "@/components/NavCard";
import { useContext } from "react";
import ProjectsIcon from "@/components/ProjectsIcon";
import Underline from "@/components/Underline";
import ProjectSummary from "./ProjectSummary";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  grid-template-rows: 10% 90%;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 35px 40px;
  z-index: 5;
`;

const Icon = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 0 0;
`;

const Label = styled(motion.p)`
  width: 100%;
  height: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-column: span 2;
`;

const ProjectsBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 0 0 20px;
  overflow: hidden;
`;

const projectsCardV = {
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
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      duration: 0.05,
      delay: 710 * 230 * 0.0000012 + 2.45,
      when: "beforeChildren",
    },
  },
};

const underlineV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 2.05,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function ProjectsCard({ selected }) {
  const theme = useContext(ThemeContext);
  const { ref, inView } = useInView({
    threshold: 0.66,
  });
  return (
    <motion.div
      initial="hidden"
      animate={selected ? "selected" : inView ? "visible" : "hidden"}
      exit={selected ? null : "exit"}
    >
      <NavCard
        height={422}
        width={627}
        stemDir="h"
        stemLoc={7}
        stemLength={375}
        color1={theme.teal}
        color2={theme.green}
        effectOffset={{ x: 600, y: 20 }}
        effectRadius={315}
        id="projects"
        delay={0.5}
        tagline="I enjoy building and experimenting"
        intersectionRef={ref}
        stem
      >
        <CardContent variants={projectsCardV}>
          <Label>
            Projects
            <Underline
              variants={underlineV}
              width={130}
              sWidth={1.2}
              color1={theme.teal}
              color2={theme.green}
              id="projects"
            />
          </Label>
          <Icon
            layoutId={"projectsCard_icon"}
            style={{ color: theme.primary_verydark }}
          >
            <ProjectsIcon iconV={iconV} delay={710 * 230 * 0.0000012 + 2.15} />
          </Icon>
          <ProjectsBox>
            <ProjectSummary />
            <Button
              width={150}
              height={50}
              color1={theme.teal}
              color2={theme.green}
              href="/projects"
              id="projects"
              delay={710 * 230 * 0.0000012 + 2.15}
            >
              All Projects
            </Button>
          </ProjectsBox>
        </CardContent>
      </NavCard>
    </motion.div>
  );
}

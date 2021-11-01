import styled from "styled-components";
import { motion } from "framer-motion";
import SkillChip from "@/components/ProjectsCard/SkillChip";

const Container = styled(motion.div)`
  width: 100%;
`;

const ProjectTitle = styled(motion.p)`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
`;

const ProjectDescription = styled(motion.p)`
  width: 100%;
  font-size: 0.75rem;
  font-weight: 200;
`;

const SkillChips = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0 10px 0;
`;

const titleV = {
  hidden: {
    x: 120,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 710 * 230 * 0.0000012 + 2.45,
      duration: 0.7,
    },
  },
};

const descV = {
  hidden: {
    x: 120,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      delay: 710 * 230 * 0.0000012 + 2.65,
      duration: 0.7,
    },
  },
};

function GetSkillChips({ skills, projectTitle }) {
  return skills.map((skill, index) => {
    return (
      <SkillChip
        layoutId={`${skill.title}_chip_${projectTitle}`}
        title={skill.title}
        key={skill.title}
        variants={{
          hidden: { x: 120, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              delay: 710 * 230 * 0.0000012 + 2.85 + index * 0.1,
              duration: 0.9,
            },
          },
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {skill.title}
      </SkillChip>
    );
  });
}

export default function ProjectSummary({ project }) {
  return (
    <Container>
      <ProjectTitle variants={titleV}>{project.title}</ProjectTitle>
      <ProjectDescription variants={descV}>
        {project.description}
      </ProjectDescription>
      <SkillChips>
        <GetSkillChips skills={project.skills} projectTitle={project.title} />
      </SkillChips>
    </Container>
  );
}

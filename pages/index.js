import SkillsCard from "@/components/Skills/SkillsCard/SkillsCard";
import ProjectsCard from "@/components/Projects/ProjectsCard/ProjectsCard";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import Banner from "@/components/Banner";
import { getAllSkills, getAllProjects } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";
import Head from "next/head";
import HorizonEffects from "@/components/Icons/HorizonEffects";

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - (150px + 5vh));
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const HeroBanner = styled(motion.article)`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const HeroBody = styled(motion.div)`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: end;
  margin-top: 1vh;
`;

const HeroSection = styled(motion.section)`
  width: 100%;
  min-height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 10vw 5vh 10vw;

  @media (max-width: 555px) {
    padding: 0 6vw 5vh 6vw;
  }
`;

const SkillsSection = styled(motion.section)`
  width: 100%;
  height: 120vh;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectsSection = styled(motion.section)`
  width: 100%;
  padding: 0 5vw;
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home({ skills, projects }) {
  const theme = useContext(ThemeContext);
  const skillSection = useRef();
  const projectsSection = useRef();

  return (
    <Container
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ backgroundColor: theme.primary }}
    >
      <Head>
        <title>Rory Bourdon | Web Developer & Visual Artist</title>
        <meta name="description" content="Portfolio of Rory Bourdon" />
        <meta
          name="og:title"
          content="Rory Bourdon | Web Developer & Visual Artist"
        />
        <meta name="og:description" content="Portfolio of Rory Bourdon" />
      </Head>
      <NavBar>
        <NavLink
          onClick={() =>
            skillSection.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        >
          Skills
        </NavLink>
        <NavLink
          onClick={() =>
            projectsSection.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
        >
          Projects
        </NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <HorizonEffects
        lines={[
          { slope: -19, yLoc: 35 },
          { slope: -90, yLoc: 130 },
        ]}
        circles={[{ cx: "100%", cy: "10%", r: 0.2 }]}
      />
      <Content>
        <HeroSection>
          <HeroBanner>
            <Banner />
          </HeroBanner>
          <HeroBody></HeroBody>
        </HeroSection>
        <SkillsSection
          ref={skillSection}
          id="skills"
          style={{ backgroundColor: theme.primary_light }}
        >
          <SkillsCard skills={skills} />
        </SkillsSection>
        <ProjectsSection ref={projectsSection}>
          <ProjectsCard projects={projects} />
        </ProjectsSection>
      </Content>
    </Container>
  );
}

export async function getStaticProps() {
  const skills = (await getAllSkills()) || [];
  const projects = (await getAllProjects()) || [];
  return {
    props: { skills, projects },
    revalidate: 20000,
  };
}

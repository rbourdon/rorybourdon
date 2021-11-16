import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import { getProjectList } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";
import Head from "next/head";
import BackArrow from "@/components/BackArrow";
import ProjectsScroller from "@/components/Projects/ProjectsScroller";
import ProjectsSceneIcon from "@/components/Icons/ProjectsSceneIcon";
import HorizonEffects from "@/components/Icons/HorizonEffects";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: 100%;
  display: grid;
  flex: 1;
  grid-template-rows: max-content max-content;
  grid-template-columns: 60% 40%;
  padding: 0 12vw;
  align-content: space-evenly;
  justify-content: center;
  grid-auto-flow: dense;
  overflow: hidden;

  @media (max-width: 555px) {
    row-gap: 10px;
    align-items: start;
    grid-template-rows: max-content max-content max-content;
    grid-template-columns: 100%;
    padding: 0 8vw;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const Title = styled(motion.h1)`
  width: max-content;
  font-size: clamp(3.4rem, 15vw, 9rem);
  font-weight: 100;
  line-height: 1.2;
  margin: 0 0 20px 30px;
`;

const Detail = styled(motion.p)`
  width: 100%;
  max-width: 700px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
`;
const DetailBlock = styled(motion.div)`
  width: 100%;
  max-width 800px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
  display: flex;
`;

const TitleBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const HeadingBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectsScene = styled(motion.div)`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
`;

const ProjectsBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-column: span 2;

  @media (max-width: 555px) {
    grid-column: span 1;
  }
`;

const detailsV = {
  hidden: {
    opacity: 0,
    x: "70%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.25,
      type: "spring",
      stiffness: 30,
      mass: 1,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const arrowV = {
  hidden: {
    opacity: 1,
    x: 600,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 30,
      mass: 1,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export default function Skill({ projects }) {
  const theme = useContext(ThemeContext);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 30,
        mass: 2,
        damping: 11,
      }}
    >
      <Container
        style={{ backgroundColor: theme.primary }}
        layoutId="projectCard_window"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <title>Projects - Rory Bourdon | Web Developer & Visual Artist</title>
          <meta
            name="description"
            content="Projects - Rory Bourdon | Web Developer & Visual Artist"
          />
        </Head>
        <NavBar>
          <NavLink href="/skills">Skills</NavLink>
          <NavLink href="/">Resume</NavLink>
        </NavBar>
        <Content>
          <HorizonEffects
            lines={[{ slope: -25, yLoc: 55 }]}
            circles={[{ cx: "88%", cy: "8%", r: 0.18 }]}
            slope={-25}
            yLoc={65}
          />
          <HeadingBlock>
            <TitleBlock>
              <BackArrow id="projectsPage" variants={arrowV} />
              <Title
                layoutId="projectCard_label"
                style={{ color: theme.primary_dark }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  mass: 2,
                  damping: 14,
                }}
              >
                Projects
              </Title>
            </TitleBlock>

            <DetailBlock>
              <Detail variants={detailsV} style={{ color: theme.primary_dark }}>
                These are some of the skills I’ve picked up over the years
                through a combination of formal education, self-directed
                learning and most importantly, building things. Some I know
                better than others. I hope this list never stops growing.
              </Detail>
            </DetailBlock>
          </HeadingBlock>
          <ProjectsScene>
            <ProjectsSceneIcon scale={1.1} collapsed={false} />
          </ProjectsScene>
          <ProjectsBlock>
            <ProjectsScroller
              projects={projects}
              primaryColor={theme.primary_dark}
              bgColor={theme.orange}
            />
          </ProjectsBlock>
        </Content>
      </Container>
    </MotionConfig>
  );
}

export async function getStaticProps() {
  const projects = (await getProjectList("all")) || [];
  return {
    props: { projects },
  };
}

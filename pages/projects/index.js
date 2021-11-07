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

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: 100%;
  display: grid;
  flex: 1;
  grid-template-rows: max-content max-content;
  grid-template-columns: 60% 1fr;
  padding: 0 11vw;
  align-content: space-evenly;
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
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 20px 30px;
`;

const Detail = styled(motion.p)`
  width: 100%;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
`;
const DetailBlock = styled(motion.div)`
  width: 100%;
  max-width 800px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
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
  //const convert = require("color-convert");
  // const secondaryColorRGB = convert.rgb.hsl(
  //   skill.secondaryColor.rgba.r,
  //   skill.secondaryColor.rgba.g,
  //   skill.secondaryColor.rgba.b
  // );
  // const primaryColorRGB = convert.rgb.hsl(
  //   skill.primaryColor.rgba.r,
  //   skill.primaryColor.rgba.g,
  //   skill.primaryColor.rgba.b
  // );
  // const primaryColor = useMotionValue(
  //   `hsla(${primaryColorRGB[0]},${primaryColorRGB[1]}%,${primaryColorRGB[2]}%,1)`
  // );
  // const secondaryColor = useMotionValue(
  //   `hsla(${secondaryColorRGB[0]},${secondaryColorRGB[1]}%,${secondaryColorRGB[2]}%,1)`
  // );

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 30,
        mass: 2,
        damping: 11,
        //duration: 2,
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
        <NavBar logoComplete={true}>
          <NavLink href="/">Projects</NavLink>
          <NavLink href="/">Resume</NavLink>
        </NavBar>
        <Content>
          <HeadingBlock>
            <TitleBlock>
              <BackArrow id="projectsPage" variants={arrowV} />
              <Title
                layoutId="projects_Title"
                style={{ color: theme.primary_verydark }}
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
              {/* <SkillTile
                layoutId={`${skill.slug}_bubble`}
                style={{ backgroundColor: primaryColor }}
              >
                {skill?.image?.url && (
                  <SkillImage variants={skillImageV}>
                    <Image
                      width={130}
                      height={130}
                      priority
                      alt={`${skill.title} Logo`}
                      src={skill.image.url}
                    />
                  </SkillImage>
                )}
              </SkillTile> */}
              <Detail variants={detailsV} style={{ color: theme.primary_dark }}>
                These are some of the skills I’ve picked up over the years
                through a combination of formal education, self-directed
                learning and most importantly, building things. Some I know
                better than others. I hope this list never stops growing.
              </Detail>
            </DetailBlock>
          </HeadingBlock>
          <ProjectsSceneIcon />
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
    revalidate: 20000,
  };
}

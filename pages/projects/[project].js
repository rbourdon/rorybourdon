import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import { getProjectList, getProjectDetails } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";
import Head from "next/head";
import BackArrow from "@/components/BackArrow";
import SkillScroller from "@/components/Skills/SkillScroller";
import SkillRoller from "@/components/Skills/SkillsCard/SkillRoller";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: max-content;
  display: grid;
  flex: 1;
  padding: 8vh 10vw;
  grid-template-rows: max-content max-content max-content;
  grid-template-columns: minmax(min-content, 60%) 1fr;
  grid-auto-flow: dense;
  align-items: center;
  align-content: center;

  @media (max-width: 555px) {
    row-gap: 10px;
    align-items: start;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 100%;
    padding: 2vh 8vw;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

// const ProjectImage = styled(motion.div)`
//   width: 100%;
//   height: 100%;
// `;

// const ProjectTile = styled(motion.div)`
//   min-width: 130px;
//   width: 130px;
//   min-height: 130px;
//   height: 130px;
//   margin-right: 20px;
//   border-radius: 20px;
//   overflow: hidden;
//   position: relative;
//   background-color: yellow;
// `;

const Title = styled(motion.h1)`
  width: max-content;
  font-size: clamp(3.4rem, 15vw, 9rem);
  font-weight: 300;
  margin: 0 0 20px 30px;
`;

const Detail = styled(motion.p)`
  width: 100%;
  max-width min(100%, 1000px);
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
`;
const DetailBlock = styled(motion.div)`
  width: 100%;
  justify-self: end;
  height: max-content;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const SkillsColumn = styled(motion.section)`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-self: center;
  grid-row: span 3;

  @media (max-width: 555px) {
    height: max-content;
    grid-row: span 1;
    justify-content: center;
    align-items: center;
  }
`;

const TitleBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  grid-column: span 2;
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

// const skillImageV = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       type: "tween",
//       delay: 1.5,
//       duration: 0.3,
//     },
//   },
// };

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

export default function Project({ project }) {
  const theme = useContext(ThemeContext);

  //   const convert = require("color-convert");
  //   const secondaryColorRGB = convert.rgb.hsl(
  //     skill.secondaryColor.rgba.r,
  //     skill.secondaryColor.rgba.g,
  //     skill.secondaryColor.rgba.b
  //   );
  //   const primaryColorRGB = convert.rgb.hsl(
  //     skill.primaryColor.rgba.r,
  //     skill.primaryColor.rgba.g,
  //     skill.primaryColor.rgba.b
  //   );
  //   const primaryColor = useMotionValue(
  //     `hsla(${primaryColorRGB[0]},${primaryColorRGB[1]}%,${primaryColorRGB[2]}%,1)`
  //   );
  //   const secondaryColor = useMotionValue(
  //     `hsla(${secondaryColorRGB[0]},${secondaryColorRGB[1]}%,${secondaryColorRGB[2]}%,1)`
  //   );

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
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <title>{`${project.title} - Projects - Rory Bourdon | Web Developer & Visual Artist`}</title>
          <meta
            name="description"
            content={`${project.title} - Projects - Rory Bourdon | Web Developer & Visual Artist`}
          />
        </Head>
        <NavBar logoComplete={true}>
          <NavLink href="/">Projects</NavLink>
          <NavLink href="/">Resume</NavLink>
        </NavBar>
        <Content>
          <TitleBlock>
            <BackArrow variants={arrowV} />
            <Title
              layoutId={`${project.slug}_title`}
              style={{ color: theme.primary_verydark }}
              transition={{
                type: "spring",
                stiffness: 70,
                mass: 1,
                damping: 14,
              }}
            >
              {project.title}
            </Title>
          </TitleBlock>
          <Detail variants={detailsV} style={{ color: theme.primary_dark }}>
            {project.description}
          </Detail>
          <SkillsColumn>
            <SkillRoller
              selected={false}
              skills={project.skills}
              numSkills={project.skills.length - 1}
            />
          </SkillsColumn>

          <DetailBlock>
            <motion.div
              style={{
                backgroundColor: "black",
                width: 800,
                height: 600,
                margin: "200px 0",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2, duration: 1 } }}
            />

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
          </DetailBlock>
          {/*<ProjectsScroller
            projects={skill.projects}
            primaryColor={primaryColor}
            bgColor={secondaryColor}
          />*/}
        </Content>
      </Container>
    </MotionConfig>
  );
}

export async function getStaticProps({ params }) {
  const project = (await getProjectDetails(params.project)) || [];
  return {
    props: { project },
    revalidate: 20000,
  };
}

export async function getStaticPaths() {
  //Get slugs for boxes, for dynamic routing.
  const projects = (await getProjectList("all")) || [];

  const paths = projects.map((project) => ({
    params: { project: project.slug },
  }));

  return { paths, fallback: false };
}

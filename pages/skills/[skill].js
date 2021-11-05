import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import React, { useContext } from "react";
import { getSkillList, getSkillDetails } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";
import Head from "next/head";
import Image from "next/image";
import BackArrow from "@/components/BackArrow";
import ProjectsScroller from "@/components/Projects/ProjectsScroller";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: max-content;
  display: grid;
  flex: 1;
  grid-template-rows: max-content max-content max-content 1fr;
  grid-template-columns: 100%;
  padding: 5vh 16vw;
  grid-auto-flow: dense;
  align-items: center;
  overflow: hidden;

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const SkillImage = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const SkillTile = styled(motion.div)`
  min-width: 130px;
  width: 130px;
  min-height: 130px;
  height: 130px;
  margin-right: 20px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background-color: yellow;
`;

const Title = styled(motion.h1)`
  width: max-content;
  font-size: clamp(3.4rem, 15vw, 9rem);
  font-weight: 300;
  line-height: 1.2;
  margin-left: 20px;
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

const ScrollerTitle = styled(motion.p)`
  width: 100%;
  height: 100px;
  padding: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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

const skillImageV = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 1.5,
      duration: 0.3,
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

export default function Skill({ skill }) {
  const theme = useContext(ThemeContext);
  const convert = require("color-convert");
  const secondaryColorRGB = convert.rgb.hsl(
    skill.secondaryColor.rgba.r,
    skill.secondaryColor.rgba.g,
    skill.secondaryColor.rgba.b
  );
  const primaryColorRGB = convert.rgb.hsl(
    skill.primaryColor.rgba.r,
    skill.primaryColor.rgba.g,
    skill.primaryColor.rgba.b
  );
  const primaryColor = useMotionValue(
    `hsla(${primaryColorRGB[0]},${primaryColorRGB[1]}%,${primaryColorRGB[2]}%,1)`
  );
  const secondaryColor = useMotionValue(
    `hsla(${secondaryColorRGB[0]},${secondaryColorRGB[1]}%,${secondaryColorRGB[2]}%,1)`
  );

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
          <title>{`${skill.title} - Skills - Rory Bourdon | Web Developer & Visual Artist`}</title>
          <meta
            name="description"
            content={`${skill.title} - Skills - Rory Bourdon | Web Developer & Visual Artist`}
          />
        </Head>
        <NavBar logoComplete={true}>
          <NavLink href="/">Projects</NavLink>
          <NavLink href="/">Resume</NavLink>
        </NavBar>
        <Content>
          {/* <HorizonLine /> */}
          <TitleBlock>
            <BackArrow variants={arrowV} />
            <Title
              layoutId={`${skill.slug}_bubbleLink`}
              style={{ color: theme.primary_verydark }}
              transition={{
                type: "spring",
                stiffness: 50,
                mass: 2,
                damping: 14,
              }}
            >
              {skill.title}
            </Title>
          </TitleBlock>
          <DetailBlock>
            <SkillTile
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
            </SkillTile>
            <Detail variants={detailsV} style={{ color: theme.primary_dark }}>
              {skill.description}
            </Detail>
          </DetailBlock>
          <ScrollerTitle>Projects built with {skill.title}</ScrollerTitle>
          <ProjectsScroller
            projects={skill.projects}
            primaryColor={primaryColor}
            bgColor={secondaryColor}
          />
          {/* <SkillsColumn></SkillsColumn> */}
        </Content>
      </Container>
    </MotionConfig>
  );
}

export async function getStaticProps({ params }) {
  const skill = (await getSkillDetails(params.skill)) || [];
  return {
    props: { skill },
    revalidate: 20000,
  };
}

export async function getStaticPaths() {
  //Get slugs for boxes, for dynamic routing.
  const skills = (await getSkillList("skill-scroller")) || [];

  const paths = skills.map((skill) => ({
    params: { skill: skill.slug },
  }));

  return { paths, fallback: false };
}

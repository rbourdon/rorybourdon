import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import { getSkillList } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import SkillScroller from "@/components/Skills/SkillScroller";
import Highlight from "@/components/Highlight";
import Head from "next/head";
import TreeIcon from "@/components/Icons/TreeIcon";
import HorizonEffects from "@/components/Icons/HorizonEffects";
import BackArrow from "@/components/BackArrow";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: max-content;
  display: grid;
  flex: 1;
  grid-template-rows: max-content max-content max-content;
  grid-template-columns: 72% 1fr;
  padding: 0 16vw;
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
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const SkillsColumn = styled(motion.section)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  justify-self: center;
  grid-row: span 3;

  @media (max-width: 555px) {
    grid-row: span 1;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Trees = styled(motion.div)`
  width: max-content;
  max-width: min(100%, 500px);
  height: max-content;
  align-items: flex-end;
  justify-content: center;
  justify-self: flex-end;
  display: flex;
  position: relative;
  zindex: 0;

  @media (max-width: 555px) {
    width: max-content;
    justify-self: center;
    position: absolute;
    bottom: -2vh;
    height: max-content;
  }
`;

const TreeShadow = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  height: 104px;
  background-color: black;
  position: absolute;
  bottom: -37px;
  clip-path: ellipse(50% 35% at 50% 50%);
  zindex: 1;

  @media (max-width: 555px) {
    height: 104px;
  }
`;

const Title = styled(motion.h1)`
  width: max-content;
  font-size: clamp(3.4rem, 15vw, 9rem);
  font-weight: 100;
  line-height: 1;
  margin-left: 20px;
`;

const Detail = styled(motion.div)`
  padding: 0 0 10vh 0;
  max-width: 610px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 100;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;

  @media (max-width: 555px) {
    padding: 0;
  }
`;

const TitleBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
`;

const treeV = {
  hidden: (custom) => ({
    originY: 0.65,
    y: -20,
    scale: custom,
  }),
  visible: (custom) => ({
    originY: 0.65,
    y: -20,
    scale: custom,
  }),
};

const detailsV = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      mass: 1.5,
      damping: 10,
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

const treeShadowV = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 60,
      mass: 1.5,
      damping: 10,
    },
  },
};

const arrowV = {
  hidden: {
    opacity: 1,
    x: 400,
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

const pageLinks = [
  {
    name: "Projects",
    href: "/projects",
    onClick: null,
  },
  {
    name: "Contact",
    href: "/contact",
    onClick: null,
  },
  {
    name: "Resume",
    href: "/",
    onClick: null,
  },
];

export default function Skills({ skills }) {
  const theme = useContext(ThemeContext);

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 30, mass: 2, damping: 14 }}
    >
      <Container
        style={{ backgroundColor: theme.primary }}
        layoutId="skillsCard_window"
        transition={{ type: "spring", stiffness: 30, mass: 2, damping: 14 }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <title>Skills - Rory Bourdon | Web Developer & Visual Artist</title>
          <meta
            name="description"
            content="Skills - Rory Bourdon | Web Developer & Visual Artist"
          />
        </Head>
        <NavBar links={pageLinks} />
        <Content>
          <HorizonEffects lines={[{ yLoc: 70, slope: -25 }]} />
          <TitleBlock>
            <BackArrow variants={arrowV} id="skillsPage" />
            <Title
              layoutId="skillsCard_label"
              style={{ color: theme.primary_verydark }}
            >
              Skills
            </Title>
          </TitleBlock>
          <Detail
            variants={detailsV}
            style={{ color: theme.primary_dark }}
            layoutId="skillDetails"
          >
            {`These are some of the skills I’ve picked up over the years through
              a combination of formal education, self-directed learning and most
              importantly, `}
            <Highlight color={theme.teal}>building things</Highlight>
            {`. I hope this list never stops growing.`}
          </Detail>
          <SkillsColumn>
            <SkillScroller skills={skills} />
          </SkillsColumn>

          <Trees initial="visible">
            <TreeIcon
              zIndex={2}
              colors={{
                trunk: theme.primary_light,
                foliage: theme.primary_dark,
              }}
              layoutId="skills_tree_left"
              transition={{
                type: "spring",
                stiffness: 30,
                mass: 2,
                damping: 14,
              }}
              margin="0 -100px 0 0"
              scale={0.95}
              iconV={treeV}
            />
            <TreeIcon
              colors={{
                trunk: theme.primary_verydark,
                foliage: theme.teal,
              }}
              zIndex={3}
              transition={{
                type: "spring",
                stiffness: 35,
                mass: 1.9,
                damping: 14,
              }}
              scale={1.1}
              iconV={treeV}
            />
            <TreeIcon
              zIndex={2}
              colors={{
                trunk: theme.primary_light,
                foliage: theme.primary_mediumdark,
              }}
              layoutId="skills_tree_right"
              transition={{
                type: "spring",
                stiffness: 40,
                mass: 1.8,
                damping: 14,
              }}
              margin="0 0 0 -100px"
              scale={0.85}
              iconV={treeV}
            />
            <TreeShadow
              initial="hidden"
              animate="visible"
              variants={treeShadowV}
              style={{ backgroundColor: theme.primary_slightlydark }}
            />
          </Trees>
        </Content>
      </Container>
    </MotionConfig>
  );
}

export async function getStaticProps() {
  const skills = (await getSkillList("skill-scroller")) || [];
  return {
    props: { skills },
  };
}

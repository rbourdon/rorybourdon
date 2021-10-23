import Layout from "@/components/layout";
import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import { getSkillList } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";

import SkillScroller from "@/components/SkillScroller";
import Highlight from "@/components/Highlight";
import Head from "next/head";
import TreeIcon from "@/components/Icons/TreeIcon";
import HorizonLine from "@/components/Icons/HorizonLine";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: max-content;
  flex-grow: 1;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  grid-template-columns: 72% 1fr;
  padding: 10vh 16vw;
  grid-auto-flow: dense;

  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 555px) {
    row-gap: 10px;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 100%;
    padding: 2vh 8vw;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
    height: max-content;
    grid-row: span 1;
    justify-content: center;
    align-items: center;
  }
`;

const Trees = styled(motion.div)`
  width: max-content;
  max-width: min(100%, 500px);
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  justify-self: flex-end;
  display: flex;
  position: relative;
  zindex: 0;

  @media (max-width: 555px) {
    width: 100%;
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
  font-weight: 300;
  line-height: 1;
`;

const Detail = styled(motion.div)`
  max-width: 475px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
`;

const skillsIconV = {
  hidden: (custom) => ({
    originY: 0.65,
    scale: custom,
  }),
  visible: (custom) => ({
    originY: 0.65,
    scale: custom,
    transition: {
      duration: 3,
    },
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

export default function Skills({ skills }) {
  const theme = useContext(ThemeContext);

  return (
    <Container
      style={{
        backgroundColor: theme.primary_light,
      }}
    >
      <Head>
        <title>Skills - Rory Bourdon | Web Developer & Visual Artist</title>
        <meta
          name="description"
          content="Skills - Rory Bourdon | Web Developer & Visual Artist"
        />
      </Head>
      <NavBar logoComplete={true}>
        <NavLink href="/">Projects</NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <MotionConfig
        transition={{ type: "spring", stiffness: 60, mass: 2, damping: 14 }}
      >
        <Content
          style={{ backgroundColor: theme.primary }}
          initial="hidden"
          animate="visible"
          layoutId={"skillsCard_window"}
        >
          <HorizonLine />
          <Title
            layoutId={"skillsCard_label"}
            style={{ color: theme.primary_verydark }}
          >
            Skills
          </Title>
          <Detail variants={detailsV} style={{ color: theme.primary_dark }}>
            {`These are some of the skills I’ve picked up over the years through
              a combination of formal education, self-directed learning and most
              importantly, `}
            <Highlight>building things</Highlight>
            {`. Some I know better than
              others. I hope this list never stops growing.`}
          </Detail>
          <SkillsColumn layoutId={"skillsCard_skillsColumn"}>
            <SkillScroller skills={skills} />
          </SkillsColumn>

          <Trees initial="visible" layoutId={"skillsCard_trees"}>
            <TreeIcon
              zIndex={2}
              colors={{
                trunk: theme.primary_light,
                foliage: theme.primary_verydark,
              }}
              layoutId="skills_tree_left"
              transition={{
                type: "spring",
                stiffness: 40,
                mass: 2,
                damping: 14,
              }}
              margin="0 -100px 0 0"
              scale={0.85}
              iconV={skillsIconV}
            />
            <TreeIcon
              zIndex={3}
              transition={{
                type: "spring",
                stiffness: 50,
                mass: 1.9,
                damping: 14,
              }}
              iconV={skillsIconV}
            />
            <TreeIcon
              zIndex={2}
              colors={{
                trunk: theme.primary_light,
                foliage: theme.primary_verydark,
              }}
              layoutId="skills_tree_right"
              transition={{
                type: "spring",
                stiffness: 60,
                mass: 1.8,
                damping: 14,
              }}
              margin="0 0 0 -100px"
              scale={0.75}
              iconV={skillsIconV}
            />
            <TreeShadow
              initial="hidden"
              animate="visible"
              variants={treeShadowV}
              layout
              style={{ backgroundColor: theme.primary_slightlydark }}
            />
          </Trees>
        </Content>
      </MotionConfig>
    </Container>
  );
}

Skills.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const skills = (await getSkillList("skill-scroller")) || [];
  return {
    props: { skills },
    revalidate: 20000,
  };
}

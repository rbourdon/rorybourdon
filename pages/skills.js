import Layout from "@/components/layout";
import SkillBubble from "@/components/SkillBubble";
import styled, { ThemeContext } from "styled-components";

import { motion } from "framer-motion";
import React, { useContext } from "react";
import { getAllSkillsTitles } from "@/lib/graphcms";
import NavBar from "@/components/NavBar";
import NavLink from "@/components//NavLink";
import SkillsIcon from "@/components/SkillsIcon";
import Underline from "@/components/Underline";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - (150px + 5vh));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bubbles = styled(motion.div)`
  width: 70%;
  flex-wrap: wrap;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled(motion.div)`
  width: 20px;
  height: 40px;
  justify-content: space-between;
  align-items: end;
`;

const Icon = styled(motion.div)`
  width: 400px;
  max-content;
  display: flex;
  align-items: center;
`;

const Label = styled(motion.div)`
  width: 100px;
  font-size: 1.35rem;
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const bubbleV = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const skillsIconV = {
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

export default function Skills({ skills }) {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <NavBar logoComplete={true}>
        <NavLink href="/">Projects</NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <Container initial="hidden" animate="visible">
        <Icon>
          <SkillsIcon iconV={skillsIconV} />
        </Icon>
        <Label>
          Skills
          <Underline
            width={50}
            sWidth={1.2}
            color1={theme.blue.get()}
            color2={theme.teal.get()}
          />
        </Label>
        <Bubbles>
          {skills.map((skill) => {
            return (
              <React.Fragment key={`${skill.title}_fragment`}>
                <SkillBubble
                  title={skill.title}
                  key={skill.title}
                  bubbleV={bubbleV}
                  transition={{
                    type: "spring",
                    stiffness: 50,
                  }}
                >
                  {skill.title}
                </SkillBubble>
                <Spacer key={`${skill.title}_spacer`} />
              </React.Fragment>
            );
          })}
        </Bubbles>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const skills = (await getAllSkillsTitles()) || [];
  return {
    props: { skills },
    revalidate: 20000,
  };
}

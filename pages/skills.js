import Layout from "@/components/layout";
import styled, { ThemeContext } from "styled-components";
import NavCard from "@/components/NavCard";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import { getSkillList } from "@/lib/graphcms";
import NavBar from "@/components/NavBar";
import NavLink from "@/components//NavLink";
import SkillsIcon from "@/components/SkillsIcon";
import SkillScroller from "@/components/SkillScroller";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - 150px);
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: minmax(710px, 50%) 1fr;
  padding: 60px 10vw;
  grid-auto-flow: dense;
  justify-items: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 555px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const SkillsColumn = styled(motion.div)`
  width: max-content;
  height: max-content;
  max-height: 70vh;
  align-items: end;
  justify-items: center;
  justify-self: center;
  grid-row: span 2;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10px 1fr 10px;
  row-gap: 15px;
`;
const SkillScrollerContainer = styled(motion.div)`
  width: max-content;
  height: max-content;
  max-height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Icon = styled(motion.div)`
  width: 900px;
  display: flex;
  right: -350px;
  top: 5px;
  position: absolute;

  @media (max-width: 555px) {
    right: -350px;
    width: 700px;
  }
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  position: relative;
  padding: 40px 40px;
  z-index: 3;
`;

const Banner = styled(motion.div)`
  width: max-content;
  max-width: 100%;
  font-size: 3.35rem;
  font-weight: 600;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-self: start;
`;

const Detail = styled(motion.p)`
  width: max-content;
  max-width: 100%;
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Arrow = styled(motion.div)`
  width: 7px;
  height: 7px;
  background-color: black;
`;

const skillsIconV = {
  hidden: {
    pathLength: 1,
  },
  visible: {
    pathLength: 4,
    transition: {
      duration: 2,
    },
  },
};

export default function Skills({ skills }) {
  const theme = useContext(ThemeContext);

  return (
    <Layout title={"Skills - Rory Bourdon | Web Developer & Visual Artist"}>
      <NavBar logoComplete={true}>
        <NavLink href="/">Projects</NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <MotionConfig
        transition={{ type: "spring", stiffness: 60, mass: 2, damping: 10 }}
      >
        <Container initial="hidden" animate="visible">
          <Banner
            layoutId={"skillsCard_label"}
            transition={{
              type: "spring",
              stiffness: 60,
              mass: 2,
              damping: 10,
            }}
          >
            Skills
            <Detail>
              These are some of the skills I’ve picked up over the years. I hope
              this list never stops growing.
            </Detail>
          </Banner>
          <Icon layoutId={"skillsCard_icon"}>
            <SkillsIcon iconV={skillsIconV} />
          </Icon>
          <SkillsColumn>
            <Arrow />
            <SkillScrollerContainer>
              <SkillScroller skills={skills} />
            </SkillScrollerContainer>
            <Arrow />
          </SkillsColumn>
          <motion.div>
            <NavCard
              height={250}
              width={470}
              color1={theme.blue}
              color2={theme.teal}
              effectOffset={{ x: -50, y: 50 }}
              effectRadius={225}
              effectRotation={80}
              id="skills"
              delay={0}
              faceBands={[6, 2, 4]}
              tagline="I have a wide variety of skills and love to learn"
              bgColor={theme.primary}
              gradientRotation={90}
            >
              <CardContent></CardContent>
            </NavCard>
          </motion.div>
        </Container>
      </MotionConfig>
    </Layout>
  );
}

export async function getStaticProps() {
  const skills = (await getSkillList("skill-scroller")) || [];
  return {
    props: { skills },
    revalidate: 20000,
  };
}

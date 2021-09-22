import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import NavCard from "@/components/NavCard";
import SkillsCard from "@/components/SkillsCard";
import ProjectsCard from "@/components/ProjectsCard";
import styled, { ThemeContext } from "styled-components";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Banner from "@/components/Banner";
import { getAllSkillsTitles } from "@/lib/graphcms";
import NavBar from "@/components/NavBar";
import NavLink from "@/components//NavLink";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - (150px + 5vh));
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const IntroLogo = styled(motion.div)`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 175px);
  left: calc(50% - 175px);
`;

const HeroBanner = styled(motion.div)`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled(motion.div)`
  max-width: min(100%, 400px);
  flex-wrap: wrap;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const HeroBody = styled(motion.div)`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: end;
  margin-top: 1vh;
`;

const HeroSection = styled(motion.div)`
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 18vw;
`;

const Skills = styled(motion.div)`
  width: 100%;
  min-height: 50vh;
  padding: 150px 18vw;
  height: max(710px, 100vh);
  display: flex;
  justify-content: start;
`;

const CardContent = styled(motion.div)`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 30%;
  justify-items: center;
  align-items: center;
  position: relative;
`;

const buttonsV = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.75,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    transition: { duration: 0 },
  },
};

const welcomeCardV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 200 * 275 * 0.0000012 + 1.65 },
  },
  exit: {
    opacity: 0,
    transition: { delay: 0, duration: 0 },
  },
};

export default function Home({ skills }) {
  const [selected, setSelected] = useState(false);
  const [logoComplete, setLogoComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const theme = useContext(ThemeContext);

  const clickHandler = (selection) => () => {
    setSelected(selection);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    //setIntroComplete(true);
  }, []);
  return (
    <Layout>
      <NavBar logoComplete={logoComplete} setIntroComplete={setIntroComplete}>
        <NavLink href="/">Projects</NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <Container>
        {!introComplete && (
          <IntroLogo initial="hidden" animate="visible" layoutId="logo">
            <Logo onAnimationComplete={setLogoComplete} intro />
          </IntroLogo>
        )}
        {introComplete && (
          <>
            <HeroSection
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ opacity: selected ? 0 : 1 }}
            >
              <HeroBanner>
                <Banner />
                <Buttons variants={buttonsV}>
                  <Button
                    color1={theme.blue.get()}
                    color2={theme.purple.get()}
                    href="/"
                    id="learnMoreButton"
                    delay={1}
                  >
                    Learn More
                  </Button>
                  <Button
                    color1={theme.blue.get()}
                    color2={theme.teal.get()}
                    href="/"
                    id="contactButton"
                    delay={1.5}
                  >
                    Contact Me
                  </Button>
                </Buttons>
              </HeroBanner>
              <HeroBody>
                <NavCard
                  height={200}
                  width={275}
                  stemDir="h"
                  stemLoc={1}
                  stemSide="l"
                  color1={theme.blue.get()}
                  color2={theme.purple.get()}
                  effectOffset={{ x: 90, y: 30 }}
                  effectRadius={165}
                  id={"welcome"}
                  selected={selected}
                >
                  <CardContent variants={welcomeCardV}>
                    <p>Hello</p>
                  </CardContent>
                </NavCard>
              </HeroBody>
            </HeroSection>
            )
            <Skills layout>
              <SkillsCard skills={skills} selected={selected}>
                <Button
                  width={150}
                  height={50}
                  color1={theme.blue.get()}
                  color2={theme.teal.get()}
                  href="/skills"
                  onClick={clickHandler}
                  id="skills"
                  delay={710 * 230 * 0.0000012 + 2.15}
                >
                  All Skills
                </Button>
              </SkillsCard>
            </Skills>
            <Skills>
              <ProjectsCard selected={selected} />
            </Skills>
          </>
        )}
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

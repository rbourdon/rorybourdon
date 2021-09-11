import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import NavCard from "@/components/NavCard";
import SkillsCard from "@/components/SkillsCard";
import styled, { ThemeContext } from "styled-components";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Banner from "@/components/Banner";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - (150px + 5vh));
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IntroLogo = styled(motion.div)`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
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
  margin-top: 8vh;
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
  height: max-content;
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
};

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const theme = useContext(ThemeContext);
  return (
    <Layout introComplete={introComplete}>
      <Container initial="hidden" animate="visible">
        {!introComplete && (
          <IntroLogo layoutId="logo">
            <Logo onAnimationComplete={() => setIntroComplete(true)} intro />
          </IntroLogo>
        )}
        {introComplete ? (
          <>
            <HeroSection initial="hidden" animate="visible">
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
                  color1={theme.blue.get()}
                  color2={theme.purple.get()}
                  effectLocation={{ x: 0.5, y: 0.8 }}
                  id={"welcomeCard"}
                >
                  <CardContent>
                    <p>Hello</p>
                  </CardContent>
                </NavCard>
              </HeroBody>
            </HeroSection>
            <Skills>
              <SkillsCard />
            </Skills>
          </>
        ) : null}
      </Container>
    </Layout>
  );
}

import NavCard from "@/components/CardComponents/NavCard";
import SkillsCard from "@/components/SkillsCard/Index";
import ProjectsCard from "@/components/ProjectsCard/Index";
import styled, { ThemeContext } from "styled-components";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useContext } from "react";
import Banner from "@/components/Banner";
import { getAllSkills } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import NavLink from "@/components/Nav/NavLink";
import Head from "next/head";

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  min-height: calc(100vh - (150px + 5vh));
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const HeroBanner = styled(motion.article)`
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

const HeroSection = styled(motion.section)`
  width: 100%;
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 18vw 5vh 18vw;
`;

const SkillsSection = styled(motion.section)`
  width: 100%;
  height: 130vh;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProjectsSection = styled(motion.section)`
  width: 100%;
  min-height: 50vh;
  padding: 300px 5vw;
  height: max-content;
  display: flex;
  justify-content: center;
  z-index: 1;
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

const welcomeCardV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 200 * 275 * 0.0000012 + 1.65 },
  },
};

export default function Home({ skills }) {
  const theme = useContext(ThemeContext);

  return (
    <Container
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ backgroundColor: theme.primary }}
    >
      <Head>
        <title>Rory Bourdon | Web Developer & Visual Artist</title>
        <meta name="description" content="Portfolio of Rory Bourdon" />
        <meta
          name="og:title"
          content="Rory Bourdon | Web Developer & Visual Artist"
        />
        <meta name="og:description" content="Portfolio of Rory Bourdon" />
      </Head>
      <NavBar>
        <NavLink href="/skills">Skills</NavLink>
        <NavLink href="/">Projects</NavLink>
        <NavLink href="/">Resume</NavLink>
      </NavBar>
      <Content>
        <HeroSection>
          <HeroBanner>
            <Banner />
            <Buttons variants={buttonsV}>
              <Button
                color1={theme.blue.get()}
                color2={theme.purple.get()}
                href="/"
                id="learnMoreButton"
                animationDelay={1}
              >
                Learn More
              </Button>
              <Button
                color1={theme.blue.get()}
                color2={theme.teal.get()}
                href="/"
                id="contactButton"
                animationDelay={1.33}
              >
                Contact Me
              </Button>
            </Buttons>
          </HeroBanner>
          <HeroBody>
            <NavCard
              height={200}
              width={275}
              color1={theme.blue.get()}
              color2={theme.purple.get()}
              effectOffset={{ x: 90, y: 30 }}
              effectRadius={165}
              id={"welcome"}
              selected={false}
            >
              <CardContent variants={welcomeCardV}>
                <p>Hello</p>
              </CardContent>
            </NavCard>
          </HeroBody>
        </HeroSection>
        <SkillsSection style={{ backgroundColor: theme.primary_light }}>
          <SkillsCard skills={skills} />
        </SkillsSection>
        <ProjectsSection>
          <ProjectsCard />
        </ProjectsSection>
      </Content>
    </Container>
  );
}

// Home.getLayout = function getLayout(page) {
//   return (
//     <Container
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       variants={containerV}
//     >
//       <NavBar>
//         <NavLink href="/skills">Skills</NavLink>
//         <NavLink href="/">Projects</NavLink>
//         <NavLink href="/">Resume</NavLink>
//       </NavBar>
//       {page}
//     </Container>
//   );
// };

export async function getStaticProps() {
  const skills = (await getAllSkills()) || [];
  return {
    props: { skills },
    revalidate: 20000,
  };
}

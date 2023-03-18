import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";
import Banner from "@/components/Banner";
import { getAllSkills, getAllProjects } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const SkillsCard = dynamic(() =>
  import("@/components/Skills/SkillsCard/SkillsCard")
);

const ProjectsCard = dynamic(() =>
  import("@/components/Projects/ProjectsCard/ProjectsCard")
);

const SocialsCard = dynamic(() =>
  import("@/components/SocialsCard/SocialsCard")
);

const HorizonEffects = dynamic(() =>
  import("@/components/Icons/HorizonEffects")
);

const Container = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled(motion.main)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroBanner = styled(motion.header)`
  width: 100%;
  height: 25vh;
  min-height: max-content;
  display: flex;
  flex-direction: column;
`;

// const HeroBody = styled(motion.div)`
//   width: 100%;
//   height: max-content;
//   display: flex;
//   justify-content: end;
//   margin-top: 1vh;
// `;

const HeroSection = styled(motion.section)`
  width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  padding: 20vh 10vw 5vh 10vw;

  @media (max-width: 555px) {
    padding: 0 6vw 5vh 6vw;
  }
`;

const Section = styled(motion.section)`
  width: 100%;
  height: 1400px;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    height: 200vh;
  }
`;

export default function Home({ skills, projects }) {
  const theme = useContext(ThemeContext);
  const pageLinks = [
    {
      name: "Skills",
      href: "#skills",
      color: theme.teal,
      onClick: null,
    },
    {
      name: "Projects",
      href: "#projects",
      color: theme.orange,
      onClick: null,
    },
    {
      name: "Contact",
      href: "#socials",
      color: theme.green,
      onClick: null,
    },
    {
      name: "Resume",
      href: "/Rory_Bourdon_Resume_2021.pdf",
      color: theme.primary_slightlydark,
      onClick: null,
    },
  ];
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
      <NavBar links={pageLinks} />
      <HorizonEffects
        lines={[
          { slope: -19, yLoc: 35 },
          { slope: -90, yLoc: 130 },
        ]}
        circles={[{ cx: "100%", cy: "10%", r: 0.2 }]}
      />
      <Content>
        <HeroSection>
          <HeroBanner>
            <Banner />
          </HeroBanner>
          {/* <HeroBody /> */}
        </HeroSection>
        <Section style={{ backgroundColor: theme.primary_light }}>
          <SkillsCard skills={skills} />
        </Section>
        <Section>
          <ProjectsCard
            projects={projects}
            style={{ backgroundColor: theme.primary }}
          />
        </Section>
        <Section style={{ backgroundColor: theme.primary_light }}>
          <SocialsCard />
        </Section>
      </Content>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const skills = (await getAllSkills()) || [];
  const projects = (await getAllProjects()) || [];
  return {
    props: { skills, projects },
  };
}

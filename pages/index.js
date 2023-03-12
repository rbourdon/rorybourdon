import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Banner from "@/components/Banner";
import { getAllSkills, getAllProjects } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import GridGuide from "@/components/GridGuide";
import { useInView } from "react-intersection-observer";
import useGuide from "@/components/utils/useGuide";

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

const HeroBody = styled(motion.div)`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`;

const HeroSection = styled(motion.section)`
  width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  padding: 20vh 10vw 5vh 10vw;
  position: relative;

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
  // const { width } = useWindowSize();
  // const mousePosX = useMotionValue();
  // const mousePosY = useMotionValue();
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.5 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.5 });
  const [socialsRef, socialsInView] = useInView({ threshold: 0.5 });
  const [activeGuide, setActiveGuide] = useState({
    type: "hero",
    pose: "defaultPose",
  });
  useEffect(() => {
    if (heroInView) {
      activeGuide.type !== "hero" && setActiveGuide({ type: "hero" });
    } else if (skillsInView) {
      activeGuide.type !== "skills" && setActiveGuide({ type: "skills" });
    } else if (projectsInView) {
      activeGuide.type !== "projects" && setActiveGuide({ type: "projects" });
    } else if (socialsInView) {
      activeGuide.type !== "socials" && setActiveGuide({ type: "socials" });
    }
  }, [activeGuide, heroInView, projectsInView, skillsInView, socialsInView]);

  const { guideDispatch, guideState, x, y, rotate } = useGuide();

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
      // onMouseMove={(e) => {
      //   mousePosX.set(e.pageX);
      //   mousePosY.set(e.pageY);
      // }}
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
          <HeroBody ref={heroRef}>
            {activeGuide.type === "hero" && (
              <GridGuide
                guideDispatch={guideDispatch}
                guideState={guideState}
                x={x}
                y={y}
                rotate={rotate}
                hoverPose="expandPose"
                clickPose="arrowPose"
                defaultPose="neutralPose"
                defaultBehavior="wander"
                hoverBehavior="spin"
              />
            )}
          </HeroBody>
        </HeroSection>
        <Section
          ref={skillsRef}
          style={{ backgroundColor: theme.primary_light }}
        >
          <SkillsCard skills={skills}>
            {activeGuide.type === "skills" && (
              <GridGuide
                guideDispatch={guideDispatch}
                guideState={guideState}
                x={x}
                y={y}
                rotate={rotate}
                hoverPose="expandPose"
                clickPose="arrowPose"
                defaultPose="treePose"
                defaultBehavior="tree"
                clickBehavior="point"
              />
            )}
          </SkillsCard>
        </Section>
        <Section ref={projectsRef}>
          <ProjectsCard
            projects={projects}
            style={{ backgroundColor: theme.primary }}
          >
            {activeGuide.type === "projects" && (
              <GridGuide
                guideDispatch={guideDispatch}
                guideState={guideState}
                x={x}
                y={y}
                rotate={rotate}
                hoverPose="expandPose"
                clickPose="arrowPose"
                defaultPose="gearPose"
              />
            )}
          </ProjectsCard>
        </Section>
        <Section
          ref={socialsRef}
          style={{ backgroundColor: theme.primary_light }}
        >
          <SocialsCard>
            {activeGuide.type === "socials" && (
              <GridGuide
                guideDispatch={guideDispatch}
                guideState={guideState}
                x={x}
                y={y}
                rotate={rotate}
                hoverPose="expandPose"
                clickPose="neutralPose"
                defaultPose="neutralPose"
                clickBehavior="wander"
              />
            )}
          </SocialsCard>
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

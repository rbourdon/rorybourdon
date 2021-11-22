import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  MotionConfig,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import { useContext, useState } from "react";
import ProjectSummary from "@/components/Projects/ProjectSummary/ProjectSummary";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import ProjectsSceneIcon from "@/components/Icons/ProjectsSceneIcon";
import useWindowSize from "@/components/utils/useWindowSize";
import ProjectsBackgroundEffect from "@/components/Projects/ProjectsCard/ProjectsBackgroundEffect";
import CardEffect from "@/components/CardComponents/CardEffect";

const Container = styled(motion.article)`
  width: 100%;
  height: 100%;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(motion.div)`
  top: calc(50vh - 358px / 2);
  zindex: 1;
  scroll-margin-top: ${(props) => props.$scrollMargin};
  scroll-snap-margin: ${(props) => props.$scrollMargin};
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 43% 54%;
  column-gap: 3%;
  grid-template-rows: max-content 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 25px 30px;
  z-index: 3;

  @media (max-width: 757px) {
    grid-template-columns: 100%;
    grid-template-rows: 23% 23% 1fr 12%;
    row-gap: 3%;
    align-content: center;
    padding: 30px 25px;
  }
`;

const CardWindow = styled(motion.div)`
  width: 95%;
  max-width: 100%;
  height: 90%;
  max-height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 30% 70%;
  grid-row: span 2;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;

const Label = styled(motion.p)`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 100;
  width: max-content;
  height: max-content;
`;

const ProjectsBox = styled(motion.div)`
  width: 100%;
  height: max-content;
  font-size: 1.35rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ProjectsScene = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const projectsCardV = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 358 * 697 * 0.0000012 + 2.05,
      duration: 0.4,
    },
  },
  selected: {
    opacity: 1,
  },
};

const projectSummariesV = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 358 * 697 * 0.0000012 + 1.85,
      duration: 0.5,
    },
  },
  selected: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const containerV = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 1.35,
    },
  },
};

const outlineV = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ProjectsCard({ projects }) {
  const theme = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const { width, height } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const backing = useMotionValue(0);
  const backingColor = useTransform(
    [theme.primary, theme.primary_light, backing],
    ([latestPrimary, latestPrimaryLight, latestBacking]) =>
      transform(latestBacking, [0, 1], [latestPrimary, latestPrimaryLight])
  );

  const clickHandler = () => {
    setSelected(true);
    animate(backing, 1, { transition: { duration: 1 } });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 800);
  };

  const cardEffects = width
    ? [
        { x: width * 0.05, y: height * 0.32, scale: 0.8 },
        { x: width * 0.3, y: height * 0.41, scale: 0.6 },
        { x: width * 0.4, y: height * 0.2, scale: 0.7 },
        { x: width * 0.85, y: height * 0.25, scale: 0.9 },
        { x: width * 0.24, y: height * 0.8, scale: 0.5 },
        { x: width * 0.6, y: height * 0.9, scale: 1 },
        { x: width * 0.03, y: height * 0.9, scale: 0.8 },
        { x: width * 0.8, y: height * 0.8, scale: 0.4 },
        { x: width * 0.2, y: height * 0.05, scale: 0.35 },
        { x: width * 0.65, y: height * 0.1, scale: 0.45 },
      ]
    : [];

  return (
    <MotionConfig
      transition={
        !layoutComplete
          ? { type: "spring", stiffness: 100, mass: 1, damping: 14 }
          : {
              duration: 0,
            }
      }
    >
      <Container
        initial="hidden"
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        exit="exit"
      >
        {selected && <Backing style={{ backgroundColor: backingColor }} />}
        <CardEffect position={selected ? "fixed" : "absolute"}>
          {cardEffects.map((effect, i) => {
            return (
              <ProjectsBackgroundEffect
                inView={inView}
                key={effect.x + effect.y + effect.scale}
                style={{ delay: i * 0.055 + 1, ...effect }}
              />
            );
          })}
        </CardEffect>
        <Card
          id="projects"
          $scrollMargin={"calc(50vh - " + (width < 757 ? 697 : 358) / 2 + "px)"}
          variants={containerV}
          style={{
            top: "calc(50vh - " + (width < 757 ? 697 : 358) / 2 + "px)",
            position: selected ? "fixed" : "static",
            zIndex: selected ? 4 : 1,
          }}
          onLayoutAnimationComplete={() =>
            setLayoutComplete(selected ? true : false)
          }
        >
          <NavCard
            height={width < 757 ? 697 : 358}
            width={width < 757 ? 358 : 697}
            stemDir="h"
            stemLoc={7}
            stemLength={375}
            color1={theme.orange}
            color2={theme.orange}
            id="projects"
            delay={0.5}
            tagline="I enjoy building and experimenting"
            intersectionRef={ref}
            stem
          >
            <CardContent variants={projectsCardV}>
              <CardWindow
                layoutId="projectCard_window"
                style={{
                  backgroundColor: theme.primary,
                  zIndex: selected ? 4 : 1,
                }}
              >
                <Label layoutId="projectCard_label">Projects</Label>
                <ProjectsScene layout>
                  <ProjectsSceneIcon scale={2.6} />
                </ProjectsScene>
              </CardWindow>
              <ProjectsBox variants={projectSummariesV}>
                {inView && (
                  <ProjectSummary
                    id={"projectsCard_summary"}
                    project={projects[0]}
                    bgColor={theme.primary}
                    primaryColor={theme.primary_verydark}
                    outline={false}
                    onHover={null}
                    outlineV={outlineV}
                    defaultBGColor={theme.primary_light}
                    delay={358 * 697 * 0.0000012 + 2.4}
                    intro
                  />
                )}
              </ProjectsBox>
              <Button
                width={150}
                height={50}
                color1={theme.orange}
                href="/projects"
                id="projects"
                animationDelay={358 * 697 * 0.0000012 + 1.85}
                onClick={clickHandler}
              >
                All Projects
              </Button>
            </CardContent>
          </NavCard>
        </Card>
      </Container>
    </MotionConfig>
  );
}

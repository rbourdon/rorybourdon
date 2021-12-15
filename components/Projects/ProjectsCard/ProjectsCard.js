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
import Button from "@/components/Nav/Button";
import ProjectsSceneIcon from "@/components/Icons/ProjectsSceneIcon";
import useWindowSize from "@/components/utils/useWindowSize";
import ProjectsBackgroundEffect from "@/components/Projects/ProjectsCard/ProjectsBackgroundEffect";
import CardEffect from "@/components/CardComponents/CardEffect";

const Container = styled(motion.article)`
  width: 100%;
  height: max-content;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(motion.div)`
  top: calc(50vh - 358px / 2);
  scroll-margin-top: ${(props) => props.$scrollMargin};
  scroll-snap-margin: ${(props) => props.$scrollMargin};
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 25px 30px;

  @media (max-width: 757px) {
    align-content: center;
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
  grid-template-rows: 60px 1fr;
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
  user-select: none;
`;

const ProjectsBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`;

const ProjectsScene = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const WIDTH = 710;
const HEIGHT = 358;
const STEMLENGTH = 375;
const TAGLINESIZE = 350;

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
      delay: HEIGHT * WIDTH * 0.0000012 + 2,
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
      delay: HEIGHT * WIDTH * 0.0000012 + 1.85,
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
      duration: 1.45,
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

export default function ProjectsCard({
  projects,
  sectionHeight = 1400,
  children,
}) {
  const theme = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const { width } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const portrait = width * 0.95 < WIDTH + STEMLENGTH + TAGLINESIZE;
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

  const cardEffects =
    width && !portrait
      ? [
          { x: width * 0.05, y: sectionHeight * 0.22, scale: 0.8 },
          { x: width * 0.3, y: sectionHeight * 0.31, scale: 0.6 },
          { x: width * 0.4, y: sectionHeight * 0.1, scale: 0.7 },
          { x: width * 0.85, y: sectionHeight * 0.15, scale: 0.9 },
          { x: width * 0.24, y: sectionHeight * 0.7, scale: 0.5 },
          { x: width * 0.6, y: sectionHeight * 0.8, scale: 1 },
          { x: width * 0.03, y: sectionHeight * 0.8, scale: 0.8 },
          { x: width * 0.8, y: sectionHeight * 0.7, scale: 0.4 },
          { x: width * 0.2, y: sectionHeight * 0, scale: 0.35 },
          { x: width * 0.65, y: sectionHeight * 0.05, scale: 0.45 },
        ]
      : width
      ? [
          { x: width * 0.4, y: sectionHeight * 0.08, scale: 0.7 },
          { x: width * 0.85, y: sectionHeight * 0.35, scale: 0.9 },
          { x: width * -0.1, y: sectionHeight * 0.25, scale: 0.9 },
          { x: width * 0.6, y: sectionHeight * 0.85, scale: 1 },
          { x: width * 0.03, y: sectionHeight * 1, scale: 0.8 },
          { x: width * 0.5, y: sectionHeight * 1, scale: 0.4 },
          { x: width * 0.2, y: sectionHeight * 0, scale: 0.75 },
          { x: width * 0.65, y: sectionHeight * 0.05, scale: 0.45 },
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
        <CardEffect position={selected ? "fixed" : "absolute"} delay={1.85}>
          {cardEffects.map((effect, i) => {
            return (
              <ProjectsBackgroundEffect
                inView={inView}
                key={`projectEffect_${effect.x}_${effect.y}_${effect.scale}`}
                effectStyle={{ delay: i * 0.035 + 1.8, ...effect }}
              />
            );
          })}
        </CardEffect>
        <Card
          id="projects"
          $scrollMargin={
            "calc(50vh - " +
            (portrait ? WIDTH + STEMLENGTH * 0.15 : HEIGHT) / 2 +
            "px)"
          }
          variants={containerV}
          style={{
            top:
              "calc(50vh - " +
              (portrait ? WIDTH + STEMLENGTH + 125 : HEIGHT) / 2 +
              "px)",
            position: selected ? "fixed" : "static",
            zIndex: selected ? 40 : 35,
          }}
          onLayoutAnimationComplete={() =>
            setLayoutComplete(selected ? true : false)
          }
        >
          <NavCard
            height={portrait ? WIDTH : HEIGHT}
            width={portrait ? HEIGHT : WIDTH}
            stemDir={portrait ? "v" : "h"}
            stemLoc={portrait ? 1 : 7}
            stemLength={portrait ? STEMLENGTH * 0.65 : STEMLENGTH}
            color1={theme.orange}
            color2={theme.orange}
            id="projects"
            delay={0.5}
            tagline="I enjoy building and experimenting"
            intersectionRef={ref}
            stem
          >
            <CardContent
              style={{
                gridTemplateColumns: portrait ? "100%" : "43% 54%",
                gridTemplateRows: portrait
                  ? "21% 21% 1fr 12%"
                  : "max-content 1fr",
                rowGap: portrait ? "3%" : "0%",
                columnGap: portrait ? "0%" : "3%",
                padding: portrait ? "30px 25px" : "25px 30px",
              }}
              variants={projectsCardV}
            >
              <CardWindow
                layoutId="projectCard_window"
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <Label layoutId="projectCard_label">Projects</Label>
                <ProjectsScene layout>
                  <ProjectsSceneIcon scale={2.6} />
                </ProjectsScene>
              </CardWindow>
              <ProjectsBox layout variants={projectSummariesV}>
                <p>Featured Project</p>
                {inView && width > 220 && (
                  <ProjectSummary
                    id={"projectsCard"}
                    project={projects[0]}
                    bgColor={theme.primary}
                    primaryColor={theme.primary_verydark}
                    outline={false}
                    active={false}
                    scrollerPos={0}
                    onHover={null}
                    outlineV={outlineV}
                    defaultBGColor={theme.primary_light}
                    delay={WIDTH * HEIGHT * 0.0000012 + 2.4}
                    intro
                    drag={false}
                  />
                )}
              </ProjectsBox>
              <Button
                width={150}
                height={50}
                color1={theme.orange}
                href="/projects"
                id="projects"
                animationDelay={WIDTH * HEIGHT * 0.0000012 + 2.1}
                onClick={clickHandler}
              >
                All Projects
              </Button>
            </CardContent>
          </NavCard>
        </Card>
        {children}
      </Container>
    </MotionConfig>
  );
}

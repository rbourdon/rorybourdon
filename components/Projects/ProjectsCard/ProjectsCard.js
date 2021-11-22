import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import { useContext, useState } from "react";
import ProjectSummary from "@/components/Projects/ProjectSummary/ProjectSummary";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import ProjectsSceneIcon from "@/components/Icons/ProjectsSceneIcon";
import useWindowSize from "@/components/utils/useWindowSize";

const Container = styled(motion.article)`
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
  z-index: 2;
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
      duration: 1.3,
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
  const { width = 1920 } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: 0.66,
  });

  const clickHandler = () => {
    setSelected(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 1);
  };

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
      {selected && <Backing style={{ backgroundColor: theme.primary_light }} />}
      <Container
        id="projects"
        initial="hidden"
        $scrollMargin={"calc(50vh - " + (width < 757 ? 697 : 358) / 2 + "px)"}
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        exit="exit"
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
              <ProjectSummary
                id={projects[0].slug}
                project={projects[0]}
                bgColor={theme.primary}
                primaryColor={theme.primary_verydark}
                outline={false}
                onHover={null}
                outlineV={outlineV}
                defaultBGColor={theme.primary_light}
                delay={358 * 697 * 0.0000012 + 2.85}
              />
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
      </Container>
    </MotionConfig>
  );
}

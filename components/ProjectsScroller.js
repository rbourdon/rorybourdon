import styled, { ThemeContext } from "styled-components";
import { LayoutGroup, motion, useMotionValue } from "framer-motion";
import { useContext, useState } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ProjectSummary from "./ProjectsCard/ProjectSummary";

const Projects = styled(motion.div)`
  width: 100%;
  max-width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0;
  justify-self: center;
`;

const Summaries = styled(motion.ul)`
  width: max-content;
  height: 100%;
  align-content: center;
  justify-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 300px;
  grid-template-columns: 360px 360px 360px;
  column-gap: 55px;
  padding: 0 40px;
  margin: 0;
  cursor: grab;
  grid-auto-rows: 320px;
`;

const Arrow = styled(motion.button)`
  width: 13px;
  height: 13px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0;
`;

const summariesV = {
  visible: {
    transition: {
      delayChildren: 0.75,
      staggerChildren: 0.15,
    },
  },
  panning: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const titleV = {
  hidden: {
    x: 120,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.25,
      damping: 10,
    },
  },
  panning: {
    x: [0, 120, 0],
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.25,
      damping: 10,
    },
  },
};

const descV = {
  hidden: {
    x: 120,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.25,
      damping: 10,
    },
  },
  panning: {
    x: [0, 120, 0],
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 0.25,
      damping: 10,
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

export default function ProjectScroller({ projects, bgColor, primaryColor }) {
  const theme = useContext(ThemeContext);
  const [hovering, setHovering] = useState(false);
  const [rollerPos, setRollerPos] = useState(0);
  const panPos = useMotionValue(0);
  const [panning, setPanning] = useState(false);

  const handlePan = (e, pointInfo) => {
    panPos.set(panPos.get() + pointInfo.delta.x);

    if (Math.abs(panPos.get()) >= 300) {
      setRollerPos((prev) =>
        prev - Math.sign(panPos.get()) < 0
          ? projects.length - 1
          : prev - Math.sign(panPos.get()) > projects.length - 1
          ? 0
          : prev - Math.sign(panPos.get())
      );
      panPos.set(0);
    }
  };

  const handleClick = (dir) => {
    setRollerPos((prev) =>
      prev + dir < 0
        ? projects.length - 1
        : prev + dir > projects.length - 1
        ? 0
        : prev + dir
    );
  };

  return (
    <LayoutGroup>
      <Projects>
        <Arrow
          onClick={() => handleClick(1)}
          layout
          style={{ rotate: 270, color: theme.primary_dark }}
        >
          <ArrowIcon />
        </Arrow>
        <Summaries
          onPanStart={() => setPanning(true)}
          onPan={handlePan}
          onPanEnd={() => {
            panPos.set(0);
            setPanning(false);
          }}
        >
          {[
            ...projects.slice(rollerPos, rollerPos + 3),
            ...projects.slice(
              0,
              3 - projects.slice(rollerPos, rollerPos + 3).length
            ),
          ].map((project) => {
            return (
              <ProjectSummary
                key={project.slug}
                id={project.slug}
                project={project}
                bgColor={bgColor}
                primaryColor={primaryColor}
                outline={hovering === project.title}
                active={!panning}
                onHover={setHovering}
                titleV={titleV}
                descV={descV}
                outlineV={outlineV}
                defaultBGColor={theme.primary}
                delay={1.1}
                variants={summariesV}
              />
            );
          })}
        </Summaries>
        <Arrow
          layout
          style={{ rotate: 90, color: theme.primary_dark }}
          onClick={() => handleClick(-1)}
        >
          <ArrowIcon />
        </Arrow>
      </Projects>
    </LayoutGroup>
  );
}

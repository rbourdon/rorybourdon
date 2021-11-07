import styled, { ThemeContext } from "styled-components";
import { LayoutGroup, motion, useMotionValue } from "framer-motion";
import { useContext, useState } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ProjectSummary from "./ProjectSummary/Index";
import useWindowSize from "../utils/useWindowSize";

const Projects = styled(motion.div)`
  width: 100%;
  max-width: 100%;
  height: max-content;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0;
  padding: 20px 0;
  justify-self: center;
  user-select: none;

  @media (max-width: 555px) {
    padding: 0;
  }
`;

const Summaries = styled(motion.ul)`
  width: max-content;
  height: max-content;
  align-content: center;
  justify-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 290px;
  grid-template-columns: 360px 360px 360px;
  column-gap: 55px;
  padding: 0 40px;
  margin: 0;
  cursor: grab;
  grid-auto-rows: 320px;
  user-select: none;
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
  const size = useWindowSize();

  const incrementRollerPos = (dir) => {
    setRollerPos((prev) =>
      prev + dir < 0
        ? projects.length - 1
        : prev + dir > projects.length - 1
        ? 0
        : prev + dir
    );
  };

  const handlePan = (e, pointInfo) => {
    panPos.set(panPos.get() + pointInfo.delta.x);
    if (Math.abs(panPos.get()) >= 300) {
      incrementRollerPos(Math.sign(panPos.get() * -1));
      panPos.set(Math.sign(panPos.get()) * -100);
    }
  };

  const handlePanEnd = (e, pointInfo) => {
    if (pointInfo.velocity.x < -400 || pointInfo.velocity.x > 400) {
      incrementRollerPos(Math.sign(pointInfo.velocity.x * -1));
    }
    panPos.set(0);
    setPanning(false);
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
        {size.width > 555 && (
          <Arrow
            onClick={() => handleClick(1)}
            layout
            style={{ rotate: 270, color: theme.primary_dark }}
          >
            <ArrowIcon />
          </Arrow>
        )}
        <Summaries
          onPanStart={() => setPanning(true)}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          style={{ cursor: panning ? "grabbing" : "grab" }}
        >
          {[
            ...projects.slice(rollerPos, rollerPos + 3),
            ...projects.slice(
              0,
              3 - projects.slice(rollerPos, rollerPos + 3).length
            ),
          ].map((project, index) => {
            return (
              <ProjectSummary
                key={project.slug}
                id={project.slug}
                project={project}
                bgColor={bgColor}
                primaryColor={primaryColor}
                outline={
                  hovering === project.slug || (size.width < 555 && index === 1)
                }
                active={!panning}
                onHover={setHovering}
                outlineV={outlineV}
                defaultBGColor={theme.primary}
                delay={1.1}
                scrollerPos={index}
              />
            );
          })}
        </Summaries>
        {size.width > 555 && (
          <Arrow
            layout
            style={{ rotate: 90, color: theme.primary_dark }}
            onClick={() => handleClick(-1)}
          >
            <ArrowIcon />
          </Arrow>
        )}
      </Projects>
    </LayoutGroup>
  );
}

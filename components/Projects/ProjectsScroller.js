import styled, { ThemeContext } from "styled-components";
import { LayoutGroup, motion, useMotionValue } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import ProjectSummary from "./ProjectSummary/ProjectSummary";
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
  grid-template-rows: 245px;
  grid-template-columns: 340px 340px 340px;
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

export default function ProjectScroller({ projects, bgColor, primaryColor }) {
  const theme = useContext(ThemeContext);
  const [intro, setIntro] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [rollerPos, setRollerPos] = useState(0);
  const panPos = useMotionValue(0);
  const [panning, setPanning] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setTimeout(() => setIntro(false), 1000);
  }, []);

  useEffect(() => {
    panPos.onChange((latest) => {
      if (Math.abs(latest) >= 245) {
        setRollerPos((prev) =>
          prev + Math.sign(latest * -1) > projects.length - 1
            ? 0
            : prev + Math.sign(latest * -1) < 0
            ? projects.length - 1
            : prev + Math.sign(latest * -1)
        );
        panPos.set(Math.sign(latest) * -150);
      }
    });
  }, [panPos, projects.length]);

  const handlePan = (e, pointInfo) => {
    panPos.set(panPos.get() + pointInfo.delta.x);
  };

  const handlePanStart = () => {
    setPanning(true);
    panPos.set(0);
  };

  const handlePanEnd = (e, pointInfo) => {
    if (pointInfo.velocity.x < -500) {
      incrementRollerPos();
    } else if (pointInfo.velocity.x > 500) {
      decrementRollerPos();
    }
    panPos.set(0);
    setPanning(false);
  };

  const incrementRollerPos = () => {
    setRollerPos((prev) => (prev + 1 > projects.length - 1 ? 0 : prev + 1));
  };

  const decrementRollerPos = () => {
    setRollerPos((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <LayoutGroup>
      <Projects>
        {size.width > 555 && (
          <Arrow
            onClick={decrementRollerPos}
            layout
            style={{ rotate: 270, color: theme.primary_dark }}
          >
            <ArrowIcon />
          </Arrow>
        )}
        <Summaries
          onPanStart={handlePanStart}
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
                intro={intro}
                onHover={setHovering}
                defaultBGColor={theme.primary}
                delay={0.7 + index * 0.25}
                scrollerPos={index}
              />
            );
          })}
        </Summaries>
        {size.width > 555 && (
          <Arrow
            layout
            style={{ rotate: 90, color: theme.primary_dark }}
            onClick={incrementRollerPos}
          >
            <ArrowIcon />
          </Arrow>
        )}
      </Projects>
    </LayoutGroup>
  );
}

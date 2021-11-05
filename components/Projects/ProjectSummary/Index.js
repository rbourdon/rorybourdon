import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import SkillChip from "@/components/Projects/ProjectSummary/SkillChip";
import { useContext, useEffect } from "react";
import DetailsLink from "@/components/Projects/ProjectSummary/DetailsLink";

const Container = styled(motion.div)`
  width: 100%;
  position: relative;
  padding: 25px 30px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: max-content max-content max-content 1fr;
  align-items: start;
  justify-items: center;
  border-radius: 20px;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;
`;

const ProjectTitle = styled(motion.p)`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 400;
  user-select: none;
`;

const ProjectDescription = styled(motion.p)`
  width: 100%;
  font-size: 0.9rem;
  font-weight: 200;
  user-select: none;
`;

const SkillChips = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0 10px 0;
`;

const Outline = styled(motion.div)`
  height: 100%;
  position: absolute;
  width: 100%;
  border-radius: 20px;
  user-select: none;
  left: 0;
  top: 0;
  z-index: -1;
`;

const skillChipsV = {
  visible: {
    staggerChildren: 0.2,
  },
};

export default function ProjectSummary({
  project,
  outline = false,
  bgColor = "hsla(0,0,0,1)",
  primaryColor = "hsla(255,0,100,1)",
  onHover,
  titleV,
  descV,
  outlineV,
  delay = 0,
  id,
  active,
  variants,
  defaultBGColor = "hsla(0,0,0,0)",
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const handleHoverStart = () => {
    onHover && onHover(project.slug);
    active &&
      animate(hover, 1, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  const handleHoverEnd = () => {
    hover.get() > 0 &&
      animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
  };

  useEffect(() => {
    if (!active) {
      animate(hover, 0, { type: "tween", duration: 0.2, ease: "easeInOut" });
    }
  }, [active, hover]);

  const outlineOffset = useTransform(hover, [0, 1], ["0px", "-2px"]);

  const outlineWidth = useTransform(hover, [0, 1], ["1px", "8px"]);

  const outlineColor = useTransform(
    [theme.primary_verydark, bgColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const backgroundColor = useTransform(
    [defaultBGColor, bgColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const linkColor = useTransform(
    [theme.primary_verydark, primaryColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const color = useTransform(
    [theme.primary_verydark, primaryColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const chipTextColor = useTransform(
    [theme.primary_verydark, bgColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const chipBGColor = useTransform(
    [theme.primary_light, primaryColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const chipBorderColor = useTransform(
    [theme.primary_slightlydark, primaryColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  return (
    <Container
      tabIndex={0}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      style={{ zIndex: outline ? 3 : 1 }}
      layoutId={`${id}_summary`}
      drag="x"
      dragSnapToOrigin
      dragMomentum={false}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        type: "spring",
        stiffness: 50,
        mass: 0.25,
        damping: 7,
      }}
    >
      {outline && active && (
        <Outline
          layoutId="projectOutline"
          variants={outlineV}
          style={{
            outlineOffset,
            outlineWidth,
            outlineColor,
            outlineStyle: "solid",
            backgroundColor,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            mass: 0.25,
            damping: 10,
          }}
        />
      )}
      <ProjectTitle
        layoutId={`${id}_title`}
        variants={titleV}
        style={{ color }}
        transition={{ duration: 0 }}
      >
        {project.title}
      </ProjectTitle>
      <ProjectDescription
        layoutId={`${id}_description`}
        transition={{ duration: 0 }}
        variants={descV}
        style={{ color }}
      >
        {project.shortDescription}
      </ProjectDescription>
      <SkillChips variants={skillChipsV}>
        {project.skills &&
          project.skills.map((skill, index) => {
            return (
              <SkillChip
                layoutId={`${skill.title}_chip_${project.title}`}
                title={skill.title}
                key={skill.title}
                variants={{
                  hidden: { x: 120, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      delay: delay + index * 0.1,
                      duration: 0.9,
                    },
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  mass: 0.25,
                  damping: 7,
                }}
                bgColor={chipBGColor}
                textColor={chipTextColor}
                outline={chipBorderColor}
              >
                {skill.title}
              </SkillChip>
            );
          })}
      </SkillChips>
      {outline && active && (
        <DetailsLink
          href={`/projects/${encodeURIComponent(project.slug)}`}
          linkColor={linkColor}
        />
      )}
    </Container>
  );
}

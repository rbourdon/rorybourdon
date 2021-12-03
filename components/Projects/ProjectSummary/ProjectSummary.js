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
  grid-template-rows: auto auto auto 1fr;
  align-items: start;
  justify-items: center;
  align-content: center;
  border-radius: 20px;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  user-drag: none;
  user-select: none;

  &:focus {
    outline: none;
  }
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
  line-height: 1.25;
`;

const SkillChips = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 0 10px 0;
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

const containerV = {
  hidden: (props) => ({
    x: 200 * props.dir,
  }),
  visible: (props) => ({
    x: 0,
    transition: {
      delayChildren: props.delay,
      staggerChildren: 0.15,
      type: "spring",
      stiffness: 50,
      mass: 0.25,
      damping: 10,
    },
  }),
  panning: {
    x: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const descV = {
  hidden: (dir) => ({
    x: 190 * dir,
    opacity: 0,
  }),
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

const titleV = {
  hidden: (dir) => ({
    x: 300 * dir,
    opacity: 0,
  }),
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
    opacity: 0,
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

export default function ProjectSummary({
  project,
  outline = false,
  bgColor = "hsla(0,0,0,1)",
  primaryColor = "hsla(255,0,100,1)",
  onHover,
  delay = 0,
  id,
  active,
  intro = false,
  defaultBGColor,
  scrollerPos = 1,
  drag = true,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);
  const scale = useTransform(hover, [0, 1], [1, 1.02]);

  const handleHoverStart = () => {
    onHover && onHover(project.slug);
    active &&
      animate(hover, 1, { type: "tween", duration: 0.25, ease: "easeInOut" });
  };

  const handleHoverEnd = () => {
    hover.stop();
    animate(hover, 0, { type: "tween", duration: 0.25, ease: "easeInOut" });
  };

  useEffect(() => {
    if (!active) {
      hover.stop();
      animate(hover, 0, { type: "tween", duration: 0.25, ease: "easeInOut" });
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

  const boxShadow = useTransform(
    [hover, theme.shadow_key, theme.shadow_ambient],
    ([latestHover, latestShadow1, latestShadow2]) =>
      transform(
        latestHover,
        [0, 1],
        [
          "0px 0px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 0x 0px " +
            latestShadow2,
          "2px 3px 0px 8px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 25px 8px " +
            latestShadow2,
        ]
      )
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
      style={{
        zIndex: outline ? 1 : 0,
        boxShadow,
        scale,
        backgroundColor,
      }}
      layoutId={`${id}_summary`}
      drag={drag ? "x" : false}
      dragSnapToOrigin
      dragMomentum={false}
      dragElastic={true}
      custom={{
        dir: scrollerPos === 0 ? (!intro ? -1 : 1) : !intro ? 1 : 1,
        delay: !intro ? 0 : delay,
      }}
      variants={containerV}
      initial="hidden"
      animate="visible"
      transition={{
        type: "spring",
        stiffness: 40,
        mass: 0.25,
        damping: 7,
      }}
    >
      {outline && (
        <Outline
          layoutId="projectOutline"
          variants={outlineV}
          style={{
            outlineOffset,
            outlineWidth,
            outlineColor,
            outlineStyle: "solid",
          }}
          transition={{
            type: "spring",
            stiffness: 30,
            mass: 0.1,
            damping: 3,
          }}
        />
      )}
      <ProjectTitle
        layoutId={`${id}_title`}
        variants={titleV}
        style={{ color }}
        custom={scrollerPos === 0 ? (!intro ? -1 : 1) : !intro ? 1 : 1}
        transition={{
          type: "spring",
          stiffness: 40,
          mass: 0.25,
          damping: 7,
        }}
      >
        {project.title}
      </ProjectTitle>
      <ProjectDescription
        layoutId={`${id}_description`}
        variants={descV}
        style={{ color }}
        custom={scrollerPos === 0 ? (!intro ? -1 : 1) : !intro ? 1 : 1}
        transition={{
          type: "spring",
          stiffness: 40,
          mass: 0.25,
          damping: 7,
        }}
      >
        {project.shortDescription}
      </ProjectDescription>
      <SkillChips
        layout
        variants={skillChipsV}
        transition={{
          type: "spring",
          stiffness: 40,
          mass: 0.25,
          damping: 7,
        }}
      >
        {project.skills &&
          project.skills.map((skill, index) => {
            return (
              <SkillChip
                layoutId={`${skill.slug}_chip_${id}`}
                key={skill.slug}
                custom={{
                  x:
                    scrollerPos === 0
                      ? !intro
                        ? -120
                        : 120
                      : !intro
                      ? 120
                      : 120,
                  delay: intro
                    ? delay + 0.35 + index * 0.1
                    : 0.35 + index * 0.1,
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

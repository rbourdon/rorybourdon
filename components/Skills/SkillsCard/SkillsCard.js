import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import TreeIcon from "@/components/Icons/TreeIcon";
import { useContext, useState } from "react";
import SkillRoller from "@/components/Skills/SkillsCard/SkillRoller";
import CardEffect from "@/components/CardComponents/CardEffect";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import useWindowSize from "@/components/utils/useWindowSize";
import SkillsBackgroundEffect from "@/components/Skills/SkillsCard/SkillsBackgroundEffect";

const Container = styled(motion.article)`
  width: 100%;
  height: max-content;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(motion.div)`
  scroll-margin-top: ${(props) => props.$scrollMargin};
  scroll-snap-margin: ${(props) => props.$scrollMargin};
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 38% 1fr max-content;
  row-gap: 5px;
  justify-items: center;
  align-items: center;
  padding: 35px 35px;
  z-index: 3;
`;

const CardWindow = styled(motion.div)`
  width: 100%;
  height: 235px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 60px 1fr;
  border-radius: 20px;
  position: relative;
`;

const Trees = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Label = styled(motion.p)`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 100;
  width: max-content;
  height: max-content;
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
`;

const skillsCardV = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 1.85,
      duration: 0.5,
    },
  },
  selected: {
    opacity: 1,
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
      duration: 1,
    },
  },
};

const rollerV = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 1.85,
      duration: 0.5,
    },
  },
  selected: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const skillsIconV = {
  hidden: (custom) => ({
    originY: 1,
    scale: custom,
    transition: {
      duration: 0,
    },
  }),
  visible: (custom) => ({
    originY: 1,
    scale: custom,
    transition: {
      delayChildren: 710 * 230 * 0.0000012 + 0.5,
      staggerChildren: 0.75,
      duration: 0,
    },
  }),
  selected: (custom) => ({
    originY: 1,
    scale: custom,
    transition: {
      duration: 0,
    },
  }),
};

const DELAY = 0.5;
const WIDTH = 230;
const HEIGHT = 710;
const STEMLENGTH = 475;
const TAGLINESIZE = 350;

const layoutTransition = {
  type: "spring",
  stiffness: 100,
  mass: 1,
  damping: 14,
};

export default function SkillsCard({ skills, sectionHeight = 1400 }) {
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const theme = useContext(ThemeContext);
  const { width } = useWindowSize();

  const portrait = width * 0.95 < WIDTH + STEMLENGTH + TAGLINESIZE;

  const clickHandler = () => {
    setSelected(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 800);
  };

  const { ref, inView } = useInView({
    threshold: 0.36,
  });

  const cardEffects =
    width && !portrait
      ? [
          { x: width * 0.7, y: sectionHeight * 0.55, scale: 1 },
          { x: width * 0.46, y: sectionHeight * 0.2, scale: 0.55 },
          { x: width * 0.025, y: sectionHeight * 0.35, scale: 0.8 },
          { x: width * 0.1, y: sectionHeight * 0.7, scale: 0.5 },
          { x: width * 0.15, y: sectionHeight * 0.02, scale: 0.3 },
          { x: width * 0.9, y: sectionHeight * 0.45, scale: 0.4 },
          { x: width * 0.78, y: sectionHeight * 0.15, scale: 0.45 },
          { x: width * 0.41, y: sectionHeight * 0.68, scale: 0.65 },
          { x: width * 0.65, y: 0, scale: 0.8 },
          { x: width * 0.85, y: sectionHeight * 0.78, scale: 0.75 },
          { x: width * 0.25, y: sectionHeight * 0.9, scale: 0.65 },
          { x: width * 0.05, y: sectionHeight * 0, scale: 0.6 },
          { x: width * 0.65, y: sectionHeight * 1, scale: 0.7 },
        ]
      : width
      ? [
          { x: width * 0.7, y: sectionHeight * 0.55, scale: 1 },
          { x: width * 0.025, y: sectionHeight * 0.39, scale: 0.8 },
          { x: -width * 0.1, y: sectionHeight * 0.7, scale: 0.5 },
          { x: width * 0.25, y: sectionHeight * 0, scale: 0.3 },
          { x: width * 0.9, y: sectionHeight * 0.45, scale: 0.4 },
          { x: width * 0.78, y: sectionHeight * 0.15, scale: 0.45 },
          { x: width * 0.65, y: sectionHeight * 0, scale: 0.8 },
          { x: width * 0.85, y: sectionHeight * 0.78, scale: 0.75 },
          { x: width * 0.25, y: sectionHeight * 1, scale: 0.65 },
          { x: 0, y: sectionHeight * 0.05, scale: 0.5 },
          { x: 0, y: sectionHeight * 1.15, scale: 0.2 },
        ]
      : [];

  return (
    <MotionConfig
      transition={
        !layoutComplete
          ? layoutTransition
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
        {selected && (
          <Backing style={{ backgroundColor: theme.primary_light }} />
        )}
        <CardEffect position={selected ? "fixed" : "absolute"} delay={1.6}>
          {cardEffects.map((effect, i) => {
            return (
              <SkillsBackgroundEffect
                inView={inView}
                key={`skillEffect_${effect.x}_${effect.y}_${effect.scale}`}
                effectStyle={{ delay: i * 0.035 + 1.55, ...effect }}
              />
            );
          })}
        </CardEffect>
        <Card
          id="skills"
          $scrollMargin={
            "calc(50vh - " +
            (portrait ? WIDTH + STEMLENGTH : HEIGHT) / 2 +
            "px)"
          }
          style={{
            top:
              "calc(50vh - " +
              (portrait ? HEIGHT + STEMLENGTH + 125 : HEIGHT) / 2 +
              "px)",
            position: selected ? "fixed" : "static",
            zIndex: selected ? 40 : 35,
          }}
          variants={containerV}
          layoutId="skillsCard_container"
          onLayoutAnimationComplete={() =>
            setLayoutComplete(selected ? true : false)
          }
        >
          <NavCard
            height={HEIGHT}
            width={WIDTH}
            stemDir={portrait ? "v" : "h"}
            stemLoc={portrait ? 2 : 3}
            stemLength={portrait ? STEMLENGTH * 0.65 : STEMLENGTH}
            color1={theme.teal}
            color2={theme.teal}
            id="skills"
            delay={DELAY}
            tagline="I have a wide variety of skills and love to learn"
            intersectionRef={ref}
            stem
          >
            <CardContent
              variants={skillsCardV}
              style={{
                color: theme.primary_verydark,
              }}
            >
              <CardWindow
                layoutId="skillsCard_window"
                style={{
                  backgroundColor: theme.primary,
                  zIndex: selected ? 4 : 1,
                }}
              >
                <Label layoutId="skillsCard_label">Skills</Label>
                <Trees>
                  <TreeIcon
                    colors={{
                      trunk: theme.primary_light,
                      foliage: theme.primary_verydark,
                    }}
                    layoutId="skills_tree_left"
                    margin="0 -70px 0 0"
                    scale={0.9}
                    width={"95px"}
                    height={"140px"}
                    iconV={skillsIconV}
                    delay={HEIGHT * WIDTH * 0.0000012 + 2.15}
                    transition={
                      !layoutComplete
                        ? layoutTransition
                        : {
                            duration: 0,
                          }
                    }
                  />
                  <TreeIcon
                    colors={{
                      trunk: theme.primary_verydark,
                      foliage: theme.teal,
                    }}
                    width={"95px"}
                    height={"140px"}
                    iconV={skillsIconV}
                    delay={HEIGHT * WIDTH * 0.0000012 + 2}
                    zIndex={3}
                    transition={
                      !layoutComplete
                        ? layoutTransition
                        : {
                            duration: 0,
                          }
                    }
                  />
                  <TreeIcon
                    width={"95px"}
                    height={"140px"}
                    colors={{
                      trunk: theme.primary_light,
                      foliage: theme.primary_dark,
                    }}
                    layoutId="skills_tree_right"
                    margin="0 0 0 -70px"
                    scale={0.8}
                    iconV={skillsIconV}
                    delay={HEIGHT * WIDTH * 0.0000012 + 2.3}
                    transition={
                      !layoutComplete
                        ? layoutTransition
                        : {
                            duration: 0,
                          }
                    }
                  />
                </Trees>
              </CardWindow>
              <SkillRoller
                selected={selected}
                skills={skills}
                variants={rollerV}
              />
              <Button
                width={150}
                height={50}
                color1={theme.teal}
                href="/skills"
                onClick={clickHandler}
                id="skills"
                animationDelay={HEIGHT * WIDTH * 0.0000012 + 2.15}
              >
                All Skills
              </Button>
            </CardContent>
          </NavCard>
        </Card>
      </Container>
    </MotionConfig>
  );
}

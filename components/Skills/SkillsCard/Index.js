import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import TreeIcon from "@/components/Icons/TreeIcon";
import { useContext, useState } from "react";
import SkillRoller from "@/components/Skills/SkillsCard/SkillRoller";
// import Underline from "@/components/Underline";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";

const CardContent = styled(motion.article)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 38% 1fr max-content;
  row-gap: 5px;
  justify-items: center;
  align-items: center;
  padding: 45px 30px;
  z-index: 3;
`;

const CardWindow = styled(motion.div)`
  width: 170px;
  height: 235px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 30% 70%;
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
  font-weight: 300;
  width: max-content;
  height: max-content;
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
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
      duration: 0.9,
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
      duration: 0.2,
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

// const underlineV = {
//   hidden: {
//     pathLength: 0,
//   },
//   visible: {
//     pathLength: 1,
//     transition: {
//       delay: 710 * 230 * 0.0000012 + 2.05,
//       duration: 0.8,
//       ease: "easeInOut",
//     },
//   },
//   selected: {
//     pathLength: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeInOut",
//     },
//   },
// };

export default function SkillsCard({ skills }) {
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const theme = useContext(ThemeContext);
  //const [isPresent, safeToRemove] = usePresence();

  const clickHandler = () => {
    setSelected(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 800);
  };

  const { ref, inView } = useInView({
    threshold: 0.66,
  });

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
      <motion.div
        initial="hidden"
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        exit="exit"
        style={{
          top: "calc(50vh - " + 710 / 2 + "px)",
          position: selected ? "fixed" : "static",
          zIndex: selected ? 4 : 1,
        }}
        variants={containerV}
        layoutId="skillsCard_container"
        onLayoutAnimationComplete={() =>
          setLayoutComplete(selected ? true : false)
        }
      >
        <NavCard
          height={710}
          width={230}
          stemDir="h"
          stemLoc={3}
          stemLength={475}
          color1={theme.teal}
          color2={theme.teal}
          effectOffset={{ x: 50, y: -50 }}
          effectRadius={325}
          id="skills"
          delay={0.5}
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
                backgroundColor: selected
                  ? theme.primary_verylight
                  : theme.primary,
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
                  delay={710 * 230 * 0.0000012 + 2.15}
                  transition={{ duration: 0 }}
                />
                <TreeIcon
                  width={"95px"}
                  height={"140px"}
                  iconV={skillsIconV}
                  delay={710 * 230 * 0.0000012 + 2}
                  zIndex={3}
                  transition={{ duration: 0 }}
                />
                <TreeIcon
                  width={"95px"}
                  height={"140px"}
                  colors={{
                    trunk: theme.primary_light,
                    foliage: theme.primary_verydark,
                  }}
                  layoutId="skills_tree_right"
                  margin="0 0 0 -70px"
                  scale={0.8}
                  iconV={skillsIconV}
                  delay={710 * 230 * 0.0000012 + 2.3}
                  transition={{ duration: 0 }}
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
              color1={theme.blue}
              color2={theme.teal}
              href="/skills"
              onClick={clickHandler}
              id="skills"
              animationDelay={710 * 230 * 0.0000012 + 2.15}
              actionDelay={5}
            >
              All Skills
            </Button>
          </CardContent>
        </NavCard>
      </motion.div>
    </MotionConfig>
  );
}

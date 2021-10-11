import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/NavCard";
import SkillsIcon from "@/components/SkillsIcon";
import { useContext, useState } from "react";
import SkillRoller from "@/components/SkillRoller";
import Underline from "@/components/Underline";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 35% 11% 1fr calc(11% + 40px);
  row-gap: 5px;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 40px 30px;
  z-index: 3;
`;

const Icon = styled(motion.div)`
  width: 90%;
  max-content;
  display: flex;
  align-items: center;
  padding: 2px;
`;

const Label = styled(motion.div)`
  width: 100%;
  height: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
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
    transition: {
      duration: 0.5,
    },
  },
};

const skillsIconV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 2,
      duration: 0.65,
    },
  },
  selected: {
    pathLength: 1,
    transition: {
      duration: 0.65,
    },
  },
};

const underlineV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 2.05,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  selected: {
    pathLength: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function SkillsCard({ skills }) {
  const [selected, setSelected] = useState(false);
  const theme = useContext(ThemeContext);

  const clickHandler = () => () => {
    setSelected(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  const { ref, inView } = useInView({
    threshold: 0.66,
  });

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 40, mass: 2, damping: 10 }}
    >
      <motion.div
        initial="hidden"
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        style={{
          top: selected ? "calc(50vh - " + 710 / 2 + "px)" : "auto",
          position: selected ? "fixed" : "relative",
        }}
      >
        {selected && (
          <Backing
            style={{ backgroundColor: theme.primary }}
            initial={{ y: "-100vh" }}
            animate={{
              y: "0",
              transition: { duration: 0.2 },
              type: "tween",
              ease: "linear",
            }}
          />
        )}
        <NavCard
          height={710}
          width={230}
          stemDir="h"
          stemLoc={3}
          stemLength={475}
          color1={theme.blue}
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
            layoutId={"skillsCard_cardContent"}
            variants={skillsCardV}
          >
            <Icon
              layoutId={"skillsCard_icon"}
              style={{ color: theme.primary_verydark }}
            >
              <SkillsIcon iconV={skillsIconV} />
            </Icon>
            <Label layoutId={"skillsCard_label"}>
              Skills
              <Underline
                variants={underlineV}
                width={130}
                sWidth={1.2}
                color1={theme.blue}
                color2={theme.teal}
                id="skills"
              />
            </Label>
            <SkillRoller selected={selected} skills={skills} />
            <Button
              width={150}
              height={50}
              color1={theme.blue}
              color2={theme.teal}
              href="/skills"
              onClick={clickHandler}
              id="skills"
              delay={710 * 230 * 0.0000012 + 2.15}
            >
              All Skills
            </Button>
          </CardContent>
        </NavCard>
      </motion.div>
    </MotionConfig>
  );
}

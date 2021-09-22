import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/NavCard";
import SkillsIcon from "@/components/SkillsIcon";
import { useContext } from "react";
import SkillRoller from "@/components/SkillRoller";
import Underline from "@/components/Underline";

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 35% 9% 1fr calc(9% + 40px);
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 35px 30px;
  z-index: 3;
`;

const Icon = styled(motion.div)`
  width: 90%;
  max-content;
  display: flex;
  align-items: center;
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

const skillsCardV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 710 * 230 * 0.0000012 + 2.05,
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
      delay: 710 * 230 * 0.0000012 + 2.15,
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
};

export default function SkillsCard({ skills, selected, children }) {
  const theme = useContext(ThemeContext);
  return (
    <MotionConfig transition={{ type: "spring", stiffness: 30 }}>
      <NavCard
        height={710}
        width={230}
        stemDir="h"
        stemLoc={3}
        stemLength={475}
        color1={theme.blue.get()}
        color2={theme.teal.get()}
        effectOffset={{ x: 50, y: -50 }}
        effectRadius={325}
        id="skills"
        delay={0.5}
        tagline="I have a wide variety of skills and love to learn."
        selected={selected}
      >
        <CardContent layoutId={"skillsCard_cardContent"} variants={skillsCardV}>
          <Icon>
            <SkillsIcon iconV={skillsIconV} />
          </Icon>
          <Label>
            Skills
            <Underline
              variants={underlineV}
              width={130}
              sWidth={1.2}
              color1={theme.blue.get()}
              color2={theme.teal.get()}
              id="skills"
            />
          </Label>
          <SkillRoller selected={selected} skills={skills} />
          {children}
        </CardContent>
      </NavCard>
    </MotionConfig>
  );
}

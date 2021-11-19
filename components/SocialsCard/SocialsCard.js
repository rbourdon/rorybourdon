import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import { useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import useWindowSize from "@/components/utils/useWindowSize";
import SocialLink from "@/components/SocialsCard/SocialLink";
import SocialsSceneIcon from "../Icons/SocialsSceneIcon";

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
  grid-template-rows: 1fr max-content;
  justify-items: center;
  align-items: center;
  position: relative;
  padding: 25px 30px;
  z-index: 3;

  @media (max-width: 690px) {
    grid-template-columns: 100%;
    grid-template-rows: 43% 1fr 13%;
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

  @media (max-width: 690px) {
    grid-row: span 1;
  }
`;

const Label = styled(motion.p)`
  font-size: 2.25rem;
  line-height: 1;
  font-weight: 100;
  width: max-content;
  height: max-content;
  z-index: 3;
`;

const SocialsBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  font-size: 1.35rem;
  font-weight: 300;
  display: grid;
  grid-template-columns: repeat(auto-fit, 35px);
  grid-template-rows: 35px;
  align-items: center;
  justify-content: center;
  align-content: center;
  column-gap: 20px;
  overflow: hidden;

  @media (max-width: 690px) {
    grid-row: span 1;
    grid-template-columns: 35px;
    grid-template-rows: repeat(auto-fit, 35px);
    column-gap: 0px;
    row-gap: 20px;
  }
`;

const Backing = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

const SocialsScene = styled(motion.div)`
  width: 100%;
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
      delay: 180 * 631 * 0.0000012 + 2.05,
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
      delay: 180 * 631 * 0.0000012 + 1.85,
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

export default function SocialsCard() {
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
        id="socials"
        initial="hidden"
        $scrollMargin={"calc(50vh - " + (width < 690 ? 631 : 180) / 2 + "px)"}
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        exit="exit"
        variants={containerV}
        style={{
          top: "calc(50vh - " + (width < 690 ? 631 : 180) / 2 + "px)",
          position: selected ? "fixed" : "static",
          zIndex: selected ? 4 : 1,
        }}
        onLayoutAnimationComplete={() =>
          setLayoutComplete(selected ? true : false)
        }
      >
        <NavCard
          height={width < 690 ? 631 : 180}
          width={width < 690 ? 180 : 631}
          stemDir="h"
          stemLoc={4}
          stemLength={345}
          color1={theme.green}
          color2={theme.green}
          effectOffset={{ x: 150, y: 20 }}
          effectRadius={215}
          id="socials"
          delay={0.5}
          tagline="You can find me in most of the usual places"
          intersectionRef={ref}
          stem
        >
          <CardContent variants={projectsCardV}>
            <CardWindow
              layoutId="socialsCard_window"
              style={{
                backgroundColor: theme.primary,
                zIndex: selected ? 4 : 1,
              }}
            >
              <Label layoutId="socialsCard_label">Socials</Label>
              <SocialsScene layout>
                <SocialsSceneIcon scale={1.3} />
              </SocialsScene>
            </CardWindow>
            <SocialsBox variants={projectSummariesV}>
              <SocialLink
                platform="twitter"
                hoverColor={theme.green}
                href="https://twitter.com/rorybourdon"
              />
              <SocialLink
                platform="linkedin"
                hoverColor={theme.green}
                href="https://www.linkedin.com/in/rorybourdon/"
              />
              <SocialLink
                platform="github"
                hoverColor={theme.green}
                href="https://github.com/rbourdon"
              />
              <SocialLink
                platform="instagram"
                hoverColor={theme.green}
                href="https://www.instagram.com/draxusd/"
              />
            </SocialsBox>
            <Button
              width={150}
              height={50}
              color1={theme.green}
              href="/contact"
              id="contact"
              animationDelay={180 * 631 * 0.0000012 + 1.85}
              onClick={clickHandler}
            >
              Contact Me
            </Button>
          </CardContent>
        </NavCard>
      </Container>
    </MotionConfig>
  );
}

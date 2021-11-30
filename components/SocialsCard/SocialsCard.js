import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import { useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import useWindowSize from "@/components/utils/useWindowSize";
import SocialLink from "@/components/SocialsCard/SocialLink";
import SocialsSceneIcon from "../Icons/SocialsSceneIcon";
import SocialsBackgroundEffect from "@/components/SocialsCard/SocialsBackgroundEffect";
import CardEffect from "@/components/CardComponents/CardEffect";

const Container = styled(motion.article)`
  width: 100%;
  height: max-content;
  padding: 0 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(motion.article)`
  top: calc(50vh - 631 / 2);
  scroll-margin-top: ${(props) => props.$scrollMargin};
  scroll-snap-margin: ${(props) => props.$scrollMargin};
`;

const CardContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;

  justify-items: center;
  align-items: center;
  position: relative;
  padding: 25px 30px;
  z-index: 3;

  @media (max-width: 690px) {
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

  @media (max-width: 690px) {
    grid-template-columns: 35px;
    grid-template-rows: repeat(auto-fit, 35px);
    column-gap: 0px;
    row-gap: 20px;
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 45%;
  grid-row: span 2;
  overflow: hidden;

  @media (max-width: 690px) {
    grid-row: span 1;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 45%;
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
  z-index: 30;
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
      duration: 1.55,
    },
  },
};

const WIDTH = 631;
const HEIGHT = 180;
const STEMLENGTH = 345;
const TAGLINESIZE = 350;

export default function SocialsCard() {
  const theme = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const { width, height } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const portrait = width * 0.95 < WIDTH + STEMLENGTH + TAGLINESIZE;

  const clickHandler = () => {
    setSelected(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 800);
  };

  const cardEffects =
    width && width > 800
      ? [
          { x: width * 0.35, y: height * 0.35, scale: 0.75 },
          { x: width * 0.5, y: height * 0.8, scale: 0.6 },
          { x: width * 0.5, y: height * 0.12, scale: 1 },
          { x: width * 0.7, y: height * 0.35, scale: 0.5 },
          { x: width * 0, y: height * 0.75, scale: 0.55 },
          { x: width * 0.88, y: height * 0.2, scale: 0.65 },
          { x: width * 0.7, y: height * 0.9, scale: 0.75 },
          { x: width * 0.03, y: height * 0.4, scale: 0.4 },
          { x: width * 0.3, y: height * 1, scale: 0.9 },
          { x: width * 0.2, y: height * 0.85, scale: 0.3 },
          { x: width * 0.2, y: height * 0.1, scale: 0.4 },
          { x: width * 0.55, y: height * 1.1, scale: 0.36 },
        ]
      : width
      ? [
          { x: width * 0.15, y: height * 0.15, scale: 0.75 },
          { x: width * 0.2, y: height * 1.1, scale: 0.88 },
          { x: width * 0.5, y: height * 0.05, scale: 1 },
          { x: width * 0.7, y: height * 0.35, scale: 0.5 },
          { x: width * 0.1, y: height * 0.75, scale: 0.45 },
          { x: width * 0.84, y: height * 0.24, scale: 0.65 },
          { x: width * 0.6, y: height * 0.8, scale: 0.75 },
          { x: 0, y: height * 0.4, scale: 0.6 },
          { x: width * 0.8, y: height * 1.15, scale: 0.9 },
        ]
      : [];

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
      <Container
        initial="hidden"
        animate={selected ? "selected" : inView ? "visible" : "hidden"}
        exit="exit"
      >
        {selected && (
          <Backing style={{ backgroundColor: theme.primary_light }} />
        )}
        <CardEffect position={selected ? "fixed" : "absolute"} delay={1.7}>
          {cardEffects.map((effect, i) => {
            return (
              <SocialsBackgroundEffect
                inView={inView}
                key={`socialsEffect_${effect.x}_${effect.y}_${effect.scale}`}
                effectStyle={{ delay: i * 0.035 + 1.65, ...effect }}
              />
            );
          })}
        </CardEffect>
        <Card
          id="socials"
          $scrollMargin={
            "calc(50vh - " + (portrait ? WIDTH : HEIGHT) / 2 + "px)"
          }
          variants={containerV}
          style={{
            top:
              "calc(50vh - " +
              (portrait ? WIDTH + STEMLENGTH + 125 : HEIGHT) / 2 +
              "px)",
            position: selected ? "fixed" : "static",
            zIndex: selected ? 40 : 35,
          }}
          onLayoutAnimationComplete={() =>
            setLayoutComplete(selected ? true : false)
          }
        >
          <NavCard
            height={portrait ? WIDTH : HEIGHT}
            width={portrait ? HEIGHT : WIDTH}
            stemDir={portrait ? "v" : "h"}
            stemLoc={portrait ? 1 : 4}
            stemLength={portrait ? STEMLENGTH * 0.65 : STEMLENGTH}
            color1={theme.green}
            color2={theme.green}
            id="socials"
            faceBands={[2, 6, 4]}
            delay={0.5}
            tagline="You can find me in most of the usual places"
            intersectionRef={ref}
            stem
          >
            <CardContent
              style={{
                gridTemplateColumns: portrait ? "100%" : "43% 54%",
                gridTemplateRows: portrait ? "43% 1fr" : "100%",
                rowGap: portrait ? "3%" : "0%",
                columnGap: portrait ? "0%" : "3%",
              }}
              variants={projectsCardV}
            >
              <CardWindow
                layoutId="socialsCard_window"
                style={{
                  backgroundColor: theme.primary,
                  zIndex: selected ? 40 : 35,
                }}
              >
                <Label layoutId="socialsCard_label">Socials</Label>
                <SocialsScene layout>
                  <SocialsSceneIcon scale={1.3} />
                </SocialsScene>
              </CardWindow>
              <Content>
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
                  width={portrait ? 120 : 150}
                  height={50}
                  color1={theme.green}
                  href="/contact"
                  id="contact"
                  animationDelay={180 * 631 * 0.0000012 + 1.85}
                  onClick={clickHandler}
                >
                  Contact Me
                </Button>
              </Content>
            </CardContent>
          </NavCard>
        </Card>
      </Container>
    </MotionConfig>
  );
}

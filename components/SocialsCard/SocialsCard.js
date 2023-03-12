import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import NavCard from "@/components/CardComponents/NavCard";
import { useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Nav/Button";
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
  grid-template-rows: 35% 65%;
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
  font-weight: 200;
  width: max-content;
  height: max-content;
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
  align-content: center;
  grid-template-columns: 100%;
  overflow: hidden;
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

const WIDTH = 631;
const HEIGHT = 180;
const STEMLENGTH = 345;
const TAGLINESIZE = 350;

const socialsCardV = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: HEIGHT * WIDTH * 0.0000012 + 2.05,
      duration: 0.4,
    },
  },
  selected: {
    opacity: 1,
  },
};

const socialIconsV = {
  visible: {
    transition: {
      delayChildren: HEIGHT * WIDTH * 0.0000012 + 0.25,
      staggerChildren: 0.1,
    },
  },
  selected: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
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

export default function SocialsCard({ sectionHeight = 1400, children }) {
  const theme = useContext(ThemeContext);
  const [selected, setSelected] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const { width } = useWindowSize();
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
    width && !portrait
      ? [
          { x: width * 0.35, y: sectionHeight * 0.25, scale: 0.75 },
          { x: width * 0.5, y: sectionHeight * 0.7, scale: 0.6 },
          { x: width * 0.5, y: sectionHeight * 0.02, scale: 1 },
          { x: width * 0.7, y: sectionHeight * 0.25, scale: 0.5 },
          { x: width * 0, y: sectionHeight * 0.65, scale: 0.55 },
          { x: width * 0.88, y: sectionHeight * 0.1, scale: 0.65 },
          { x: width * 0.7, y: sectionHeight * 0.8, scale: 0.75 },
          { x: width * 0.03, y: sectionHeight * 0.3, scale: 0.4 },
          { x: width * 0.3, y: sectionHeight * 0.9, scale: 0.9 },
          { x: width * 0.2, y: sectionHeight * 0.75, scale: 0.3 },
          { x: width * 0.2, y: sectionHeight * 0, scale: 0.4 },
          { x: width * 0.55, y: sectionHeight * 1, scale: 0.36 },
        ]
      : width
      ? [
          { x: width * 0.1, y: sectionHeight * 0.15, scale: 0.75 },
          { x: width * 0.2, y: sectionHeight * 1, scale: 0.88 },
          { x: width * 0.5, y: sectionHeight * 0, scale: 1 },
          { x: width * 0.7, y: sectionHeight * 0.25, scale: 0.5 },
          { x: width * 0.1, y: sectionHeight * 0.65, scale: 0.45 },
          { x: width * 0.84, y: sectionHeight * 0.14, scale: 0.65 },
          { x: width * 0.6, y: sectionHeight * 0.7, scale: 0.75 },
          { x: 0, y: sectionHeight * 0.4, scale: 0.5 },
          { x: width * 0.8, y: sectionHeight * 1.05, scale: 0.9 },
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
        <CardEffect position={selected ? "fixed" : "absolute"} delay={1.45}>
          {cardEffects.map((effect, i) => {
            return (
              <SocialsBackgroundEffect
                inView={inView}
                key={`socialsEffect_${effect.x}_${effect.y}_${effect.scale}`}
                effectStyle={{ delay: i * 0.035 + 1.4, ...effect }}
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
          layoutId="socialsCard_container"
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
              variants={socialsCardV}
            >
              <CardWindow
                layoutId="socialsCard_window"
                style={{
                  backgroundColor: theme.primary,
                }}
              >
                <Label layoutId="socialsCard_label">Socials</Label>
                <SocialsScene layout>
                  <SocialsSceneIcon scale={1.3} />
                </SocialsScene>
              </CardWindow>
              <Content
                style={{
                  gridRow: portrait ? "span 1" : "span 2",
                  gridTemplateRows: portrait ? "1fr 1fr" : "40% 40%",
                  rowGap: portrait ? "20px" : "10px",
                }}
              >
                <SocialsBox variants={socialIconsV}>
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
                  width={portrait ? 120 : 160}
                  height={40}
                  bRadius={19}
                  color1={theme.green}
                  href="/contact"
                  id="contact"
                  animationDelay={HEIGHT * WIDTH * 0.0000012 + 2.25}
                  onClick={clickHandler}
                >
                  Contact Me
                </Button>
              </Content>
            </CardContent>
          </NavCard>
        </Card>
        {children}
      </Container>
    </MotionConfig>
  );
}

import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext, useEffect } from "react";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr max-content;
  align-items: center;
`;

const Title = styled(motion.h1)`
  width: 100%;
  height: 100%;
  font-weight: 800;
  align-items: flex-end;
  display: flex;
  overflow: hidden;
`;

const BG = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 97%;

  pointer-events: none;

  mix-blend-mode: screen;
`;

const Letter = styled(motion.div)`
  user-select: none;
  position: relative;
  padding: 1.25vw 0.2vw;
  mix-blend-mode: multiply;
`;

const Spacer = styled(motion.div)`
  width: 2.5vw;
  height: 2.5vw;
`;

const Subtitle = styled(motion.h2)`
  padding: 0 0.6vw;
  width: 100%;
  height: 100%;
  height: max-content;
  user-select: none;
`;

const titleV = {
  visible: (custom) => ({
    transition: {
      delayChildren: custom,
      staggerChildren: 0.15,
    },
  }),
};

const letterV = {
  hidden: {
    y: 165,
  },
  visible: {
    y: 0,
    transition: {
      stiffness: 30,
      mass: 0.5,
      damping: 5.5,
      duration: 0.6,
      ease: "easeOut",
      type: "tween",
    },
  },
};

const subtitleV = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 0.5,
    },
  },
};

const bgV = {
  hidden: {
    scaleY: 0,
    originY: 1,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    scaleY: [0, 0.85],
    originY: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2,
      ease: "linear",
    },
  },
};

export default function Banner({ title = "Rory Bourdon" }) {
  const theme = useContext(ThemeContext);

  const phase = useMotionValue(0);

  const backgroundColor = useTransform(
    [theme.primary_slightlydark, theme.teal, theme.orange, theme.green, phase],
    ([latestColor1, latestColor2, latestColor3, latestColor4, latestPhase]) =>
      transform(
        latestPhase,
        [0, 1, 2, 3],
        [latestColor1, latestColor2, latestColor3, latestColor4]
      )
  );
  useEffect(() => {
    animate(phase, [1, 1, 2, 2, 3, 3], {
      type: "tween",
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
      duration: 6,
    });
  }, [phase]);

  return (
    <Container>
      <Title custom={0} variants={titleV}>
        {[...title].map((letter, index) => {
          return (
            <Letter
              variants={letterV}
              key={letter + index}
              style={{
                color: theme.primary_verydark,
                backgroundColor: "#ffffff",
              }}
            >
              <BG style={{ backgroundColor }} variants={bgV} />
              {letter === " " ? <Spacer /> : letter}
            </Letter>
          );
        })}
      </Title>
      <Subtitle style={{ color: theme.primary_dark }} variants={subtitleV}>
        Web Developer & Visual Artist
      </Subtitle>
    </Container>
  );
}

import styled, { ThemeContext } from "styled-components";
import { motion, useTransform } from "framer-motion";
import { useContext } from "react";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled(motion.h1)`
  width: 100%;
  height: max-content;
  font-weight: 800;
  letter-spacing: 8px;
  display: flex;
  overflow: hidden;
  padding: 40px 0;
`;

const Spacer = styled(motion.div)`
  width: 50px;
  height: 50px;
`;

const Subtitle = styled(motion.p)`
  width: 100%;
  height: max-content;
  font-size: 1.85rem;
`;

const titleV = {
  visible: (custom) => ({
    transition: {
      delayChildren: custom,
      staggerChildren: 0.1,
    },
  }),
};

const letterV = {
  hidden: {
    y: 190,
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      bounce: 0.3,
      type: "spring",
    },
  },
};

export default function Banner({ title = "Rory Bourdon" }) {
  const theme = useContext(ThemeContext);

  const WebkitTextStroke = useTransform(
    theme.primary_dark,
    (latestColor1) => `0.1rem ${latestColor1}`
  );

  return (
    <Container>
      <Title
        custom={0}
        variants={titleV}
        style={{
          color: theme.primary,
          WebkitTextStroke,
        }}
      >
        {[...title].map((letter, index) => {
          return (
            <motion.span
              style={{ display: "block" }}
              variants={letterV}
              key={letter + index}
            >
              {letter === " " ? <Spacer /> : letter}
            </motion.span>
          );
        })}
      </Title>
      <Subtitle custom={0.8} variants={titleV}>
        Web Developer & Visual Artist
      </Subtitle>
    </Container>
  );
}

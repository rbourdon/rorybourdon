import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  width: 100%;
  height: max-content;
  color: "black";
  margin-bottom: 30px;
  font-weight: 800;
`;

const Subtitle = styled(motion.p)`
  width: 100%;
  height: max-content;
  font-size: 1.35rem;
`;

const titleV = {
  hidden: {
    y: "170%",
  },
  visible: (custom) => ({
    y: "0%",
    transition: {
      delay: custom,
      duration: 1.2,
      bounce: 0.3,
      type: "spring",
    },
  }),
};

const bannerV = {
  exit: {
    opacity: 0,
    transition: { duration: 0.01 },
  },
};

export default function Banner() {
  return (
    <Container variants={bannerV}>
      <Title custom={0.6} variants={titleV}>
        Rory Bourdon
      </Title>
      <Subtitle custom={0.8} variants={titleV}>
        Web Developer & Visual Artist
      </Subtitle>
    </Container>
  );
}

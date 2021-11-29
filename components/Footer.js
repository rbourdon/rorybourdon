import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";
import Logo from "./Nav/Logo";
import Highlight from "./Highlight";

const Container = styled(motion.div)`
  width: 100%;
  height: 30vh;
  display: grid;
  grid-template-columns: minmax(50px, 5vw) minmax(min-content, max-content);
  column-gap: 2vh;
  justify-content: center;
  align-items: center;
  align-content: center;

  @media (max-width: 555px) {
    grid-template-columns: 100%;
    grid-template-rows: minmax(50px, 5vw) max-content;
    justify-items: center;
  }
`;

const Credit = styled(motion.p)`
  font-weight: 300;
  max-width: 75vw;
  display: flex;
  overflow: hidden;
  white-space: pre;
  flex-wrap: wrap;
  justify-content: center;
`;

const titleV = {
  visible: (custom) => ({
    transition: {
      delayChildren: custom,
      staggerChildren: 0.1,
    },
  }),
};

export default function Footer() {
  const theme = useContext(ThemeContext);

  return (
    <Container style={{ backgroundColor: theme.primary }}>
      <Logo />
      <Credit
        custom={0}
        variants={titleV}
        style={{
          color: theme.primary_mediumdark,
        }}
      >
        {`Designed and Developed by `}
        <Highlight color={theme.teal}>Rory Bourdon</Highlight>
      </Credit>
    </Container>
  );
}

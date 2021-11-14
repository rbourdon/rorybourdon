import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "@/components/Nav/Logo";
import Link from "next/link";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 12vh;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: minmax(max-content, 8vw) 1fr;
  justify-items: flex-end;
  align-items: flex-end;
  padding: 0 25px;
  z-index: 3;

  @media (max-width: 555px) {
    height: 7.5vh;
    padding: 0 10px;
  }
`;

const NavBox = styled(motion.nav)`
  width: min(100%, 750px);
  padding: 0 0 0 min(200px, 5vw);
  height: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 555px) {
    display: none;
  }
`;

const LogoContainer = styled(motion.a)`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 555px) {
    width: 100%;
    height: 100%;
  }
`;

export default function NavBar({ children }) {
  return (
    <Container>
      <Link href="/" passHref>
        <LogoContainer>
          <Logo intro />
        </LogoContainer>
      </Link>

      <NavBox initial="hidden" animate="visible">
        {children}
      </NavBox>
    </Container>
  );
}

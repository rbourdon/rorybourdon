import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "@/components/Nav/Logo";
import Link from "next/link";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 150px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: minmax(max-content, 8vw) 1fr;
  justify-items: end;
  align-items: center;
  padding: 0 25px 0 25px;
`;

const NavBox = styled(motion.div)`
  width: min(100%, 750px);
  padding: 0 0 0 min(200px, 5vw);
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 555px) {
    display: none;
  }
`;

const LogoContainer = styled(motion.a)`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function NavBar({ children }) {
  return (
    <Container>
      <Link href="/" passHref>
        <LogoContainer
          transition={{ type: "spring", duration: 1, bounce: 0.2 }}
          layoutId="logo"
        >
          <Logo />
        </LogoContainer>
      </Link>

      <NavBox initial="hidden" animate="visible">
        {children}
      </NavBox>
    </Container>
  );
}

import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 150px;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 8vw 1fr;
  justify-items: end;
  align-items: center;
  padding: 0 75px 0 75px;
`;

const NavBox = styled(motion.div)`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const LogoContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function NavBar({ children, logoComplete, setIntroComplete }) {
  return (
    <Container>
      {logoComplete && (
        <>
          <LogoContainer
            transition={{ type: "spring", duration: 1, bounce: 0.2 }}
            layoutId="logo"
            onLayoutAnimationComplete={() =>
              setIntroComplete ? setIntroComplete(true) : null
            }
          >
            <Logo />
          </LogoContainer>

          <NavBox initial="hidden" animate="visible">
            {children}
          </NavBox>
        </>
      )}
    </Container>
  );
}

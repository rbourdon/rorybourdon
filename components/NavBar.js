import styled from "styled-components";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const Container = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 180px;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function NavBar({ children, introComplete }) {
  return (
    <Container>
      {introComplete && (
        <LogoContainer
          layoutId="logo"
          transition={{ type: "spring", duration: 0.9, bounce: 0.125 }}
        >
          <Logo strokeWidth={2} />
        </LogoContainer>
      )}
      {!introComplete && <LogoContainer />}
      {introComplete && (
        <NavBox initial="hidden" animate="visible">
          {children}
        </NavBox>
      )}
    </Container>
  );
}

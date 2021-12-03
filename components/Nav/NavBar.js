import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import Logo from "@/components/Nav/Logo";
import Link from "next/link";
import NavLink from "./NavLink";
import { useContext, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const Container = styled(motion.nav)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 12vh;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: minmax(max-content, 8vw) 1fr;
  justify-items: flex-end;
  align-items: center;
  padding: 3vh 25px 0 25px;

  @media (max-width: 555px) {
    height: 7.5vh;
    padding: 3vh 10px 0 10px;
  }
`;

const NavBox = styled(motion.div)`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: center;
`;

const LinksContainer = styled(motion.div)`
  width: min(100%, 700px);
  height: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 655px) {
    display: none;
  }
`;

const Hamburger = styled(motion.div)`
  height: max-content;
  width: 3rem;
  max-height: 100%;
  padding: 0 0.5rem;
  z-index: 3;

  @media (min-width: 655px) {
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
  z-index: 20;

  @media (max-width: 555px) {
    width: 100%;
    height: 100%;
  }
`;

const Underline = styled(motion.span)`
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default function NavBar({ children, links = [] }) {
  const theme = useContext(ThemeContext);
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <Container>
      <Link href="/" passHref>
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Link>
      <NavBox
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ delayChildren: 1.3, staggerChildren: 0.15 }}
      >
        <LinksContainer>
          {links.map((link) => {
            return (
              <NavLink
                key={link.name}
                name={link.name}
                href={link.href}
                onClick={link.onClick}
                setHoveredLink={setHoveredLink}
              >
                {hoveredLink === link.name && (
                  <Underline
                    layoutId="linkUnderline"
                    style={{
                      backgroundColor: link.color || theme.primary_slightlydark,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 85,
                      mass: 0.8,
                      damping: 12,
                    }}
                  />
                )}
                {link.name}
              </NavLink>
            );
          })}
        </LinksContainer>
        <Hamburger>
          <HamburgerMenu links={links} />
        </Hamburger>
        {children}
      </NavBox>
    </Container>
  );
}

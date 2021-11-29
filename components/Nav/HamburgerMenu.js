import styled, { ThemeContext } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import BurgerButton from "@/components/Nav/BurgerButton";
import NavLink from "@/components/Nav/NavLink";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
`;

const Backdrop = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const MenuContent = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Links = styled(motion.div)`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const contentV = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "beforeChildren",
    },
  },
};

const backdropV = {
  hidden: {
    clipPath: "circle(0 at 100% 0%)",
  },
  visible: {
    clipPath: "circle(140vh at 100% 0%)",
    transition: {
      ease: "easeInOut",
      duration: 0.7,
    },
  },
  exit: {
    clipPath: "circle(.1vh at 100% 0%)",
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export default function HamburgerMenu({ links }) {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <AnimatePresence>
        {open && (
          <Backdrop
            key={`BurgerBackdrop`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropV}
            style={{ backgroundColor: theme.primary_light }}
          />
        )}

        <BurgerButton
          key={`BurgerButton`}
          onClick={() => setOpen((prev) => !prev)}
          open={open}
        />
        {open && (
          <MenuContent
            variants={contentV}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Links>
              {links.map((link) => {
                return (
                  <NavLink
                    key={link.name + "burger"}
                    name={link.name + "burger"}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    setHoveredLink={null}
                  >
                    {/* {hoveredLink === link.name + "burger" && (
                      <Underline
                        layoutId="burgerLinkUnderline"
                        style={{
                          backgroundColor:
                            link.color || theme.primary_slightlydark,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 85,
                          mass: 0.8,
                          damping: 12,
                        }}
                      />
                    )} */}
                    {link.name}
                  </NavLink>
                );
              })}
            </Links>
          </MenuContent>
        )}
      </AnimatePresence>
    </Container>
  );
}

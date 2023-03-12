import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig } from "framer-motion";
import React, { useContext } from "react";
import NavBar from "@/components/Nav/NavBar";
import Head from "next/head";
import HorizonEffects from "@/components/Icons/HorizonEffects";
import BackArrow from "@/components/Nav/BackArrow";
import SocialsSceneIcon from "@/components/Icons/SocialsSceneIcon";
import ContactForm from "@/components/ContactForm";
import TitleBlock from "@/components/PageTitleBlock";

const Content = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  height: max-content;
  display: grid;
  flex: 1;
  grid-template-rows: 30% 60%;
  grid-template-columns: 52% 1fr;
  padding: 0 10vw;
  grid-auto-flow: dense;
  align-content: center;
  justify-items: start;
  align-items: center;

  @media (max-width: 555px) {
    row-gap: 10px;
    align-items: start;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 100%;
    padding: 4vh 8vw;
    justify-items: center;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.h1)`
  width: max-content;
  font-size: clamp(3.4rem, 15vw, 9rem);
  font-weight: 200;
  line-height: clamp(4.4rem, 13vw, 9rem);
  margin-left: 2vw;
`;

const Detail = styled(motion.div)`
  padding: 0 0 10vh 0;
  max-width: 710px;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
  z-index: 1;

  @media (max-width: 555px) {
    padding: 0;
  }
`;

const SocialsScene = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-row: span 2;
`;

const HeadingBlock = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const detailsV = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      mass: 1.5,
      damping: 10,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const arrowV = {
  hidden: {
    opacity: 1,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 30,
      mass: 1,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export default function Contact() {
  const theme = useContext(ThemeContext);

  const pageLinks = [
    {
      name: "Skills",
      href: "/skills",
      color: theme.green,
      onClick: null,
    },
    {
      name: "Projects",
      href: "/projects",
      color: theme.green,
      onClick: null,
    },
    {
      name: "Resume",
      href: "/Rory_Bourdon_Resume_2021.pdf",
      color: theme.green,
      onClick: null,
    },
  ];

  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 30, mass: 2, damping: 14 }}
    >
      <Container
        style={{ backgroundColor: theme.primary }}
        layoutId="socialsCard_window"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <title>
            Contact Me - Rory Bourdon | Web Developer & Visual Artist
          </title>
          <meta
            name="description"
            content="Contact Me - Rory Bourdon | Web Developer & Visual Artist"
          />
        </Head>
        <NavBar links={pageLinks} />
        <Content>
          <HorizonEffects lines={[{ yLoc: 70, slope: -25 }]} />
          <HeadingBlock>
            <TitleBlock>
              <BackArrow variants={arrowV} id="socialsPage" />
              <Title
                layoutId="socialsCard_label"
                style={{ color: theme.primary_verydark }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  mass: 2,
                  damping: 14,
                }}
              >
                Contact
              </Title>
            </TitleBlock>
            <Detail
              variants={detailsV}
              style={{ color: theme.primary_dark }}
              layoutId="socialsDetails"
            >
              {`Don't hesitate to reach out if you have a question about my projects or want to work with me.`}
            </Detail>
          </HeadingBlock>
          <SocialsScene>
            <SocialsSceneIcon scale={1} collapsed={false} />
          </SocialsScene>
          <ContactForm />
        </Content>
      </Container>
    </MotionConfig>
  );
}

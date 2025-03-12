import styled, { ThemeContext } from "styled-components";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import React, { useContext, useMemo } from "react";
import { getProjectList, getProjectDetails } from "@/lib/graphcms";
import NavBar from "@/components/Nav/NavBar";
import Head from "next/head";
import BackArrow from "@/components/Nav/BackArrow";
import SkillList from "@/components/Projects/ProjectInfoPanel/SkillList";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Post from "@/components/Projects/ProjectPost/Post";
import Title from "@/components/Projects/ProjectPost/Title";
import PostImage from "@/components/Projects/ProjectPost/PostImage";
import PostVideo from "@/components/Projects/ProjectPost/PostVideo";
import Caption from "@/components/Projects/ProjectPost/Caption";
import Content from "@/components/Projects/ProjectPost/Content";
import Highlight from "@/components/Highlight";
import ProjectInfoPanel from "@/components/Projects/ProjectInfoPanel/ProjectInfoPanel";
import ProjectLink from "@/components/Projects/ProjectInfoPanel/ProjectLink";
import Spacer from "@/components/Spacer";
import AboutProject from "@/components/Projects/ProjectInfoPanel/AboutProject";
import HorizonEffects from "@/components/Icons/HorizonEffects";
import ProjectLinkBox from "@/components/Projects/ProjectInfoPanel/LinkBox";
import PostPano from "@/components/Projects/ProjectPost/PostPano";
import convert from "color-convert";

const PageContent = styled(motion.main)`
  width: 100%;
  min-width: 100%;
  display: grid;
  flex: 1;
  padding: 8vh 8vw;
  grid-template-rows: max-content max-content max-content;
  grid-template-columns: minmax(min-content, 80%) 1fr;
  grid-auto-flow: dense;
  align-content: center;
  position: relative;

  @media (max-width: 555px) {
    row-gap: 10px;
    align-items: start;
    grid-template-rows: max-content max-content 1fr;
    grid-template-columns: 100%;
    padding: 2vh 2vw;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled(motion.h1)`
  width: max-content;
  font-weight: 200;
  margin: 0 0 30px 30px;
`;

const Details = styled(motion.h3)`
  align-self: start;
  grid-row: span 3;
  grid-column: 2;
  z-index: 1;
  @media (max-width: 555px) {
    grid-row: span 1;
    grid-column: 1;
  }
`;

const ProjectContent = styled(motion.article)`
  width: 100%;
  justify-self: end;
  height: max-content;
  font-size: clamp(1rem, 4vw, 1.3525rem);
  font-weight: 200;
  line-height: clamp(1rem, 4.5vw, 1.55rem);
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 4vw 2vw;
  z-index: 1;

  @media (max-width: 555px) {
    padding: 4vw 0;
  }
`;

const TitleBlock = styled(motion.div)`
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  grid-column: span 2;
  z-index: 1;

  @media (max-width: 555px) {
    grid-column: span 1;
  }
`;

const arrowV = {
  hidden: {
    opacity: 1,
    x: 600,
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

const components = {
  Post,
  PostImage,
  PostVideo,
  PostPano,
  Caption,
  Title,
  Content,
  Highlight,
};

const pageLinks = [
  {
    name: "Skills",
    href: "/skills",
    onClick: null,
  },
  {
    name: "Contact",
    href: "/contact",
    onClick: null,
  },
  {
    name: "Resume",
    href: "/Rory_Bourdon_Resume_2021.pdf",
    onClick: null,
  },
];

export default function Project({ project, source }) {
  const theme = useContext(ThemeContext);
 
  const secondaryColorRGB = useMemo(() => {
    return project.secondaryColor
      ? convert.rgb.hsl(
          project.secondaryColor.rgba.r,
          project.secondaryColor.rgba.g,
          project.secondaryColor.rgba.b
        )
      : [0, 0, 0, 0];
  }, [project.secondaryColor]);

  const primaryColorRGB = useMemo(() => {
    return project.primaryColor
      ? convert.rgb.hsl(
          project.primaryColor.rgba.r,
          project.primaryColor.rgba.g,
          project.primaryColor.rgba.b
        )
      : [0, 0, 0, 0];
  }, [project.primaryColor]);

  const color1 = useMotionValue(
    `hsla(${primaryColorRGB[0]},${primaryColorRGB[1]}%,${primaryColorRGB[2]}%,1)`
  );
  const color2 = useMotionValue(
    `hsla(${secondaryColorRGB[0]},${secondaryColorRGB[1]}%,${secondaryColorRGB[2]}%,1)`
  );

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 30,
        mass: 2,
        damping: 11,
      }}
    >
      <Container
        style={{ backgroundColor: theme.primary }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <title>{`${project.title} - Projects - Rory Bourdon | Web Developer & Visual Artist`}</title>
          <meta
            name="description"
            content={`${project.title} - Projects - Rory Bourdon | Web Developer & Visual Artist`}
          />
        </Head>
        <NavBar links={pageLinks} />
        <PageContent>
          <HorizonEffects
            lines={[{ slope: -22, yLoc: 61 }]}
            circles={[{ cx: "0%", cy: 75, r: 0.15 }]}
            slope={-22}
            yLoc={62}
          />
          <TitleBlock>
            <BackArrow variants={arrowV} id={project.slug} />
            <PageTitle
              layoutId={`${project.slug}_title`}
              style={{ color: theme.primary_verydark }}
              transition={{
                type: "spring",
                stiffness: 70,
                mass: 1,
                damping: 14,
              }}
            >
              {project.title}
            </PageTitle>
          </TitleBlock>
          <ProjectContent style={{ color: theme.primary_dark }}>
            <MDXRemote
              {...source}
              components={components}
              scope={{ theme, color1: color1, color2: color2, ...project }}
            />
          </ProjectContent>
          <Details>
            <ProjectInfoPanel>
              <ProjectLinkBox>
                <ProjectLink
                  href={project.demoLink}
                  type="Demo"
                  iconColor={color1}
                />
                <Spacer height={10} />
                <ProjectLink
                  href={project.codeLink}
                  type="Code"
                  iconColor={color1}
                />
              </ProjectLinkBox>
              <Spacer height={70} />
              <SkillList
                selected={false}
                skills={project.skills}
                numSkills={project.skills.length - 1}
                bubbleColor={color1}
                textColor={color2}
              />
              <Spacer height={70} />
              <AboutProject description={project.description} />
            </ProjectInfoPanel>
          </Details>
        </PageContent>
      </Container>
    </MotionConfig>
  );
}

export async function getStaticProps({ params }) {
  const project = (await getProjectDetails(params.project)) || [];
  const source =
    project.content || `<Post><Title>Add project content!</Title></Post>`;
  const mdxSource = await serialize(source);
  return {
    props: { project: project, source: mdxSource },
  };
}

export async function getStaticPaths() {
  //Get slugs for boxes, for dynamic routing.
  const projects = (await getProjectList("all")) || [];

  const paths = projects.map((project) => ({
    params: { project: project.slug },
  }));

  return { paths, fallback: false };
}

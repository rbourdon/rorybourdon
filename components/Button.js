import styled, { ThemeContext } from "styled-components";
import { motion, useTransform } from "framer-motion";
import Link from "next/link";
import CardBorder from "@/components/CardBorder";
import { useContext } from "react";

const defaultWidth = 175;
const defaultHeight = 50;
const defaultStrokeWidth = 1.2;
const defaultBorderRadius = 23;

const Container = styled(motion.a)`
  width: 175px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.13rem;
  padding-bottom: 2px;
`;

const borderV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.75,
    },
  },
};

const innerBorderV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.85,
    },
  },
};

const contentV = {
  hidden: (custom) => ({
    borderRadius: custom.borderRadius,
    opacity: 0,
  }),
  visible: (custom) => ({
    borderRadius: custom.borderRadius,
    opacity: 1,
    transition: {
      delay: custom.delay + 1,
      duration: 0.4,
    },
  }),
};

export default function Button({
  href,
  children,
  width,
  height,
  color1,
  color2,
  sWidth,
  bRadius,
  id,
  delay,
}) {
  const theme = useContext(ThemeContext);
  const buttonWidth = width ? width : defaultWidth;
  const buttonHeight = height ? height : defaultHeight;
  const buttonColor1 = color1 ? color1 : "#358ab5";
  const buttonColor2 = color2 ? color2 : "#b36db5";
  const strokeWidth = sWidth ? sWidth : defaultStrokeWidth;
  const borderRadius = bRadius ? bRadius : defaultBorderRadius;
  const boxShadow = useTransform(
    [theme.shadow_key, theme.shadow_ambient],
    ([latestShadow1, latestShadow2]) =>
      "1px 1px 3px 0px " +
      latestShadow1 +
      ", " +
      "0px 0px 15px 0px " +
      latestShadow2
  );
  const frameV = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
        when: "beforeChildren",
      },
    },
  };
  return (
    <Link href={href ? href : "/"} passHref>
      <Container>
        <Content
          style={{
            backgroundColor: theme.primary_light,
            boxShadow,
          }}
          custom={{ borderRadius: borderRadius, delay: delay }}
          variants={contentV}
        >
          {children}
        </Content>
        <CardBorder
          stroke="#3a3a3a"
          color1={buttonColor1}
          color2={buttonColor2}
          width={buttonWidth}
          height={buttonHeight}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          startLoc={1}
          borderV={borderV}
          frameV={frameV}
          innerBorderV={innerBorderV}
          innerOffset={-6}
          id={id}
          rotation={0}
        />
      </Container>
    </Link>
  );
}

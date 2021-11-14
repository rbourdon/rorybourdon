import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import CardBorder from "@/components/CardComponents/CardBorder";
import { useContext } from "react";

const Container = styled(motion.a)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
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
  selected: {
    pathLength: 0,
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
  selected: {
    pathLength: 0,
    transition: {
      duration: 0.75,
    },
  },
};

const contentV = {
  hidden: (custom) => ({
    borderRadius: custom.bRadius,
    opacity: 0,
  }),
  visible: (custom) => ({
    borderRadius: custom.bRadius,
    opacity: 1,
    transition: {
      delay: custom.animationDelay + 0.65,
      duration: 0.3,
    },
  }),
  selected: (custom) => ({
    borderRadius: custom.bRadius,
    opacity: 0,
    transition: {
      delay: 0.75,
      duration: 0.3,
    },
  }),
};

function handleHoverStart(hover) {
  animate(hover, 1, {
    duration: 0.1,
    bounce: 0.5,
    type: "tween",
  });
}

function handleHoverEnd(hover) {
  animate(hover, 0, {
    duration: 0.1,
    bounce: 0.5,
    type: "tween",
  });
}

export default function Button({
  href,
  children,
  width = 175,
  height = 50,
  sWidth = 1.1,
  bRadius = 23,
  id,
  animationDelay = 0,
  onClick,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const scale = useTransform(hover, [0, 1], [1, 1.04]);

  const boxShadow = useTransform(
    [hover, theme.shadow_key, theme.shadow_ambient],
    ([latestHover, latestShadow1, latestShadow2]) =>
      transform(
        latestHover,
        [0, 1],
        [
          "0px 0px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 0x 0px " +
            latestShadow2,
          "3px 4px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 0px 0px " +
            latestShadow2,
        ]
      )
  );

  const frameV = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: animationDelay,
        when: "beforeChildren",
      },
    },
  };

  return (
    <Link href={href ? href : "/"} passHref scroll={false}>
      <Container
        $width={width}
        $height={height}
        onHoverStart={() => handleHoverStart(hover)}
        onHoverEnd={() => handleHoverEnd(hover)}
        onClick={onClick}
        layoutId={`${id}Button`}
        style={{ scale }}
      >
        <Content
          style={{
            backgroundColor: theme.primary_light,
            boxShadow,
          }}
          custom={{ bRadius: bRadius, animationDelay: animationDelay }}
          variants={contentV}
          layoutId={`${id}ButtonContent`}
        >
          {children}
        </Content>
        <CardBorder
          color1={theme.primary_dark}
          width={width}
          height={height}
          sWidth={sWidth}
          bRadius={bRadius}
          startLoc={3}
          borderV={borderV}
          frameV={frameV}
          innerBorderV={innerBorderV}
          innerOffset={-6}
          id={id + "button"}
          rotation={0}
        />
      </Container>
    </Link>
  );
}

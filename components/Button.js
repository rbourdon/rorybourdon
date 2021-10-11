import styled, { ThemeContext } from "styled-components";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import CardBorder from "@/components/CardBorder";
import { useContext } from "react";

const Container = styled(motion.a)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
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
    pathLength: 1,
    transition: {
      duration: 0.75,
    },
  },
  exit: {
    pathLength: 0,
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
    pathLength: 1,
    transition: {
      duration: 0.75,
    },
  },
  exit: {
    pathLength: 0,
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
      delay: custom.delay + 0.65,
      duration: 0.3,
    },
  }),
  selected: (custom) => ({
    borderRadius: custom.bRadius,
    opacity: 1,
    transition: {
      delay: custom.delay + 0.65,
      duration: 0.3,
    },
  }),
  exit: (custom) => ({
    borderRadius: custom.bRadius,
    opacity: 0,
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
  color1 = "#358ab5",
  color2 = "#b36db5",
  sWidth = 1.2,
  bRadius = 23,
  id,
  delay,
  onClick,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  // const scaleY = useTransform(hover, [0, 1], [1, 1.1]);
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
    <Link href={href ? href : "/"} passHref scroll={false}>
      <Container
        $width={width}
        $height={height}
        onHoverStart={() => handleHoverStart(hover)}
        onHoverEnd={() => handleHoverEnd(hover)}
        onClick={(e) => onClick(id)(e)}
        layoutId={`${id}Button`}
      >
        <Content
          style={{
            backgroundColor: theme.primary_light,
            boxShadow,
          }}
          custom={{ bRadius: bRadius, delay: delay }}
          variants={contentV}
          layoutId={`${id}ButtonContent`}
        >
          {children}
        </Content>
        <CardBorder
          color1={color1}
          color2={color2}
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

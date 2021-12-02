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

const LinkContainer = styled(motion.a)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled(motion.button)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.13rem;
  padding: 0 0 2px 0;
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

export default function Button({
  href,
  children,
  width = 175,
  height = 50,
  sWidth = 1.1,
  bRadius = 23,
  type = "link",
  id,
  animationDelay = 0,
  onClick,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const scale = useTransform(hover, [0, 1], [1, 1.025]);

  const handleHoverStart = () => {
    animate(hover, 1, {
      duration: 0.2,
      type: "tween",
    });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, {
      duration: 0.2,
      type: "tween",
    });
  };

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
          "1px 2px 0px 0px " +
            " " +
            latestShadow1 +
            ", " +
            "0px 0px 10px 0px " +
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

  return type === "link" ? (
    <Link href={href ? href : "/"} passHref scroll={false}>
      <LinkContainer
        $width={width}
        $height={height}
        onHoverStart={() => handleHoverStart(hover)}
        onHoverEnd={() => handleHoverEnd(hover)}
        onFocus={() => handleHoverStart(hover)}
        onBlur={() => handleHoverEnd(hover)}
        onClick={onClick}
        layoutId={`${id}Button`}
      >
        <Content
          style={{
            color: theme.primary_dark,
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
          color1={theme.primary_mediumdark}
          width={width * scale.get()}
          height={height * scale.get()}
          sWidth={sWidth}
          bRadius={bRadius}
          startLoc={3}
          borderV={borderV}
          frameV={frameV}
          innerBorderV={innerBorderV}
          innerOffset={-0.1}
          id={id + "button"}
        />
      </LinkContainer>
    </Link>
  ) : (
    <ButtonContainer
      $width={width}
      $height={height}
      onHoverStart={() => handleHoverStart(hover)}
      onHoverEnd={() => handleHoverEnd(hover)}
      onFocus={() => handleHoverStart(hover)}
      onBlur={() => handleHoverEnd(hover)}
      onClick={onClick}
      type="submit"
      layoutId={`${id}Button`}
    >
      <Content
        style={{
          color: theme.primary_dark,
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
        color1={theme.primary_mediumdark}
        width={width * scale.get()}
        height={height * scale.get()}
        sWidth={sWidth}
        bRadius={bRadius}
        startLoc={3}
        borderV={borderV}
        frameV={frameV}
        innerBorderV={innerBorderV}
        innerOffset={-0.1}
        id={id + "button"}
      />
    </ButtonContainer>
  );
}

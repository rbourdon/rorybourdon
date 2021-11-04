import styled from "styled-components";
import Card from "@/components/CardComponents/Card";
import CardStem from "@/components/CardComponents/CardStem";
import CardFace from "@/components/CardComponents/CardFace";
import ShineBand from "@/components/CardComponents/ShineBand";
import CardBacking from "@/components/CardComponents/CardBacking";
import CardBorder from "@/components/CardComponents/CardBorder";
import CardEffect from "@/components/CardComponents/CardEffect";
import Tagline from "@/components/CardComponents/Tagline";
import { motion } from "framer-motion";
import useWindowSize from "@/components/utils/useWindowSize";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: ${(props) => props.$flexDir};
  width: max-content;
  height: ${(props) => props.$height + "px"};
  position: relative;
  z-index: 10;
`;

const cardV = {
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
  selected: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const frameV = {
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const containerV = {
  visible: (custom) => ({
    transition: {
      delayChildren: custom,
    },
  }),
};

const tagV = {
  hidden: (custom) => ({ y: custom.hidden, opacity: 0 }),
  visible: (custom) => ({
    opacity: 1,
    y: custom.visible,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  }),
  selected: (custom) => ({
    y: custom.visible,
    opacity: 0,
    transition: { delay: 0.25, duration: 0.25 },
  }),
};

const stemV = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
  selected: {
    pathLength: 0,
    transition: {
      duration: 0.25,
      ease: "linear",
    },
  },
};

export default function NavCard({
  height = 200,
  borderRadius = 30,
  strokeWidth = 1,
  width = 200,
  stem = false,
  stemLength = 200,
  stemDir = "h",
  stemLoc = 3,
  children,
  color1,
  color2,
  effectRadius = 150,
  effectOffset = { x: 0, y: 0 },
  effectRotation = 0,
  id,
  delay = 0,
  tagline = "Oops! Missing tagline...",
  keyShadow = "1px 2px 3px 0px",
  faceBands = [1, 5, 3],
  intersectionRef,
  bgColor,
  gradientRotation,
}) {
  const size = useWindowSize();
  const finalStemLoc =
    size.width * 0.95 < width + stemLength + 450 ? 2 : stemLoc;
  return (
    <Container
      $width={stem && stemDir === "h" ? stemLength + width : width}
      $height={stem && stemDir === "v" ? stemLength + height : height}
      $flexDir={stemDir === "h" ? "row" : "column"}
      ref={intersectionRef}
      variants={containerV}
      custom={delay}
      layoutId={`${id}_navCardContainer`}
    >
      <CardEffect
        width={width}
        height={height}
        sWidth={strokeWidth}
        color1={color1}
        color2={color2}
        gradientRotation={gradientRotation}
        effectRotation={effectRotation}
        circleV={{
          hidden: {
            pathLength: 0,
            transition: {
              delay: 0,
              duration: 0.9,
            },
          },
          visible: {
            pathLength: 1,
            transition: {
              delay: width * height * 0.0000012 + 0.9 + (delay ? delay : 0),
              duration: 0.9,
            },
          },
        }}
        lineV={{
          hidden: {
            pathLength: 0,
            originX: 0,
            originY: 1,
            transition: {
              delay: 0,
              duration: 0.9,
            },
          },
          visible: (custom) => ({
            pathLength: 1,
            x: [0, custom.x, 0],
            y: [0, custom.y, 0],
            originX: 0,
            originY: 1,
            transition: {
              delay: width * height * 0.0000025 + 0.9 + delay,
              duration: 0.75,
              x: {
                duration: custom.x / 7,
                repeat: Infinity,
                ease: "linear",
              },
              y: {
                duration: custom.x / 7,
                repeat: Infinity,
                ease: "linear",
              },
            },
          }),
        }}
        radius={effectRadius}
        xOff={effectOffset.x}
        yOff={effectOffset.y}
        id={id}
      />
      {stem && (finalStemLoc === 7 || finalStemLoc === 8) && (
        <>
          <Tagline
            height={height}
            bRadius={borderRadius}
            stemLoc={finalStemLoc}
            variants={tagV}
          >
            {tagline}
          </Tagline>
          <CardStem
            width={stemDir === "h" ? stemLength : width}
            height={stemDir === "v" ? stemLength : height}
            sWidth={strokeWidth}
            bRadius={borderRadius}
            stemDir={stemDir}
            stemLength={stemLength}
            stemLoc={finalStemLoc}
            variants={stemV}
          />
        </>
      )}
      <Card variants={cardV} width={width} height={height} id={id}>
        <CardBorder
          color1={color1}
          color2={color2}
          width={width}
          height={height}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          startLoc={finalStemLoc}
          borderV={{
            hidden: {
              pathLength: 0,
              transition: {
                duration: width * height * 0.0000012 + 0.7,
              },
            },
            visible: {
              pathLength: 1,
              transition: {
                duration: width * height * 0.0000012 + 0.7,
              },
            },
            selected: {
              pathLength: 0,
              transition: {
                duration: width * height * 0.0000012 + 0.7,
              },
            },
          }}
          innerBorderV={{
            hidden: {
              pathLength: 0,
              transition: {
                duration: width * height * 0.0000012 + 0.7,
              },
            },
            visible: {
              pathLength: 1,
              transition: {
                duration: width * height * 0.0000012 + 0.7,
              },
            },
            selected: {
              pathLength: 0,
              transition: {
                duration: width * height * 0.0000012 + 0.5,
              },
            },
          }}
          frameV={frameV}
          id={id}
          gradientRotation={gradientRotation}
        />
        <CardBacking
          backingV={{
            hidden: {
              opacity: 0,
              transition: {
                transition: {
                  duration: 0.3,
                },
              },
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.3,
                delay: width * height * 0.0000025 + 0.7 + (delay ? delay : 0),
              },
            },
            selected: {
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
          width={width}
          height={height}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          keyShadow={keyShadow}
          bgColor={bgColor}
        />
        {children}
        <CardFace
          width={width}
          height={height}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          faceV={{
            hidden: {
              opacity: 1,
              transition: {
                delayChildren: 0,
                staggerChildren: 0.125,
              },
            },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: width * height * 0.0000012,
                staggerChildren: 0.125,
              },
            },
            selected: {
              opacity: 1,
              transition: {
                delayChildren: 0,
                staggerChildren: 0.125,
              },
            },
          }}
          color1={color1}
          color2={color2}
          bands={faceBands}
          id={id}
          gradientRotation={gradientRotation}
        />
        <ShineBand
          width={width}
          height={height}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          shineV={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: width * height * 0.0000012 - 0.75,
                type: "tween",
                duration: 0.3,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 5,
              },
            },
            selected: {
              transition: {
                delayChildren: width * height * 0.0000012 - 0.75,
                type: "tween",
                duration: 0.3,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 5,
              },
            },
          }}
          id={id}
        />
      </Card>
      {stem && (finalStemLoc === 3 || finalStemLoc === 4) && (
        <>
          <CardStem
            width={stemDir === "h" ? stemLength : width}
            height={stemDir === "v" ? stemLength : height}
            sWidth={strokeWidth}
            bRadius={borderRadius}
            stemDir={stemDir}
            stemLength={stemLength}
            stemLoc={finalStemLoc}
            variants={stemV}
          />

          <Tagline
            height={height}
            bRadius={borderRadius}
            stemLoc={finalStemLoc}
            variants={tagV}
          >
            {tagline}
          </Tagline>
        </>
      )}
    </Container>
  );
}

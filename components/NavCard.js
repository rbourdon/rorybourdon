import styled from "styled-components";
import Card from "@/components/Card";
import CardStem from "@/components/CardStem";
import CardFace from "@/components/CardFace";
import ShineBand from "@/components/ShineBand";
import CardBacking from "@/components/CardBacking";
import CardBorder from "@/components/CardBorder";
import CardEffect from "@/components/CardEffect";
import { useInView } from "react-intersection-observer";
import Tagline from "@/components/Tagline";
import { motion, MotionConfig } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: ${(props) => props.$flexDir};
  width: max-content;
  height: ${(props) => props.$height + "px"};
`;

const defaultWidth = 200;
const defaultHeight = 200;
const defaultBorderRadius = 30;
const defaultStrokeWidth = 1.2;

const cardV = {
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
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
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

export default function NavCard({
  height,
  borderRadius,
  strokeWidth,
  width,
  stemLength,
  stemDir,
  stemLoc,
  children,
  color1,
  color2,
  effectRadius,
  effectOffset,
  id,
  delay,
  tagline,
  selected,
}) {
  const { ref, inView } = useInView({
    threshold: 0.66,
  });
  const bRadius = borderRadius ? borderRadius : defaultBorderRadius;
  const sWidth = strokeWidth ? strokeWidth : defaultStrokeWidth;
  const cardWidth = width ? width : defaultWidth;
  const cardHeight = height ? height : defaultHeight;
  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 12,
      }}
    >
      <Container
        $width={
          stemDir === "h"
            ? stemLength
              ? stemLength + cardWidth
              : cardWidth
            : cardWidth
        }
        $height={
          stemDir === "v"
            ? stemLength
              ? stemLength + cardHeight
              : defaultHeight + cardHeight
            : cardHeight
        }
        initial="hidden"
        animate={inView || selected ? "visible" : "hidden"}
        exit={selected === id ? null : "exit"}
        $flexDir={stemDir === "h" ? "row" : "column"}
        ref={ref}
        variants={containerV}
        custom={delay}
        layoutId={`${id}NavcardContainer`}
        $position={selected === id ? "fixed" : "static"}
        style={{
          top:
            selected === id ? "calc(50vh - " + cardHeight / 2 + "px" : "auto",
          left:
            selected === id ? "calc(50vw - " + cardWidth / 2 + "px" : "auto",
          position: selected === id ? "fixed" : "relative",
        }}
      >
        <CardEffect
          width={cardWidth}
          height={cardHeight}
          sWidth={sWidth}
          color1={color1}
          color2={color2}
          circleV={{
            hidden: {
              pathLength: 0,
            },
            visible: {
              pathLength: 1,
              transition: {
                delay:
                  cardWidth * cardHeight * 0.0000012 +
                  0.9 +
                  (delay ? delay : 0),
                duration: 0.9,
              },
            },
          }}
          lineV={{
            hidden: {
              pathLength: 0,
              originX: 0,
              originY: 1,
            },
            visible: (custom) => ({
              pathLength: 1,
              x: [0, custom.x, 0],
              y: [0, custom.y, 0],
              originX: 0,
              originY: 1,
              transition: {
                delay:
                  cardWidth * cardHeight * 0.0000025 +
                  0.9 +
                  (delay ? delay : 0),
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
          radius={effectRadius ? effectRadius : 150}
          xOff={effectOffset ? effectOffset.x : 0}
          yOff={effectOffset ? effectOffset.y : 0}
          id={id}
        />
        {stemLength && (stemLoc === 7 || stemLoc === 8) && (
          <CardStem
            width={
              stemDir === "h"
                ? stemLength
                  ? stemLength
                  : defaultWidth
                : width
                ? width
                : defaultWidth
            }
            height={
              stemDir === "v"
                ? stemLength
                  ? stemLength
                  : defaultHeight
                : height
                ? height
                : defaultHeight
            }
            sWidth={sWidth}
            bRadius={bRadius}
            stemDir={stemDir === "h" || stemDir === "v" ? stemDir : "h"}
            stemLength={stemLength ? stemLength : defaultWidth}
            stroke="#3a3a3a"
            stemLoc={stemLoc}
          />
        )}
        <Card variants={cardV} width={cardWidth} height={cardHeight} id={id}>
          <CardBorder
            color1={color1}
            color2={color2}
            width={cardWidth}
            height={cardHeight}
            sWidth={sWidth}
            bRadius={bRadius}
            startLoc={stemLoc}
            borderV={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: {
                  duration: cardWidth * cardHeight * 0.0000012 + 0.7,
                },
              },
            }}
            innerBorderV={{
              hidden: {
                pathLength: 0,
              },
              visible: {
                pathLength: 1,
                transition: {
                  duration: cardWidth * cardHeight * 0.0000012 + 0.7,
                },
              },
            }}
            frameV={frameV}
            id={id}
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
                  delay:
                    cardWidth * cardHeight * 0.0000025 +
                    0.7 +
                    (delay ? delay : 0),
                },
              },
            }}
            width={cardWidth}
            height={cardHeight}
            sWidth={sWidth}
            bRadius={bRadius}
            id={id}
          />
          <CardFace
            width={cardWidth}
            height={cardHeight}
            sWidth={sWidth}
            bRadius={bRadius}
            faceV={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: cardWidth * cardHeight * 0.0000012,
                  staggerChildren: 0.125,
                },
              },
            }}
            color1={color1}
            color2={color2}
            id={id}
          />
          {children}
          <ShineBand
            width={cardWidth}
            height={cardHeight}
            sWidth={sWidth}
            bRadius={bRadius}
            shineV={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: cardWidth * cardHeight * 0.0000012 - 0.75,
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
        {stemLength && (stemLoc === 3 || stemLoc === 4) && (
          <>
            <CardStem
              width={
                stemDir === "h"
                  ? stemLength
                    ? stemLength
                    : defaultWidth
                  : width
                  ? width
                  : defaultWidth
              }
              height={
                stemDir === "v"
                  ? stemLength
                    ? stemLength
                    : defaultHeight
                  : height
                  ? height
                  : defaultHeight
              }
              sWidth={sWidth}
              bRadius={bRadius}
              stemDir={stemDir === "h" || stemDir === "v" ? stemDir : "h"}
              stemLength={stemLength ? stemLength : defaultWidth}
              stroke="#3a3a3a"
              stemLoc={stemLoc}
            />
            <Tagline cardHeight={cardHeight} bRadius={bRadius}>
              {tagline}
            </Tagline>
          </>
        )}
      </Container>
    </MotionConfig>
  );
}

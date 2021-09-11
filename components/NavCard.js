import styled from "styled-components";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import CardStem from "@/components/CardStem";
import CardFace from "@/components/CardFace";
import CardBacking from "@/components/CardBacking";
import CardBorder from "@/components/CardBorder";
import CardEffect from "@/components/CardEffect";
import { useInView } from "react-intersection-observer";
import Tagline from "@/components/Tagline";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: start;
  position: relative;
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
};

export default function NavCard({
  height,
  borderRadius,
  strokeWidth,
  width,
  stemLength,
  stemDir,
  stemLoc,
  stemSide,
  children,
  color1,
  color2,
  effectRadius,
  effectLocation,
  id,
  delay,
}) {
  const { ref, inView } = useInView({
    threshold: 0.25,
  });
  const bRadius = borderRadius ? borderRadius : defaultBorderRadius;
  const sWidth = strokeWidth ? strokeWidth : defaultStrokeWidth;
  const cardWidth = width ? width : defaultWidth;
  const cardHeight = height ? height : defaultHeight;
  return (
    <Container
      $width={
        stemDir === "h"
          ? stemLength
            ? stemLength + cardWidth
            : cardWidth
          : width
          ? width
          : defaultWidth
      }
      $height={
        stemDir === "v"
          ? stemLength
            ? stemLength + cardHeight
            : defaultHeight + cardHeight
          : height
          ? height
          : defaultHeight
      }
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      $flexDir={stemDir === "h" ? "row" : "column"}
      ref={ref}
      variants={containerV}
      custom={delay ? delay : 0}
    >
      {stemLength && stemSide === "l" && (
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
          stemDir={stemDir === "h" || stemDir === "v" ? stemDir : "h"}
          stemLength={stemLength ? stemLength : defaultWidth}
          stroke="#3a3a3a"
          stemLoc={stemLoc}
        />
      )}
      <Card variants={cardV} width={cardWidth} height={cardHeight}>
        <CardBorder
          stroke="#3a3a3a"
          color1={color1}
          color2={color2}
          width={cardWidth}
          height={cardHeight}
          sWidth={sWidth}
          bRadius={bRadius}
          startLoc={3}
          borderV={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: (cardWidth + cardHeight) * 0.0011 },
              ease: "linear",
            },
          }}
          innerBorderV={{
            hidden: {
              pathLength: 0,
            },
            visible: {
              pathLength: 1,
              transition: {
                duration: (cardWidth + cardHeight) * 0.0013,
                ease: "linear",
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
                delay: (cardWidth + cardHeight) * 0.002 + (delay ? delay : 0),
              },
            },
          }}
          width={cardWidth}
          height={cardHeight}
          sWidth={sWidth}
          bRadius={bRadius}
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
                delayChildren: (cardWidth + cardHeight) * 0.0014,
                staggerChildren: 0.125,
              },
            },
          }}
          color1={color1}
          color2={color2}
          id={id}
        />
        {children}
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
                delay: (cardWidth + cardHeight) * 0.00225 + (delay ? delay : 0),
                duration: 0.9,
              },
            },
          }}
          lineV={{
            hidden: {
              pathLength: 0,
            },
            visible: {
              pathLength: 1,
              transition: {
                delay: (cardWidth + cardHeight) * 0.0035,
                duration: 0.75,
              },
            },
          }}
          radius={effectRadius ? effectRadius : 150}
          x={effectLocation ? effectLocation.x : 0.5}
          y={effectLocation ? effectLocation.y : 0.5}
          id={id}
        />
      </Card>
      {stemLength && stemSide === "r" && (
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
            stemSide={stemSide}
            stemDir={stemDir === "h" || stemDir === "v" ? stemDir : "h"}
            stemLength={stemLength ? stemLength : defaultWidth}
            stroke="#3a3a3a"
            stemLoc={stemLoc}
          />
          <Tagline cardHeight={cardHeight} bRadius={bRadius}>
            I have a wide variety of skills and love to learn.
          </Tagline>
        </>
      )}
    </Container>
  );
}

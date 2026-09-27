import type { MotionValue, Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ReactNode, Ref } from "react";
import styled from "styled-components";
import Card from "@/components/CardComponents/Card";
import CardBacking from "@/components/CardComponents/CardBacking";
import CardBorder from "@/components/CardComponents/CardBorder";
import CardFace from "@/components/CardComponents/CardFace";
import CardStem from "@/components/CardComponents/CardStem";
import ShineBand from "@/components/CardComponents/ShineBand";
import Tagline from "@/components/CardComponents/Tagline";

const Container = styled(motion.div)<{
  $flexDir: string;
  $width: number;
  $height: number;
}>`
  display: flex;
  justify-content: ${(props) =>
    props.$flexDir === "row" ? "center" : "start"};
  align-items: ${(props) => (props.$flexDir === "row" ? "start" : "center")};
  flex-direction: ${(props) => props.$flexDir};
  width: max-content;
  height: max-content;
  z-index: 10;
`;

const cardV: Variants = {
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.5,
    },
  },
  selected: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const frameV: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const containerV: Variants = {
  visible: (custom: number) => ({
    transition: {
      delayChildren: custom,
    },
  }),
};

interface TagOffsets {
  hidden: number;
  visible: number;
}

const tagV: Variants = {
  hidden: (custom: TagOffsets) => ({
    y: custom.hidden,
    opacity: 0,
    transition: { delay: 0.25, duration: 0.25 },
  }),
  visible: (custom: TagOffsets) => ({
    opacity: 1,
    y: custom.visible,
    transition: {
      duration: 0.5,
      delay: 0.15,
      opacity: { duration: 0.3, delay: 0.15 },
    },
  }),
  selected: (custom: TagOffsets) => ({
    y: custom.visible,
    opacity: 0,
    transition: { delay: 0.25, duration: 0.25 },
  }),
};

interface NavCardProps {
  height?: number;
  borderRadius?: number;
  strokeWidth?: number;
  width?: number;
  stem?: boolean;
  stemLength?: number;
  stemDir?: "h" | "v";
  stemLoc?: number;
  children?: ReactNode;
  color1?: MotionValue<string>;
  color2?: MotionValue<string>;
  id: string;
  delay?: number;
  tagline?: string;
  keyShadow?: string;
  faceBands?: number[];
  intersectionRef?: Ref<HTMLDivElement>;
  bgColor?: MotionValue<string>;
}

export default function NavCard({
  height = 200,
  borderRadius = 30,
  strokeWidth = 1.2,
  width = 200,
  stem = false,
  stemLength = 200,
  stemDir = "h",
  stemLoc = 3,
  children,
  color1,
  color2,
  id,
  delay = 0,
  tagline = "Oops! Missing tagline...",
  keyShadow = "1px 2px 3px 0px",
  faceBands = [1, 5, 3],
  intersectionRef,
  bgColor,
}: NavCardProps) {
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
      {stem &&
        (stemLoc === 7 || stemLoc === 8 || stemLoc === 1 || stemLoc === 2) && (
          <>
            <Tagline
              height={height}
              bRadius={borderRadius}
              stemLoc={stemLoc}
              stemDir={stemDir}
              variants={tagV}
            >
              {tagline}
            </Tagline>
            <CardStem
              width={stemDir === "h" ? stemLength : width}
              height={stemDir === "v" ? stemLength : height}
              sWidth={strokeWidth}
              bRadius={borderRadius}
              stemLength={stemLength}
              stemLoc={stemLoc}
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
          startLoc={stemLoc}
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
        />
        <CardBacking
          // Cast: hidden.transition nests a stray `transition` key (kept as-is).
          backingV={
            {
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
            } as Variants
          }
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
          bands={faceBands}
        />
        <ShineBand
          width={width}
          height={height}
          sWidth={strokeWidth}
          bRadius={borderRadius}
          id={id}
        />
      </Card>
      {stem &&
        (stemLoc === 3 || stemLoc === 4 || stemLoc === 5 || stemLoc === 6) && (
          <>
            <CardStem
              width={stemDir === "h" ? stemLength : width}
              height={stemDir === "v" ? stemLength : height}
              sWidth={strokeWidth}
              bRadius={borderRadius}
              stemLength={stemLength}
              stemLoc={stemLoc}
            />

            <Tagline
              height={height}
              bRadius={borderRadius}
              stemLoc={stemLoc}
              variants={tagV}
            >
              {tagline}
            </Tagline>
          </>
        )}
    </Container>
  );
}

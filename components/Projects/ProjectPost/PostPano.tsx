import type { Variants } from "framer-motion";
import { AnimatePresence, motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Logo from "@/components/Nav/Logo";

const Container = styled(motion.figure)`
  width: 100%;
  height: 60vh;
  position: relative;
  margin: 3vw 0 1vw 0;
  z-index: 5;
  cursor: grab;
`;

const PlaceholderImage = styled(motion.span)`
  width: 100%;
  height: 60vh;
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const placeholderV: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

const logoV: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      type: "tween",
      ease: "linear",
      duration: 1,
    },
  },
};

// Declared once at module scope: calling dynamic() during render made a new
// component type every render, so the viewer remounted (and re-downloaded the
// panorama) whenever this component re-rendered, e.g. right after onReady.
const ReactPhotoSphereViewer = dynamic(
  () =>
    import("react-photo-sphere-viewer").then(
      (mod) => mod.ReactPhotoSphereViewer,
    ),
  {
    ssr: false,
  },
);

interface PostPanoProps {
  src: string;
  children?: ReactNode;
}

export default function PostPano({ src, children }: PostPanoProps) {
  const [isReady, setIsReady] = useState(false);
  const theme = useTheme();
  // Panoramas are large, so only start loading once the reader scrolls near.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "50%" });

  return (
    <Container ref={ref}>
      {inView && (
        <ReactPhotoSphereViewer
          keyboard="fullscreen"
          src={src}
          height={"60vh"}
          width={"100%"}
          //navbar={false}
          onReady={() => setIsReady(true)}
          //plugins={[AutorotatePlugin]}
        />
      )}
      <AnimatePresence>
        {!isReady && (
          <PlaceholderImage
            key={`${src}_placeholder_pano`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={placeholderV}
            style={{
              backgroundColor: theme.primary_superdark,
            }}
          >
            <Logo variants={logoV} color={theme.primary_light} />
          </PlaceholderImage>
        )}
      </AnimatePresence>
      {children}
    </Container>
  );
}

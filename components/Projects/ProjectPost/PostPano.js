import styled, { ThemeContext } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import Logo from "@/components/Nav/Logo";
import dynamic from "next/dynamic";

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

const placeholderV = {
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

const logoV = {
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


export default function PostPano({ src, children }) {
  const [isReady, setIsReady] = useState(false);
  const theme = useContext(ThemeContext);

  const ReactPhotoSphereViewer = dynamic(
    () =>
      import("react-photo-sphere-viewer").then(
        (mod) => mod.ReactPhotoSphereViewer
      ),
    {
      ssr: false,
    }
  );

  return (
    <Container>
      <ReactPhotoSphereViewer
        keyboard="fullscreen"
        src={src}
        height={"60vh"}
        width={"100%"}
        //navbar={false}
        onReady={() => setIsReady(true)}
        //plugins={[AutorotatePlugin]}
      />
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

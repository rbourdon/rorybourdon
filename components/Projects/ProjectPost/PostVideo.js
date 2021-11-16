import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
  margin: 2vw 0;
  position: relative;
`;

const Video = styled(motion.video)`
  width: 100%;
  height: max-content;
  display: block;
`;

const PlaceholderImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: block;
  background-color: black;
  z-index: 2;
`;

export default function PostVideo({
  src,
  placeholder,
  alt = "Sorry, your browser doesn't support embedded videos.",
  children,
}) {
  const [videoReady, setVideoReady] = useState(false);
  const [allowPlay, setAllowPlay] = useState(false);

  useEffect(() => {
    setAllowPlay(true);
  }, []);

  return (
    <Container>
      {src && allowPlay && (
        <Video
          style={{
            width: "100%",
            maxHeight: "100%",
          }}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoReady(true)}
        >
          <source src={src} type="video/mp4" />
          {alt}
        </Video>
      )}
      <PlaceholderImage style={{ opacity: videoReady ? 0 : 1 }}>
        {placeholder}
      </PlaceholderImage>

      {children}
    </Container>
  );
}

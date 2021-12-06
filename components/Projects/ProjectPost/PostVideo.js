import styled, { ThemeContext } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Logo from "@/components/Nav/Logo";

const Container = styled(motion.figure)`
  width: 100%;
  max-width: 100%;
  height: max-content;
  margin: 2.5vw 0 1vw 0;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 555px) {
    margin: 10vw 0 4vw 0;
  }
`;

const VideoContainer = styled(motion.figure)`
  width: 100%;
  overflow: hidden;
  height: 0;
  position: relative;
`;

const Video = styled(motion.video)`
  max-width: 100%;
  display: block;
  position: absolute;
  top: 0;
`;

const PlaceholderImage = styled(motion.span)`
  width: 100%;
  height: 100%;
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

export default function PostVideo({
  src,
  alt = "Sorry, your browser doesn't support embedded videos.",
  children,
  priority = false,
  width = 1908,
  height = 1004,
}) {
  const theme = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(false);
  const [allowPlay, setAllowPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const vidRef = useRef();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    setAllowPlay(true);
  }, []);

  useEffect(() => {
    if ((inView || priority) && !loaded && allowPlay) {
      const loadVid = setTimeout(() => {
        vidRef.current.children[0].src = vidRef.current.children[0].dataset.src;
        vidRef.current.load();
        setLoaded(true);
      }, 100);
      return () => {
        clearTimeout(loadVid);
      };
    }
  }, [inView, loaded, allowPlay, priority]);

  return (
    <Container ref={ref}>
      <VideoContainer style={{ paddingTop: `calc(${height / width} * 100%)` }}>
        {allowPlay && (
          <Video
            key={src}
            ref={vidRef}
            autoPlay
            loop
            muted
            playsInline
            onPlaying={() => setPlaying(true)}
            preload="auto"
          >
            <source data-src={src} type="video/mp4" />
            {alt}
          </Video>
        )}
        <AnimatePresence>
          {!playing && (
            <PlaceholderImage
              key={`${src}_placeholder`}
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
          )
        </AnimatePresence>
      </VideoContainer>
      {children}
    </Container>
  );
}

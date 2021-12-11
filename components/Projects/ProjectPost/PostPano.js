import styled from "styled-components";
import { animate, motion, useMotionValue } from "framer-motion";
import ReactPannellum, {
  setPitch,
  setYaw,
  getYaw,
  getPitch,
  stopAutoRotate,
  startAutoRotate,
} from "react-pannellum";
import { useEffect, useRef } from "react";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
  margin: 3vw 0 1vw 0;
  z-index: 5;
  cursor: grab;
`;

const style = {
  width: "100%",
  height: "60vh",
  background: "rgb(219, 216, 222)",
  cursor: "grab",
};

const config = {
  autoRotate: -4,
  autoLoad: true,
  draggable: false,
  showControls: false,
  escapeHTML: true,
  autoRotateInactivityDelay: 3000,
  author: "Rory Bourdon",
};

export default function PostPano({ src, children }) {
  const viewerRef = useRef(null);
  const pitch = useMotionValue(0);
  const yaw = useMotionValue(0);

  useEffect(() => {
    const unsubPitch = pitch.onChange((latest) => {
      setPitch(latest, false);
    });
    const unsubYaw = yaw.onChange((latest) => {
      setYaw(latest, false);
    });
    return () => {
      unsubPitch();
      unsubYaw();
    };
  }, [pitch, yaw]);

  const handlePan = (e, pointInfo) => {
    pitch.set(pitch.get() + pointInfo.delta.y / 5);
    yaw.set(yaw.get() + (pointInfo.delta.x * -1) / 5);
  };

  const handlePanStart = () => {
    pitch.stop();
    stopAutoRotate();
    yaw.set(getYaw());
    pitch.set(getPitch());
  };
  const handlePanEnd = () => {
    animate(pitch, 0, {
      duration: 2,
      ease: "easeInOut",
      onComplete: startAutoRotate,
    });
  };

  return (
    <Container
      onPan={handlePan}
      onPanStart={handlePanStart}
      onPanEnd={handlePanEnd}
      ref={viewerRef}
    >
      <ReactPannellum
        id={src}
        sceneId="home"
        imageSource={src}
        config={config}
        style={style}
      />
      {children}
    </Container>
  );
}

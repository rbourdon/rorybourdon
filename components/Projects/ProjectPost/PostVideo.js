import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
`;

export default function PostVideo({
  src,
  alt = "Sorry, your browser doesn't support embedded videos.",
  children,
}) {
  return (
    <Container>
      {src && (
        <video style={{ width: "100%", maxHeight: "100%" }} autoPlay loop muted>
          <source src={src} type="video/mp4" />
          {alt}
        </video>
      )}
      {children}
    </Container>
  );
}

import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vw 0 1vw 0;
`;

export default function PostImage({
  src,
  width,
  height,
  alt = "",
  quality = 90,
  priority = false,
  children,
}) {
  return (
    <Container>
      {src !== "" && (
        <Image
          style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
          src={src}
          alt={alt}
          priority={priority}
          height={height}
          width={width}
          quality={quality}
          sizes="100vw"
        />
      )}
      {children}
    </Container>
  );
}

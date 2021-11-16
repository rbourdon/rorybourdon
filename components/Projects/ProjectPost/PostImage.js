import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
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
          src={src}
          width={width}
          height={height}
          alt={alt}
          quality={quality}
          priority={priority}
        />
      )}
      {children}
    </Container>
  );
}

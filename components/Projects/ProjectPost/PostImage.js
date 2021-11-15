import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
`;

export default function PostImage({
  src,
  width,
  height,
  alt = "",
  quality = 85,
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

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import styled from "styled-components";

const Container = styled(motion.figure)`
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vw 0 1vw 0;
`;

interface PostImageProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  quality?: number;
  preload?: boolean;
  /** Older CMS posts still pass `priority`; treated the same as `preload`. */
  priority?: boolean;
  children?: ReactNode;
}

export default function PostImage({
  src,
  width,
  height,
  alt = "",
  quality = 90,
  preload = false,
  priority = false,
  children,
}: PostImageProps) {
  return (
    <Container>
      {src !== "" && (
        <Image
          style={{ maxWidth: "100%", height: "100%", objectFit: "contain" }}
          src={src}
          alt={alt}
          preload={preload || priority}
          height={height}
          width={width}
          quality={quality}
          // Posts sit in the article column, which is at most ~70% of the
          // viewport on desktop and full width on phones.
          sizes="(max-width: 555px) 100vw, 70vw"
        />
      )}
      {children}
    </Container>
  );
}

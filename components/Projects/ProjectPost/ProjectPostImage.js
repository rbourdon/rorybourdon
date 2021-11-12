import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const PostImage = styled(motion.figure)`
  width: 100%;
  height: max-content;
  padding: 20px 0;
`;

export default function ProjectPostImage({
  src,
  width,
  height,
  alt = "",
  quality = 75,
  priority = false,
  children,
}) {
  return (
    <PostImage>
      {src && (
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
    </PostImage>
  );
}

import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import CodeIcon from "@/components/Icons/CodeIcon";
import ExternalLinkIcon from "@/components/Icons/ExternalLinkIcon";
import Link from "next/link";
import { useContext } from "react";

const Container = styled(motion.a)`
  max-width: 100%;
  max-height 100%;
  display: grid;
  grid-template-columns: 23px 1fr;
  grid-template-rows: 1fr;
  column-gap: 8px;
  padding: 10px 20px;
  font-size: 1.08rem;
  line-height: 1.25;
  position: relative;
  index: 3;
`;

const Backdrop = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  user-select: none;
  pointer-events: none;
`;

export default function ProjectLink({ type = "Demo", href = "", iconColor }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, iconColor, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  const iconRotate = useTransform(
    hover,
    [0, 1],
    [0, type === "Demo" ? -20 : 20]
  );

  const handleHoverStart = () => {
    animate(hover, 1, { duration: 0.3 });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { duration: 0.3 });
  };

  return (
    <Link href={href} passHref>
      <Container
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{
          color,
        }}
      >
        {/* <Backdrop
          style={{
            backgroundColor: theme.primary_dark,
            width,
            height,
            originX: 0.5,
            borderRadius,
            left,
            top,
          }}
        /> */}
        {type === "Code" ? (
          <CodeIcon rotate={iconRotate} />
        ) : (
          <ExternalLinkIcon rotate={iconRotate} />
        )}
        <motion.span>{type}</motion.span>
      </Container>
    </Link>
  );
}

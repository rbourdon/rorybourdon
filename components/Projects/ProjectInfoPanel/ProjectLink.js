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

const LinkContainer = styled(motion.a)`
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

  &:focus {
    outline: none;
  }
`;

const Container = styled(motion.div)`
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
  

  &:focus {
    outline: none;
  }
`;

export default function ProjectLink({ type = "Demo", href = "", iconColor }) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, iconColor || theme.primary_light, hover],
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

  return href ? (
    <Link href={href} passHref>
      <LinkContainer
        rel="noopener"
        target="_blank"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
        style={{
          color,
        }}
      >
        {type === "Code" ? (
          <CodeIcon rotate={iconRotate} />
        ) : (
          <ExternalLinkIcon rotate={iconRotate} />
        )}
        <motion.span>{type}</motion.span>
      </LinkContainer>
    </Link>
  ) : (
    <Container
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
      style={{
        color: theme.primary_slightlydark,
      }}
    >
      {type === "Code" ? (
        <CodeIcon rotate={iconRotate} />
      ) : (
        <ExternalLinkIcon rotate={iconRotate} />
      )}
      <motion.span
        style={{ whiteSpace: "nowrap" }}
      >{`${type} Unavailable`}</motion.span>
    </Container>
  );
}

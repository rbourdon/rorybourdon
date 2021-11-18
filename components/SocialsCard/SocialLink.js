import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useContext } from "react";
import Link from "next/link";
import TwitterIcon from "./TwitterIcon";
import LinkedInIcon from "./LinkedInIcon";
import GithubIcon from "./GithubIcon";
import InstagramIcon from "./InstagramIcon";

const Container = styled(motion.a)`
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export default function SocialLink({ href = "/", platform, hoverColor }) {
  const theme = useContext(ThemeContext);

  const hover = useMotionValue(0);

  const handleHoverStart = () => {
    animate(hover, 1, { duration: 0.3, type: "tween" });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { duration: 0.3, type: "tween" });
  };

  const color = useTransform(
    [hover, theme.primary_verydark, hoverColor || theme.primary_mediumdark],
    ([latestHover, latestColor1, latestColor2]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
  );

  return (
    <Link href={href} passHref>
      <Container
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ color }}
      >
        {
          {
            twitter: <TwitterIcon />,
            github: <GithubIcon />,
            instagram: <InstagramIcon />,
            linkedin: <LinkedInIcon />,
          }[platform]
        }
      </Container>
    </Link>
  );
}
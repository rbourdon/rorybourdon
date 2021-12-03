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
import TwitterIcon from "./Icons/TwitterIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import GithubIcon from "./Icons/GithubIcon";
import InstagramIcon from "./Icons/InstagramIcon";

const Container = styled(motion.a)`
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const socialLinkV = {
  hidden: {
    y: -120,
    transition: {
      type: "spring",
      duration: 0.3,
    },
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      duration: 0.5,
    },
  },
  selected: {
    y: 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

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
        rel="noopener"
        target="_blank"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ color }}
        variants={socialLinkV}
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

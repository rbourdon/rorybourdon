import {
  animate,
  type MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";

import styled, { useTheme } from "styled-components";
import GithubIcon from "./Icons/GithubIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import TwitterIcon from "./Icons/TwitterIcon";

const Container = styled(motion.a)`
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const socialLinkV: Variants = {
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

export type SocialPlatform = "twitter" | "github" | "instagram" | "linkedin";

interface SocialLinkProps {
  href?: string;
  platform: SocialPlatform;
  hoverColor?: MotionValue<string>;
}

export default function SocialLink({
  href = "/",
  platform,
  hoverColor,
}: SocialLinkProps) {
  const theme = useTheme();

  const hover = useMotionValue(0);

  const handleHoverStart = () => {
    animate(hover, 1, { duration: 0.3, type: "tween" });
  };

  const handleHoverEnd = () => {
    animate(hover, 0, { duration: 0.3, type: "tween" });
  };

  const color = useTransform(
    [
      hover,
      theme.primary_verydark,
      hoverColor || theme.primary_mediumdark,
    ] as MotionValue<string | number>[],
    ([latestHover, latestColor1, latestColor2]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
  );

  return (
    <Link href={href} passHref legacyBehavior>
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

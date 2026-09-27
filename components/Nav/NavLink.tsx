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
import type { ReactNode } from "react";

import styled, { useTheme } from "styled-components";

const LinkText = styled(motion.a)`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 200;
  position: relative;
  z-index: 5;
  &:focus {
    outline: none;
  }
`;

const Text = styled(motion.button)`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 200;
  cursor: pointer;
  border: none;
  background: none;
  position: relative;
`;

const navV: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

interface NavLinkProps {
  children: ReactNode;
  href?: string;
  name: string;
  setHoveredLink: ((name: string) => void) | null;
  onClick?: (() => void) | null;
}

export default function NavLink({
  children,
  href,
  name,
  setHoveredLink,
  onClick,
}: NavLinkProps) {
  const theme = useTheme();
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, theme.primary_slightlydark, hover] as MotionValue<
      string | number
    >[],
    ([latestColor1, latestColor2, latestHover]: (string | number)[]) =>
      transform(
        latestHover as number,
        [0, 1],
        [latestColor1 as string, latestColor2 as string],
      ),
  );

  const handleHoverEnd = () => {
    animate(hover, 0, {
      duration: 0.4,
    });
  };

  const handleHoverStart = () => {
    animate(hover, 1, {
      duration: 0.4,
    });
    setHoveredLink && setHoveredLink(name);
  };

  return href ? (
    <Link href={href} passHref legacyBehavior>
      <LinkText
        variants={navV}
        style={{ color }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
        onClick={onClick ?? undefined}
      >
        {children}
      </LinkText>
    </Link>
  ) : (
    <Text
      variants={navV}
      onClick={onClick ?? undefined}
      style={{ color }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      {children}
    </Text>
  );
}

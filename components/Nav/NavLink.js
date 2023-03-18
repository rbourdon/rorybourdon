import styled, { ThemeContext } from "styled-components";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useContext } from "react";

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

const navV = {
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

export default function NavLink({
  children,
  href,
  name,
  setHoveredLink,
  onClick,
}) {
  const theme = useContext(ThemeContext);
  const hover = useMotionValue(0);

  const color = useTransform(
    [theme.primary_dark, theme.primary_slightlydark, hover],
    ([latestColor1, latestColor2, latestHover]) =>
      transform(latestHover, [0, 1], [latestColor1, latestColor2])
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
        onClick={onClick}
      >
        {children}
      </LinkText>
    </Link>
  ) : (
    <Text
      variants={navV}
      onClick={onClick}
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

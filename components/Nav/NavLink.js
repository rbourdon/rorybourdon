import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const LinkText = styled(motion.a)`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 100;
`;

const Text = styled(motion.button)`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 100;
  cursor: pointer;
  border: none;
  background: none;
`;

const navV = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 0.3,
    },
  },
};

export default function NavLink({ children, href, onClick }) {
  return href ? (
    <Link href={href} passHref onClick={onClick}>
      <LinkText variants={navV}>{children}</LinkText>
    </Link>
  ) : (
    <Text variants={navV} onClick={onClick}>
      {children}
    </Text>
  );
}

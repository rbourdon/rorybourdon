import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const Text = styled(motion.a)`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 100;
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

export default function NavLink({ children, href }) {
  return (
    <Link href={href} passHref>
      <Text variants={navV}>{children}</Text>
    </Link>
  );
}

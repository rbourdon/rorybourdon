import styled from "styled-components";
import { motion } from "framer-motion";
import CodeIcon from "@/components/Icons/CodeIcon";
import ExternalLinkIcon from "@/components/Icons/ExternalLinkIcon";
import Link from "next/link";

const Container = styled(motion.nav)`
  max-width: 100%;
  max-height 100%;
  display: grid;
  grid-template-columns: 23px 1fr;
  grid-template-rows: 1fr;
  column-gap: 8px;
  padding: 10px 0;
  font-size: 1.08rem;
  line-height: 1.25;
`;

export default function ProjectLink({
  type = "External",
  href = "",
  iconColor,
}) {
  return (
    <Container style={{ color: iconColor }}>
      {type === "Code" ? <CodeIcon /> : <ExternalLinkIcon />}
      <Link href={href}>{type}</Link>
    </Container>
  );
}

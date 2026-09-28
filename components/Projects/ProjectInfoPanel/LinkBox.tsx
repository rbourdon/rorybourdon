import type { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

export default function ProjectLinkBox({ children }: { children?: ReactNode }) {
  return <Container>{children}</Container>;
}

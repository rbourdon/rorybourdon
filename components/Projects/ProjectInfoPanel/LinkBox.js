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

export default function ProjectLinkBox({ children }) {
  return <Container>{children}</Container>;
}

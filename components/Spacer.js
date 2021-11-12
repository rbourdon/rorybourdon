import styled from "styled-components";

const Container = styled.span`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: block;
`;

export default function Spacer({ width = 50, height = 50 }) {
  return <Container $width={width} $height={height} />;
}

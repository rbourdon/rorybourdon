import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
`;

export default function Spacer({ width = 5, height = 5 }) {
  return <Container $width={width} $height={height} />;
}

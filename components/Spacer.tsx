import styled from "styled-components";

const Container = styled.div<{ $width: number; $height: number }>`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
`;

interface SpacerProps {
  width?: number;
  height?: number;
}

export default function Spacer({ width = 5, height = 5 }: SpacerProps) {
  return <Container $width={width} $height={height} />;
}

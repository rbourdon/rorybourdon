import styled, { ThemeContext } from "styled-components";
import { motion, useTransform } from "framer-motion";
import { useContext } from "react";

const Container = styled(motion.div)`
  width: ${(props) => props.$width + "px"};
  height: ${(props) => props.$height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export default function CardBacking({
  width,
  height,
  bRadius,
  sWidth,
  backingV,
  keyShadow,
  bgColor,
}) {
  const theme = useContext(ThemeContext);
  const boxShadow = useTransform(
    [theme.shadow_key, theme.shadow_ambient],
    ([latestShadow1, latestShadow2]) =>
      keyShadow +
      " " +
      latestShadow1 +
      ", " +
      "0px 0px 30px 0px " +
      latestShadow2
  );
  return (
    <Container
      variants={backingV}
      style={{
        borderRadius: bRadius,
        boxShadow,
      }}
      $width={width}
      $height={height}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <motion.rect
          x={sWidth / 2 + "px"}
          y={sWidth / 2 + "px"}
          width={width - sWidth + "px"}
          height={height - sWidth + "px"}
          stroke="none"
          style={{
            fill: bgColor || theme.primary_light,
            rx: bRadius + "px",
          }}
        />
      </motion.svg>
    </Container>
  );
}

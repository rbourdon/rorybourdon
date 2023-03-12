import styled from "styled-components";
import { motion } from "framer-motion";
import GridGuideCell from "./GridGuideCell";
import { useEffect } from "react";

const GRID_GAP = 3;

const Container = styled(motion.div)`
  width: max-content;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(3, 25px);
  grid-template-rows: repeat(3, 25px);
  align-items: center;
  justify-items: center;
  column-gap: ${GRID_GAP}px;
  row-gap: ${GRID_GAP}px;
  position: absolute;
  isolation: isolate;
  z-index: 42;
  will-change: transform;
  top: 0;
  left: 0;
  padding: 5px;
  cursor: pointer;
`;

export default function GridGuide({
  hoverPose = "expandPose",
  hoverBehavior = "spin",
  clickPose = "arrowPose",
  defaultPose = "neutralPose",
  defaultBehavior = "wander",
  clickBehavior = "point",
  guideDispatch,
  guideState,
  rotate,
  x,
  y,
}) {
  useEffect(() => {
    guideDispatch({
      type: "updateAll",
      pose: defaultPose,
      behavior: defaultBehavior,
    });
  }, [defaultBehavior, defaultPose, guideDispatch]);

  const updateBehavior = (behavior) => {
    guideDispatch({ type: "updateBehavior", behavior: behavior });
  };

  const updatePose = (pose) => {
    guideDispatch({ type: "updatePose", pose: pose });
  };

  const updateAll = (pose, behavior) => {
    guideDispatch({
      type: "updateAll",
      pose: pose,
      behavior: behavior,
    });
  };

  const handlehoverStart = () => {
    guideState.currPose !== hoverPose && updateAll(hoverPose, hoverBehavior);
  };

  const handlehoverEnd = () => {
    guideState.currPose === hoverPose &&
      guideDispatch({
        type: "previousAll",
        pose: defaultPose,
        behavior: defaultBehavior,
      });
  };

  return (
    <Container
      variants={guideState.behavior.variants}
      initial={guideState.currBehavior === "init" ? "hidden" : "visible"}
      animate="visible"
      onHoverStart={handlehoverStart}
      onHoverEnd={handlehoverEnd}
      layoutId="gridGuide"
      transition={{ type: "spring", stiffness: 10, mass: 3, damping: 10 }}
      onTap={() => {
        updateBehavior(
          guideState.currBehavior === clickBehavior ||
            guideState.prevBehavior === clickBehavior
            ? defaultBehavior
            : clickBehavior
        );
        updatePose(
          guideState.currPose === clickPose || guideState.prevPose === clickPose
            ? defaultPose
            : clickPose
        );
      }}
      style={{ x, y, rotate }}
    >
      {guideState.pose.cells.map((item, index) => (
        <GridGuideCell
          delay={guideState.behavior.poseDelay}
          key={index}
          hightlight={index === 4}
          variants={item.variants}
        />
      ))}
    </Container>
  );
}

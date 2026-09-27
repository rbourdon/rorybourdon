import { useMotionValue } from "framer-motion";
import { useReducer } from "react";
import useWindowSize from "@/components/utils/useWindowSize";

const CELL_WIDTH = 25;
const CELL_HEIGHT = 25;
const GAP = 3;

const poses = {
  startPose: {
    id: "startPose",
    cellDelay: 0,
    cells: [
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
      { variants: { hidden: { x: 0, y: 0 }, visible: { x: 0, y: 0 } } },
    ],
  },
  neutralPose: {
    id: "neutralPose",
    cellDelay: 0.2,
    cells: [
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1.5 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: { x: 0, y: 0, transition: { type: "spring", duration: 1 } },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1.5 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: { x: 0, y: 0, transition: { type: "spring", duration: 1 } },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: { x: 0, y: 0, transition: { type: "spring", duration: 1 } },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: { x: 0, y: 0, transition: { type: "spring", duration: 1 } },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1.5 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: { x: 0, y: 0, transition: { type: "spring", duration: 1 } },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1.5 },
          },
        },
      },
    ],
  },
  expandPose: {
    id: "expandPose",
    cellDelay: 0,
    cells: [
      {
        variants: {
          hidden: {
            x: -0.22 * (CELL_WIDTH + GAP),
            y: -0.22 * (CELL_HEIGHT + GAP),
          },
          visible: {
            x: -0.22 * (CELL_WIDTH + GAP),
            y: -0.22 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: -0.2 * (CELL_WIDTH + GAP) },
          visible: {
            x: 0,
            y: -0.2 * (CELL_WIDTH + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: {
            x: 0.22 * (CELL_WIDTH + GAP),
            y: -0.22 * (CELL_HEIGHT + GAP),
          },
          visible: {
            x: 0.22 * (CELL_WIDTH + GAP),
            y: -0.22 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: { x: -0.22 * (CELL_WIDTH + GAP), y: 0 },
          visible: {
            x: -0.22 * (CELL_WIDTH + GAP),
            y: 0,
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0.22 * (CELL_WIDTH + GAP), y: 0 },
          visible: {
            x: 0.22 * (CELL_WIDTH + GAP),
            y: 0,
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: {
            x: -0.22 * (CELL_WIDTH + GAP),
            y: 0.22 * (CELL_HEIGHT + GAP),
          },
          visible: {
            x: -0.22 * (CELL_WIDTH + GAP),
            y: 0.22 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0.22 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
      {
        variants: {
          hidden: {
            x: 0.22 * (CELL_WIDTH + GAP),
            y: 0.22 * (CELL_HEIGHT + GAP),
          },
          visible: {
            x: 0.22 * (CELL_WIDTH + GAP),
            y: 0.22 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 0.8 },
          },
        },
      },
    ],
  },
  arrowPose: {
    id: "arrowPose",
    cellDelay: 1.45,

    cells: [
      {
        variants: {
          hidden: { x: 1 * (CELL_WIDTH + GAP), y: -1 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: 1 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: -1 * (CELL_WIDTH + GAP), y: -2 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: -1 * (CELL_WIDTH + GAP),
            y: -2 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: -1 * (CELL_WIDTH + GAP), y: -1 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: -1 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: {
            x: 1 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: 1 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: {
            x: -0.25 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: -0.25 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0.25 * (CELL_WIDTH + GAP), y: -1 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: 0.25 * (CELL_WIDTH + GAP),
            y: -1 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
    ],
  },
  treePose: {
    id: "treePose",
    cellDelay: 0.7,

    cells: [
      {
        variants: {
          hidden: {
            x: -0.2 * (CELL_WIDTH + GAP),
            y: -2.5 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: -0.2 * (CELL_WIDTH + GAP),
            y: -2.5 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: {
            x: 0.15 * (CELL_WIDTH + GAP),
            y: -2.5 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: 0.15 * (CELL_WIDTH + GAP),
            y: -2.5 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: {
            x: 0.1 * (CELL_WIDTH + GAP),
            y: -2.4 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: 0.1 * (CELL_WIDTH + GAP),
            y: -2.4 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: {
            x: 0.4 * (CELL_WIDTH + GAP),
            y: -2.4 * (CELL_HEIGHT + GAP),
          },
          visible: (custom) => ({
            x: 0.4 * (CELL_WIDTH + GAP),
            y: -2.4 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: -2.3 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: 0,
            y: -2.3 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: (custom) => ({
            x: 0,
            y: 0,
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
      {
        variants: {
          hidden: { x: 0, y: -2.3 * (CELL_HEIGHT + GAP) },
          visible: (custom) => ({
            x: 0,
            y: -2.3 * (CELL_HEIGHT + GAP),
            transition: { type: "spring", duration: 1, delay: custom },
          }),
        },
      },
    ],
  },
  gearPose: {
    id: "gearPose",
    cellDelay: 0,
    cells: [
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            rotate: [null, 360],
            originY: CELL_HEIGHT * 1.5 + GAP + "px",
            transition: {
              rotate: { repeat: Infinity, ease: "linear", duration: 4 },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: {
            x: 0,
            y: 1 * (CELL_HEIGHT + GAP),
            rotate: [null, 360],
            originX: -(CELL_WIDTH / 2 + GAP) + "px",
            transition: { rotate: { repeat: Infinity } },
          },
          visible: {
            x: 0,
            y: 1 * (CELL_HEIGHT + GAP),
            rotate: [null, 360],
            originX: -(CELL_WIDTH / 2 + GAP) + "px",
            transition: {
              rotate: { repeat: Infinity, ease: "linear", duration: 4 },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 1 * (CELL_HEIGHT + GAP) },
          visible: {
            x: 0,
            y: 1 * (CELL_HEIGHT + GAP),
            rotate: [null, -360],
            originY: CELL_HEIGHT * 1.5 + GAP + "px",
            transition: {
              rotate: {
                delay: 0.05,
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: {
            x: -1 * (CELL_WIDTH + GAP),
            y: 0,
            rotate: [null, 360],
            originX: CELL_WIDTH * 1.5 + GAP + "px",
          },
          visible: {
            x: -1 * (CELL_WIDTH + GAP),
            y: 0,
            rotate: [null, 360],
            originX: CELL_WIDTH * 1.5 + GAP + "px",
            transition: {
              rotate: { repeat: Infinity, ease: "linear", duration: 4 },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: -1 * (CELL_WIDTH + GAP), y: 0 },
          visible: {
            x: -1 * (CELL_WIDTH + GAP),
            y: 0,
            transition: {
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: 1 * (CELL_WIDTH + GAP), y: 1 * (CELL_HEIGHT + GAP) },
          visible: {
            x: 1 * (CELL_WIDTH + GAP),
            y: 1 * (CELL_HEIGHT + GAP),
            rotate: [null, -360],
            originX: -(CELL_WIDTH / 2 + GAP) + "px",
            transition: {
              rotate: {
                delay: 0.05,
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            rotate: [null, 360],
            originY: -(CELL_WIDTH / 2 + GAP) + "px",
            transition: {
              rotate: { repeat: Infinity, ease: "linear", duration: 4 },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 0 },
          visible: {
            x: 0,
            y: 0,
            rotate: [null, -360],
            originX: CELL_WIDTH * 1.5 + GAP + "px",
            transition: {
              rotate: {
                delay: 0.05,
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
      {
        variants: {
          hidden: { x: 0, y: 1 * (CELL_HEIGHT + GAP) },
          visible: {
            x: 0,
            y: 1 * (CELL_HEIGHT + GAP),
            rotate: [null, -360],
            originY: -(CELL_WIDTH / 2 + GAP) + "px",
            transition: {
              rotate: {
                delay: 0.05,
                repeat: Infinity,
                ease: "linear",
                duration: 4,
              },
              type: "spring",
              duration: 1,
            },
          },
        },
      },
    ],
  },
};

function guideReducer(guideState, action) {
  switch (action.type) {
    case "updatePose":
      return {
        prevPose: guideState.currPose,
        currPose: action.pose,
        prevBehavior: guideState.prevBehavior,
        currBehavior: guideState.currBehavior,
      };
    case "previousPose":
      return {
        prevPose: action.pose,
        currPose: guideState.prevPose,
        prevBehavior: guideState.prevBehavior,
        currBehavior: guideState.currBehavior,
      };
    case "updateBehavior":
      return {
        currBehavior: action.behavior,
        prevBehavior: guideState.currBehavior,
        prevPose: guideState.prevPose,
        currPose: guideState.currPose,
      };
    case "previousBehavior":
      return {
        prevBehavior: action.behavior,
        currBehavior: guideState.prevBehavior,
        prevPose: guideState.prevPose,
        currPose: guideState.currPose,
      };
    case "updateAll":
      return {
        prevBehavior: guideState.currBehavior,
        currBehavior: action.behavior,
        prevPose: guideState.currPose,
        currPose: action.pose,
      };
    case "previousAll":
      return {
        prevBehavior: action.behavior,
        currBehavior: guideState.prevBehavior,
        prevPose: action.pose,
        currPose: guideState.prevPose,
      };
    default:
      throw new Error(action.type);
  }
}

function useGuide() {
  const { width, height } = useWindowSize();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const behaviors = {
    wander: {
      id: "wander",
      poseDelay: 0,
      variants: {
        hidden: {
          rotate: 0,
          opacity: 1,
          x: width * 0.6,
          y: height * 0.6,
        },
        visible: {
          x: [
            null,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            Math.random() * width * 0.8 + width * 0.1,
            width * 0.4,
          ],
          y: [
            null,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            Math.random() * height * 0.35 + height * 0.35,
            height * 0.4,
          ],
          rotate: [null, 90, -45, 0, -90, 45, 0],
          opacity: 1,
          transition: {
            opacity: { delay: 3, duration: 1 },
            ease: "easeInOut",
            duration: 80,
            repeatType: "reverse",
            repeat: Infinity,
            rotate: {
              ease: "easeInOut",
              duration: 40,
              repeatType: "reverse",
              repeat: Infinity,
            },
          },
        },
      },
    },
    point: {
      id: "point",
      poseDelay: 1.6,
      variants: {
        hidden: {
          x: width * 0.55,
          y: height * 0.7,
          rotate: 380,
          opacity: 0,
        },
        visible: {
          x: width * 0.55,
          y: height * 0.7,
          rotate: 380,
          opacity: 1,
          transition: {
            opacity: { delay: 0.5, duration: 1.3 },
            rotate: {
              duration: 2.1,
              ease: "easeInOut",
            },
            duration: 1.9,
            ease: "easeInOut",
          },
        },
      },
    },
    still: {
      id: "still",
      poseDelay: 0,
      variants: {
        hidden: {
          x: x.get(),
          y: y.get(),
          rotate: rotate.get(),
          opacity: 0,
        },
        visible: {
          x: x.get() + x.getVelocity() * 13,
          y: y.get() + y.getVelocity() * 13,
          rotate: 0,
          opacity: 1,
          transition: {
            opacity: { delay: 0.5, duration: 1.3 },
            rotate: { duration: 2.8, ease: "linear" },
            type: "inertia",
          },
        },
      },
    },
    spin: {
      id: "spin",
      poseDelay: 0,
      variants: {
        hidden: {
          x: x.get(),
          y: y.get(),
          rotate: rotate.get(),
          opacity: 0,
        },
        visible: {
          x: x.get() + x.getVelocity() * 13,
          y: y.get() + y.getVelocity() * 13,
          rotate: [
            rotate.get(),
            rotate.get() + 360 * Math.sign(rotate.getVelocity()),
          ],
          opacity: 1,
          transition: {
            opacity: { delay: 0.5, duration: 1.3 },
            rotate: {
              type: "tween",
              repeat: Infinity,
              duration: 2.8,
              ease: "linear",
            },
            x: {
              type: "inertia",
              velocity: x.getVelocity(),
            },
            y: {
              type: "inertia",
              velocity: y.getVelocity(),
            },
          },
        },
      },
    },
    tree: {
      id: "tree",
      poseDelay: 1.7,
      variants: {
        hidden: {
          x: width * 0.65,
          y: height * 0.42,
          rotate: [null, 0],
          opacity: 1,
        },
        visible: {
          x: width * 0.65,
          y: height * 0.42,
          rotate: [null, 0],
          opacity: 1,
          transition: {
            ease: "easeInOut",
            duration: 1.7,
            rotate: {
              ease: "easeInOut",
              duration: 2,
            },
          },
        },
      },
    },
    gear: {
      id: "gear",
      poseDelay: 0,
      variants: {
        hidden: {
          x: width * 0.7,
          y: height * 0.27,
          opacity: 0,
        },
        visible: {
          x: width * 0.7,
          y: height * 0.27,
          opacity: 1,
          transition: {
            duration: 1.2,
          },
        },
      },
    },
    init: {
      id: "init",
      poseDelay: 0,
      variants: {
        hidden: {
          rotate: 0,
          x: width ? width * 0.5 : 0,
          y: height ? height * 0.5 : 0,
          opacity: 0,
          transition: {
            duration: 1,
          },
        },
        visible: {
          x: width ? width * 0.5 : 0,
          y: height ? height * 0.5 : 0,
          rotate: 0,
          opacity: 1,
          transition: {
            duration: 1,
          },
        },
      },
    },
  };

  const [guideState, guideDispatch] = useReducer(guideReducer, {
    prevPose: "startPose",
    currPose: "startPose",
    prevBehavior: "init",
    currBehavior: "init",
  });

  // const [behaviorState, behaviorDispatch] = useReducer(behaviorReducer, {
  //   prevBehavior: "init",
  //   currBehavior: "init",
  // });

  // const variants = poses[guideState.currentPose]
  //   ? behaviors[poses[guideState.currentPose].behavior].variants
  //   : behaviors[poses.neutralPose.behavior].variants;
  // console.log({
  //   ...guideState,
  //   pose: poses[guideState.currPose],
  // });

  return {
    guideState: {
      ...guideState,
      pose: poses[guideState.currPose],
      behavior: behaviors[guideState.currBehavior],
    },
    guideDispatch,
    x,
    y,
    rotate,
  };
}

export default useGuide;

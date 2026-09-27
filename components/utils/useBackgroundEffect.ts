import {
  animate,
  type SpringOptions,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export interface EffectStyle {
  x: number;
  y: number;
  scale: number;
  delay: number;
}

function useBackgroundEffect(inView: boolean, effectStyle: EffectStyle) {
  const { scrollY } = useScroll();
  const scrollOffsetY = useMotionValue(0);
  const baseY = useMotionValue(200);
  const finalY = useTransform(
    [scrollOffsetY, baseY],
    ([latestOffset, latestBase]: number[]) =>
      effectStyle.y + latestOffset * (effectStyle.scale - 0.125) + latestBase,
  );

  const effectY = useSpring(finalY, {
    type: "spring",
    stiffness: 140 * effectStyle.scale,
    mass: 2.5 * effectStyle.scale,
    damping: 22 * effectStyle.scale,
    // `type` is not in SpringOptions; kept as-is to avoid touching behaviour
  } as SpringOptions);

  useEffect(() => {
    if (!inView) {
      const baseOut = animate(
        baseY,
        Math.abs(scrollOffsetY.get()) > 0
          ? Math.sign(scrollOffsetY.get()) * 200
          : 200,
        {
          type: "tween",
          duration: 1.5 * effectStyle.scale,
          ease: "linear",
        },
      );
      const scrollOut = animate(scrollOffsetY, 0, {
        delay: effectStyle.delay,
        type: "tween",
        duration: 1.5 * effectStyle.scale,
        ease: "linear",
      });
      return () => {
        scrollOut.stop();
        baseOut.stop();
      };
    } else {
      const baseIn = animate(baseY, 0, {
        delay: effectStyle.delay,
        type: "tween",
        duration: 1.5 * effectStyle.scale,
        ease: "linear",
      });
      const scrollIn = animate(scrollOffsetY, 0, {
        delay: effectStyle.delay,
        type: "tween",
        duration: 1.5 * effectStyle.scale,
        ease: "linear",
      });
      return () => {
        scrollIn.stop();
        baseIn.stop();
      };
    }
  }, [
    baseY,
    effectStyle.delay,
    effectStyle.scale,
    effectStyle.y,
    inView,
    scrollOffsetY,
  ]);

  useEffect(() => {
    const unsubscribeY = scrollY.on("change", (progress) => {
      if (inView && baseY.get() === 0) {
        scrollOffsetY.set(
          scrollOffsetY.get() -
            (progress - (scrollY.getPrevious() as number)) * 0.325,
        );
      }
    });
    return () => {
      unsubscribeY();
    };
  }, [baseY, effectStyle.y, inView, scrollOffsetY, scrollY]);

  return effectY;
}

export default useBackgroundEffect;

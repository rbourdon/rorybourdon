import {
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

function useBackgroundEffect(inView, style) {
  const { scrollY } = useViewportScroll();
  const scrollOffsetY = useMotionValue(0);
  const baseY = useMotionValue(style.y + 150);
  const finalY = useTransform(
    [scrollOffsetY, baseY],
    ([latestOffset, latestBase]) =>
      latestOffset * (style.scale - 0.125) + latestBase
  );

  const y = useSpring(finalY, {
    type: "spring",
    stiffness: 140,
    mass: 2.5 * style.scale,
    damping: 22 * style.scale,
  });

  useEffect(() => {
    baseY.stop();
    if (!inView) {
      animate(
        baseY,
        Math.abs(scrollOffsetY.get()) > 0
          ? style.y + Math.sign(scrollOffsetY.get()) * 150
          : style.y + 150,
        {
          type: "spring",
          stiffness: 60,
          mass: 1 * style.scale,
          damping: 28 * style.scale,
        }
      );
    } else {
      //   baseY.set(
      //     Math.abs(scrollOffsetY.get()) > 0
      //       ? style.y + Math.sign(scrollOffsetY.get()) * 150
      //       : style.y + 150
      //   );
      scrollOffsetY.set(0);
      baseY.stop();
      animate(baseY, style.y, {
        delay: style.delay,
        type: "spring",
        stiffness: 60,
        mass: 1 * style.scale,
        damping: 28 * style.scale,
      });
    }
  }, [inView, style.delay, style.y, baseY, scrollOffsetY, style.scale]);

  useEffect(() => {
    const unsubscribeY = scrollY.onChange((progress) => {
      if (inView && !baseY.isAnimating()) {
        scrollOffsetY.set(
          scrollOffsetY.get() - (progress - scrollY.prev) * 0.325
        );
      }
    });
    return () => {
      unsubscribeY();
    };
  }, [baseY, inView, scrollOffsetY, scrollY, style.scale, style.y]);

  return y;
}

export default useBackgroundEffect;

"use client";

import { useEffect, useRef, useState } from "react";

/** The pixel size of an element, kept current as it resizes. */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      // offsetWidth ignores the stage's scale transform, which is what we want.
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

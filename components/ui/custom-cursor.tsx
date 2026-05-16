"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 220, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 28 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (isTouch) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] h-9 w-9 rounded-full border border-primary/70 bg-primary/10 mix-blend-screen shadow-glow"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}

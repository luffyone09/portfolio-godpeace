"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--accent), var(--teal))",
      }}
    />
  );
}

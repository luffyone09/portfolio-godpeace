"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let colors = { dot: "rgba(124,106,255,0.55)", line: "124,106,255", teal: "77,255,210" };
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const accent = cs.getPropertyValue("--accent").trim() || "#7c6aff";
      const light = document.documentElement.getAttribute("data-theme") === "light";
      colors = {
        dot: accent,
        line: light ? "100,85,230" : "124,106,255",
        teal: cs.getPropertyValue("--teal").trim() || "#4dffd2",
      };
    }

    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 26 : 56;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = colors.dot;
        ctx!.globalAlpha = 0.35;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = colors.dot;
        ctx!.globalAlpha = 0.4;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${colors.line},${(1 - dist / 130) * 0.13})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      drawStatic();
    } else {
      const onVisibility = () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(tick);
      };
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        themeObserver.disconnect();
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full"
      style={{
        maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, black 30%, transparent 78%)",
      }}
    />
  );
}

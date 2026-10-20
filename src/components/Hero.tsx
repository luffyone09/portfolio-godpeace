"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { siteIdentity } from "@/lib/site";
import { HeroCanvas } from "./HeroCanvas";
import { Magnetic } from "./ui/Magnetic";
import { IconCode, IconCloud, IconCpu, IconZap, IconShield, IconArrowUpRight } from "./icons";

const EASE = [0.23, 1, 0.32, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

const FLOATERS = [
  { Icon: IconCode, label: "Code", x: "6%", y: "18%", d: 0 },
  { Icon: IconCloud, label: "Cloud", x: "72%", y: "10%", d: 1.2 },
  { Icon: IconCpu, label: "IoT", x: "80%", y: "52%", d: 0.6 },
  { Icon: IconZap, label: "Automation", x: "12%", y: "62%", d: 1.8 },
  { Icon: IconShield, label: "Security", x: "48%", y: "78%", d: 0.9 },
];

function FloatingChips() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {FLOATERS.map(({ Icon, label, x, y, d }, i) => (
        <motion.div
          key={label}
          className="glass absolute flex items-center gap-2 rounded-full border px-3.5 py-2"
          style={{ left: x, top: y, borderColor: "var(--border)" }}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
          animate={
            reduce
              ? { opacity: 0.85, scale: 1, filter: "blur(0px)" }
              : {
                  opacity: [0.65, 0.95, 0.65],
                  y: [0, -9, 0],
                  scale: 1,
                  filter: "blur(0px)",
                }
          }
          transition={
            reduce
              ? { duration: 0.6, delay: 0.5 + d * 0.12 }
              : { duration: 5.5 + i, delay: 0.5 + d * 0.12, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Icon width={15} height={15} style={{ color: "var(--accent-2)" }} />
          <span className="font-mono text-[11px] tracking-wide text-[var(--text-2)]">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
      aria-label={dict.home.hero.title}
    >
      {/* Background layers */}
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          }}
        />
        <div
          className="absolute -left-32 top-1/4 size-[420px] rounded-full blur-[130px]"
          style={{ background: "var(--glow-accent)" }}
        />
        <div
          className="absolute -right-24 bottom-0 size-[360px] rounded-full blur-[130px]"
          style={{ background: "var(--glow-teal)" }}
        />
        <HeroCanvas />
      </div>

      <FloatingChips />

      <motion.div
        className="container-gp relative z-10 pb-24 pt-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Availability badge */}
        <motion.div variants={item} className="mb-7">
          <span className="glass inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-medium text-[var(--text-2)]" style={{ borderColor: "var(--border)" }}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--teal)] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--teal)]" />
            </span>
            {dict.common.availability.badge}
          </span>
        </motion.div>

        {/* Name overline */}
        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm tracking-[0.25em] text-[var(--accent-2)]"
        >
          {siteIdentity.firstName} {siteIdentity.lastName}
        </motion.p>

        {/* Main title */}
        <motion.h1
          variants={item}
          className="max-w-4xl font-display text-[clamp(2.2rem,5.6vw,4.3rem)] font-bold leading-[1.08] tracking-tight"
        >
          {dict.home.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-2)] md:text-lg"
        >
          {dict.home.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_var(--glow-accent)] transition-all duration-300 hover:shadow-[0_14px_50px_-8px_var(--glow-accent)] active:scale-[0.98]"
            >
              {dict.home.hero.ctaProjects}
              <IconArrowUpRight
                width={16}
                height={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="card-surface inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-[var(--text)] hover:border-[var(--border-strong)] active:scale-[0.98]"
            >
              {dict.home.hero.ctaContact}
            </a>
          </Magnetic>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          aria-hidden
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-3)]">
            {dict.common.scroll.indicator}
          </span>
          <motion.div
            className="h-8 w-px"
            style={{ background: "linear-gradient(var(--accent), transparent)" }}
            animate={reduce ? {} : { scaleY: [1, 0.3, 1], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

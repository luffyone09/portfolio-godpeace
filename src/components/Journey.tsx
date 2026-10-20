"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { journeyEntries } from "@/data/experiences";
import { Reveal } from "./ui/Reveal";

export function Journey() {
  const { dict, locale } = useI18n();
  const reduce = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="journey" className="section-pad scroll-mt-20" aria-label={dict.journey.title}>
      <div className="container-gp">
        <Reveal className="mb-16">
          <p className="section-tag mb-4">{dict.journey.tag}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {dict.journey.title}
          </h2>
          <p className="mt-4 font-mono text-xs tracking-[0.25em] text-[var(--text-3)]">
            {dict.journey.subtitle}
          </p>
        </Reveal>

        {journeyEntries.length === 0 ? (
          <p className="text-sm text-[var(--text-3)]">{dict.journey.empty}</p>
        ) : (
          <div ref={lineRef} className="relative mx-auto max-w-3xl">
            {/* Central line */}
            <div
              className="absolute left-4 top-0 h-full w-px md:left-1/2"
              style={{ background: "var(--border)" }}
              aria-hidden
            />
            {!reduce && (
              <motion.div
                className="absolute left-4 top-0 h-full w-px origin-top md:left-1/2"
                style={{
                  scaleY,
                  background: "linear-gradient(var(--accent), var(--teal))",
                }}
                aria-hidden
              />
            )}

            <ol className="flex flex-col gap-14">
              {journeyEntries.map((entry, i) => {
                const left = i % 2 === 0;
                return (
                  <li key={entry.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                    {/* Dot */}
                    <span
                      className="absolute left-4 top-1.5 z-10 grid size-3 -translate-x-1/2 place-items-center rounded-full border-2 md:left-1/2"
                      style={{
                        borderColor: "var(--accent)",
                        background: "var(--bg)",
                      }}
                      aria-hidden
                    />

                    <div
                      className={`pl-12 md:pl-0 ${
                        left ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"
                      }`}
                    >
                      <Reveal>
                        <div
                          className={`flex flex-wrap items-center gap-3 ${
                            left ? "md:justify-end" : ""
                          }`}
                        >
                          <span
                            className="rounded-full border px-3 py-0.5 font-mono text-[11px] tracking-wider"
                            style={{ borderColor: "var(--border)", color: "var(--accent-2)" }}
                          >
                            {entry.badge[locale]}
                          </span>
                          {entry.period && (
                            <span className="font-mono text-xs text-[var(--text-3)]">
                              {entry.period}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                          {entry.title[locale]}
                        </h3>
                        {entry.description && (
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
                            {entry.description[locale]}
                          </p>
                        )}
                      </Reveal>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

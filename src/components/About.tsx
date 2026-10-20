"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { siteIdentity } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { IconDownload } from "./icons";

export function About() {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const paragraphs = Object.values(dict.about.paragraphs);

  return (
    <section id="about" className="section-pad scroll-mt-20" aria-label={dict.about.title}>
      <div className="container-gp">
        <Reveal className="mb-14">
          <p className="section-tag mb-4">{dict.about.tag}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {dict.about.title}
          </h2>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
          {/* Photo / monogram */}
          <Reveal className="mx-auto w-full max-w-[340px] lg:mx-0">
            <div className="group relative" data-cursor>
              <motion.div
                aria-hidden
                className="absolute -inset-[3px] rounded-[28px] opacity-70"
                style={{
                  background:
                    "conic-gradient(from var(--angle,0deg), var(--accent), transparent 30%, var(--teal) 55%, transparent 80%, var(--accent))",
                }}
                animate={reduce ? {} : { "--angle": ["0deg", "360deg"] } as never}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border transition-transform duration-500 group-hover:scale-[1.015]"
                style={{ borderColor: "var(--border-strong)", background: "var(--bg-elev)" }}
              >
                {siteIdentity.photo ? (
                  <Image
                    src={siteIdentity.photo}
                    alt={dict.about.photoAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 340px, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ objectPosition: "50% 35%" }}
                  />
                ) : (
                  <div
                    className="grid size-full place-items-center"
                    style={{
                      background:
                        "radial-gradient(ellipse 90% 80% at 30% 20%, var(--glow-accent), transparent 60%), var(--bg-elev)",
                    }}
                  >
                    <span className="text-gradient font-display text-7xl font-extrabold tracking-tight">
                      {siteIdentity.logo}
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 100%, var(--glow-accent), transparent 70%)",
                  }}
                />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="flex flex-col gap-6">
            {paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--text-2)] md:text-base">
                  {text}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <div className="mt-4 flex flex-wrap gap-2.5" aria-label={dict.home.visual.label}>
                {["Web", "IoT", "Cloud", "Automation", "Cybersecurity"].map((tag) => (
                  <span
                    key={tag}
                    className="card-surface rounded-full px-4 py-1.5 font-mono text-xs tracking-wide text-[var(--text-2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {siteIdentity.cv && (
              <Reveal delay={0.2}>
                <a
                  href={siteIdentity.cv}
                  download
                  className="card-surface mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--text)]"
                >
                  <IconDownload width={16} height={16} style={{ color: "var(--accent-2)" }} />
                  {dict.about.cvButton}
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

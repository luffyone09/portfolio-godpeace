"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { processSteps } from "@/data/process";
import { Reveal } from "./ui/Reveal";
import { IconEye, IconPen, IconCode, IconCheck, IconRocket } from "./icons";

const STEP_ICONS = [IconEye, IconPen, IconCode, IconCheck, IconRocket];

export function Process() {
  const { dict, locale } = useI18n();

  return (
    <section aria-label={dict.process.title} className="section-pad">
      <div className="container-gp">
        <Reveal className="mb-14">
          <p className="section-tag mb-4">{dict.process.tag}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {dict.process.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-2)]">
            {dict.process.subtitle}
          </p>
        </Reveal>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? IconCode;
            return (
              <Reveal as="li" key={step.id} delay={i * 0.07} className="h-full">
                <div className="card-surface group flex h-full flex-col gap-4 rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid size-10 place-items-center rounded-xl border font-mono text-xs"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--surface)",
                        color: "var(--accent-2)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <Icon
                      width={18}
                      height={18}
                      className="text-[var(--text-3)] transition-colors duration-300 group-hover:text-[var(--accent-2)]"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold tracking-tight">
                      {step.title[locale]}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-2)]">
                      {step.description[locale]}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

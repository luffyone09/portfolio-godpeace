"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { skillCategories } from "@/data/skills";
import { Reveal } from "./ui/Reveal";
import { IconCode, IconDatabase, IconCpu, IconCloud, IconShield } from "./icons";

const CATEGORY_ICONS: Record<string, typeof IconCode> = {
  dev: IconCode,
  backend: IconDatabase,
  iot: IconCpu,
  devops: IconCloud,
  security: IconShield,
};

export function SkillCard({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: string[];
}) {
  const Icon = CATEGORY_ICONS[id] ?? IconCode;

  return (
    <Reveal className="h-full">
      <article className="card-surface group flex h-full flex-col gap-5 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-xl border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--accent-2)",
            }}
          >
            <Icon width={18} height={18} />
          </span>
          <h3 className="font-display text-base font-bold tracking-tight">{label}</h3>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label={label}>
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border px-3 py-1 font-mono text-xs text-[var(--text-2)] transition-colors duration-300 group-hover:border-[var(--border-strong)]"
              style={{ borderColor: "var(--border)" }}
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Skills() {
  const { dict, locale } = useI18n();

  return (
    <section id="skills" className="section-pad scroll-mt-20" aria-label={dict.skills.title}>
      <div className="container-gp">
        <Reveal className="mb-14">
          <p className="section-tag mb-4">{dict.skills.tag}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {dict.skills.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-2)]">
            {dict.skills.subtitle}
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <SkillCard key={cat.id} id={cat.id} label={cat.label[locale]} items={cat.items} />
          ))}
        </div>
      </div>
    </section>
  );
}

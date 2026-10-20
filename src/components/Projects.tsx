"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "./ui/Reveal";
import { IconArrowUpRight, IconGitHub } from "./icons";

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "energy") {
    return (
      <svg viewBox="0 0 400 240" className="size-full" aria-hidden>
        <defs>
          <linearGradient id="g-energy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--teal)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#g-energy)" opacity="0.25" />
        <circle cx="200" cy="120" r="70" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeDasharray="4 6" />
        <circle cx="200" cy="120" r="46" fill="none" stroke="var(--teal)" strokeOpacity="0.45" />
        <path d="M208 68 168 128h28l-8 44 44-62h-30l6-42Z" fill="var(--accent)" fillOpacity="0.85" />
        {[0, 90, 180, 270].map((a) => (
          <circle
            key={a}
            cx={200 + 92 * Math.cos((a * Math.PI) / 180)}
            cy={120 + 92 * Math.sin((a * Math.PI) / 180)}
            r="5"
            fill="var(--teal)"
          />
        ))}
      </svg>
    );
  }
  if (kind === "platform") {
    return (
      <svg viewBox="0 0 400 240" className="size-full" aria-hidden>
        <rect width="400" height="240" fill="var(--surface)" />
        <rect x="60" y="46" width="280" height="170" rx="12" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
        <line x1="60" y1="76" x2="340" y2="76" stroke="var(--border-strong)" />
        <circle cx="78" cy="61" r="4" fill="var(--teal)" />
        <circle cx="94" cy="61" r="4" fill="var(--accent-2)" />
        <rect x="80" y="96" width="110" height="10" rx="5" fill="var(--accent)" fillOpacity="0.7" />
        <rect x="80" y="118" width="180" height="6" rx="3" fill="var(--text-3)" fillOpacity="0.5" />
        <rect x="80" y="134" width="150" height="6" rx="3" fill="var(--text-3)" fillOpacity="0.35" />
        <rect x="220" y="96" width="100" height="80" rx="8" fill="var(--teal)" fillOpacity="0.12" stroke="var(--teal)" strokeOpacity="0.4" />
        <path d="M232 160l16-20 14 12 22-28 22 30" fill="none" stroke="var(--teal)" strokeWidth="2" strokeOpacity="0.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 240" className="size-full" aria-hidden>
      <rect width="400" height="240" fill="var(--surface)" />
      <rect x="70" y="40" width="260" height="170" rx="12" fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" />
      <line x1="70" y1="70" x2="330" y2="70" stroke="var(--border-strong)" />
      <circle cx="88" cy="55" r="4" fill="var(--teal)" />
      <circle cx="104" cy="55" r="4" fill="var(--accent-2)" />
      <path d="M100 100l-14 14 14 14M128 100l14 14-14 14M150 92l-18 44" fill="none" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="190" y="98" width="90" height="7" rx="3.5" fill="var(--text-3)" fillOpacity="0.55" />
      <rect x="190" y="114" width="70" height="7" rx="3.5" fill="var(--text-3)" fillOpacity="0.4" />
      <rect x="100" y="150" width="60" height="8" rx="4" fill="var(--teal)" fillOpacity="0.7" />
      <rect x="170" y="150" width="40" height="8" rx="4" fill="var(--accent)" fillOpacity="0.6" />
      <rect x="220" y="150" width="50" height="8" rx="4" fill="var(--text-3)" fillOpacity="0.35" />
      <rect x="100" y="172" width="110" height="7" rx="3.5" fill="var(--text-3)" fillOpacity="0.3" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { dict, locale } = useI18n();

  return (
    <Reveal className="h-full">
      <article className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl" data-cursor>
        <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "var(--bg-elev)" }}>
          <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <ProjectVisual kind={project.visual} />
          </div>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(180deg, transparent 55%, var(--glow-accent))",
            }}
            aria-hidden
          />
          <span className="absolute left-4 top-4 font-mono text-xs tracking-widest text-[var(--text-3)]">
            {project.index}
          </span>
          {(project.demoUrl || project.githubUrl) && (
            <div className="absolute bottom-4 right-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass grid size-9 place-items-center rounded-full border text-[var(--text)]"
                  style={{ borderColor: "var(--border-strong)" }}
                  aria-label={dict.projects.viewProject}
                >
                  <IconArrowUpRight width={15} height={15} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass grid size-9 place-items-center rounded-full border text-[var(--text)]"
                  style={{ borderColor: "var(--border-strong)" }}
                  aria-label={dict.projects.viewOnGithub}
                >
                  <IconGitHub width={15} height={15} />
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight">
            {project.name[locale]}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-2)]">
            {project.description[locale]}
          </p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label={dict.projects.tag}>
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-2)]"
                style={{ borderColor: "var(--border)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const { dict } = useI18n();

  return (
    <section id="projects" className="section-pad scroll-mt-20" aria-label={dict.projects.title}>
      <div className="container-gp">
        <Reveal className="mb-14">
          <p className="section-tag mb-4">{dict.projects.tag}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {dict.projects.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-2)]">
            {dict.projects.subtitle}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

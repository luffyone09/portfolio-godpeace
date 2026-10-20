"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { siteIdentity, socials } from "@/lib/site";
import { IconGitHub, IconLinkedIn, IconWhatsApp, IconMail } from "./icons";

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  const navItems = [
    { id: "home", label: dict.common.nav.home },
    { id: "about", label: dict.common.nav.about },
    { id: "skills", label: dict.common.nav.skills },
    { id: "projects", label: dict.common.nav.projects },
    { id: "journey", label: dict.common.nav.journey },
    { id: "contact", label: dict.common.nav.contact },
  ];

  const links = [
    { key: "email", url: `mailto:${socials.email}`, Icon: IconMail, label: "Email" },
    { key: "github", url: socials.github, Icon: IconGitHub, label: "GitHub" },
    { key: "linkedin", url: socials.linkedin, Icon: IconLinkedIn, label: "LinkedIn" },
    { key: "whatsapp", url: socials.whatsapp, Icon: IconWhatsApp, label: "WhatsApp" },
  ].filter((l) => l.url);

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container-gp flex flex-col gap-8 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold tracking-tight">
              {siteIdentity.firstName} {siteIdentity.lastName}
            </p>
            <p className="mt-1.5 font-mono text-xs tracking-wide text-[var(--text-3)]">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label={dict.common.nav.contact}>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[13px] text-[var(--text-2)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3">
            {links.map(({ key, url, Icon, label }) => (
              <li key={key}>
                <a
                  href={url}
                  target={url.startsWith("mailto") ? undefined : "_blank"}
                  rel={url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="card-surface grid size-9 place-items-center rounded-full text-[var(--text-2)] hover:text-[var(--text)]"
                >
                  <Icon width={15} height={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-[var(--text-3)] md:flex-row"
          style={{ borderColor: "var(--border)" }}
        >
          <p>
            © {year} {siteIdentity.firstName} {siteIdentity.lastName}. {dict.footer.rights}
          </p>
          <p className="font-mono">{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

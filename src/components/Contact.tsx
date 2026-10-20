"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { socials, contactEndpoint } from "@/lib/site";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";
import { IconMail, IconGitHub, IconLinkedIn, IconWhatsApp, IconSend, IconCopy, IconCheck } from "./icons";

type Fields = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent" | "error" | "mailto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { dict } = useI18n();
  const [values, setValues] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const t = dict.contact;
  const set = (k: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  function validate(): boolean {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = t.form.required;
    if (!values.email.trim()) next.email = t.form.required;
    else if (!EMAIL_RE.test(values.email)) next.email = t.form.invalidEmail;
    if (!values.subject.trim()) next.subject = t.form.required;
    if (!values.message.trim()) next.message = t.form.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setStatus("sending");
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        // Service d'envoi non configuré (code not_configured) : ouvre le client
        // email pré-rempli. Aucun faux "envoyé".
        if (data?.code === "not_configured") {
          openMailto();
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  function openMailto() {
    const body = `${t.form.name}: ${values.name}\n${t.form.email}: ${values.email}\n\n${values.message}`;
    const href = `mailto:${socials.email}?subject=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("mailto");
  }

  function copyEmail() {
    navigator.clipboard.writeText(socials.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  const socialLinks = [
    { key: "github", url: socials.github, Icon: IconGitHub, label: "GitHub" },
    { key: "linkedin", url: socials.linkedin, Icon: IconLinkedIn, label: "LinkedIn" },
    { key: "whatsapp", url: socials.whatsapp, Icon: IconWhatsApp, label: "WhatsApp" },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="section-pad scroll-mt-20" aria-label={t.title}>
      <div className="container-gp">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="section-tag mb-4 justify-center">{t.tag}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-2)]">{t.subtitle}</p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 lg:grid-cols-[1fr_320px]">
          {/* Form */}
          <Reveal>
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className="mb-1.5 block text-xs font-medium text-[var(--text-2)]">
                    {t.form.name} *
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    className="field-input"
                    placeholder={t.form.namePlaceholder}
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "f-name-err" : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="f-name-err" className="mt-1.5 text-xs" style={{ color: "#ff7a7a" }}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="f-email" className="mb-1.5 block text-xs font-medium text-[var(--text-2)]">
                    {t.form.email} *
                  </label>
                  <input
                    id="f-email"
                    type="email"
                    className="field-input"
                    placeholder={t.form.emailPlaceholder}
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "f-email-err" : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="f-email-err" className="mt-1.5 text-xs" style={{ color: "#ff7a7a" }}>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="f-subject" className="mb-1.5 block text-xs font-medium text-[var(--text-2)]">
                  {t.form.subject} *
                </label>
                <input
                  id="f-subject"
                  type="text"
                  className="field-input"
                  placeholder={t.form.subjectPlaceholder}
                  value={values.subject}
                  onChange={set("subject")}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "f-subject-err" : undefined}
                />
                {errors.subject && (
                  <p id="f-subject-err" className="mt-1.5 text-xs" style={{ color: "#ff7a7a" }}>
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="f-message" className="mb-1.5 block text-xs font-medium text-[var(--text-2)]">
                  {t.form.message} *
                </label>
                <textarea
                  id="f-message"
                  rows={5}
                  className="field-input resize-none"
                  placeholder={t.form.messagePlaceholder}
                  value={values.message}
                  onChange={set("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "f-message-err" : undefined}
                />
                {errors.message && (
                  <p id="f-message-err" className="mt-1.5 text-xs" style={{ color: "#ff7a7a" }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <Magnetic className="self-start">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_14px_50px_-8px_var(--glow-accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IconSend width={15} height={15} />
                  {status === "sending" ? t.form.sending : t.form.submit}
                </button>
              </Magnetic>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm"
                    style={{ color: "var(--teal)" }}
                    role="status"
                  >
                    {t.form.success}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm"
                    style={{ color: "#ff7a7a" }}
                    role="alert"
                  >
                    {t.form.error}
                  </motion.p>
                )}
                {status === "mailto" && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-[var(--text-2)]"
                    role="status"
                  >
                    {t.form.mailtoNote}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Direct channels */}
          <Reveal delay={0.1}>
            <div className="card-surface flex h-full flex-col gap-6 rounded-2xl p-6">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-2)]">
                  {t.direct.title}
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <IconMail width={17} height={17} style={{ color: "var(--accent-2)" }} />
                  <a
                    href={`mailto:${socials.email}`}
                    className="text-sm text-[var(--text)] underline-offset-4 hover:underline"
                  >
                    {socials.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t.copyEmail}
                    className="card-surface grid size-8 place-items-center rounded-full text-[var(--text-3)] hover:text-[var(--text)]"
                  >
                    {copied ? (
                      <IconCheck width={13} height={13} style={{ color: "var(--teal)" }} />
                    ) : (
                      <IconCopy width={13} height={13} />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="mt-2 font-mono text-[11px]" style={{ color: "var(--teal)" }} role="status">
                    {t.emailCopied}
                  </p>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div>
                  <ul className="flex gap-3">
                    {socialLinks.map(({ key, url, Icon, label }) => (
                      <li key={key}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="card-surface grid size-11 place-items-center rounded-full text-[var(--text-2)] hover:text-[var(--text)]"
                        >
                          <Icon width={17} height={17} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!contactEndpoint && (
                <p className="text-xs leading-relaxed text-[var(--text-3)]">{t.form.notConfigured}</p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

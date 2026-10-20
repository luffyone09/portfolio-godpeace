"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/config";
import { IconChevronDown } from "@/components/icons";

const OPTIONS: { value: Locale; flag: string; label: string }[] = [
  { value: "fr", flag: "🇫🇷", label: "Français" },
  { value: "en", flag: "🇬🇧", label: "English" },
];

export function LanguageSwitcher() {
  const { locale, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    localStorage.setItem("gp-lang", next);
    const hash = window.location.hash;
    const rest = pathname.replace(/^\/(fr|en)/, "");
    router.push(`/${next}${rest}${hash}`);
  }

  const current = OPTIONS.find((o) => o.value === locale) ?? OPTIONS[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.common.lang.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="card-surface flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-[var(--text-2)] hover:text-[var(--text)]"
      >
        <span aria-hidden>{current.flag}</span>
        <span className="uppercase">{locale}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <IconChevronDown width={13} height={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={dict.common.lang.label}
            initial={{ opacity: 0, y: -6, scale: 0.96, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.96, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="glass absolute right-0 top-11 z-50 w-36 overflow-hidden rounded-xl border p-1"
            style={{ borderColor: "var(--border)" }}
          >
            {OPTIONS.map((opt) => (
              <li key={opt.value} role="option" aria-selected={opt.value === locale}>
                <button
                  type="button"
                  onClick={() => switchTo(opt.value)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    opt.value === locale
                      ? "bg-[var(--surface-hover)] text-[var(--text)]"
                      : "text-[var(--text-2)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  }`}
                >
                  <span aria-hidden>{opt.flag}</span>
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

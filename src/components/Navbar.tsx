"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { siteIdentity } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconMenu, IconX } from "./icons";

const SECTION_IDS = ["home", "about", "skills", "projects", "journey", "contact"] as const;

export function Navbar() {
  const { dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const reduce = useReducedMotion();

  const navItems = [
    { id: "home", label: dict.common.nav.home },
    { id: "about", label: dict.common.nav.about },
    { id: "skills", label: dict.common.nav.skills },
    { id: "projects", label: dict.common.nav.projects },
    { id: "journey", label: dict.common.nav.journey },
    { id: "contact", label: dict.common.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={reduce ? false : { y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
        scrolled ? "glass border-b" : "border-b border-transparent"
      }`}
      style={scrolled ? { borderColor: "var(--border)" } : undefined}
    >
      <nav
        className="container-gp flex h-16 items-center justify-between"
        aria-label="Main"
      >
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-[var(--text)]"
          aria-label={`${siteIdentity.firstName} ${siteIdentity.lastName}`}
        >
          {siteIdentity.logo}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`group relative text-[13px] font-medium tracking-wide transition-colors ${
                  active === item.id
                    ? "text-[var(--text)]"
                    : "text-[var(--text-2)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                    active === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="#contact"
            className="card-surface hidden h-9 items-center rounded-full bg-[var(--accent)] px-4 text-[13px] font-semibold text-white hover:opacity-90 md:flex"
          >
            {dict.common.actions.contactMe}
          </a>
          <button
            type="button"
            className="card-surface grid size-9 place-items-center rounded-full text-[var(--text-2)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.menu.close : dict.common.menu.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconX width={18} height={18} /> : <IconMenu width={18} height={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="glass overflow-hidden border-b lg:hidden"
            style={{ borderColor: "var(--border)" }}
          >
            <ul className="container-gp flex flex-col gap-1 pb-6 pt-2">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors ${
                      active === item.id
                        ? "bg-[var(--surface-hover)] text-[var(--text)]"
                        : "text-[var(--text-2)]"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

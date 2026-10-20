"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/i18n/I18nProvider";
import { IconSun, IconMoon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { dict } = useI18n();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dict.common.theme.toggle}
      aria-pressed={isDark}
      className="card-surface grid size-9 place-items-center rounded-full text-[var(--text-2)] hover:text-[var(--text)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {isDark ? <IconMoon width={16} height={16} /> : <IconSun width={16} height={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

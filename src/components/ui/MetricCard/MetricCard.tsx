import type { ReactNode } from "react";

import styles from "./MetricCard.module.scss";

import { clamp } from "@/utils/utils";

const DOTS_MAX = 5;

export function MetricCard({
  title,
  dots,
  children,
  footerLink,
  className,
}: {
  title: string;
  dots?: number;
  children?: ReactNode;
  footerLink?: string;
  className?: string;
}) {
  const hasDots = typeof dots === "number";
  const on = hasDots ? clamp(dots, 0, DOTS_MAX) : 0;

  return (
    <section className={`${styles.card} ${className ?? ""}`}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {hasDots ? (
          <div className={styles.dots} aria-label={`Score ${on} out of ${DOTS_MAX}`}>
            {Array.from({ length: DOTS_MAX }, (_, i) => (
              <span key={i} className={styles.dot} data-on={i < on} />
            ))}
          </div>
        ) : null}
      </header>

      <div className={styles.body}>{children}</div>

      {footerLink ? (
        <button className={styles.footerBtn} type="button">
          {footerLink}
        </button>
      ) : null}
    </section>
  );
}

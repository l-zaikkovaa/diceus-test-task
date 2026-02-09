import { Link } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";

import type { BreadcrumbItem } from "@/types";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className={styles.wrap} aria-label="Breadcrumbs">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={`${it.label}-${idx}`} className={styles.item}>
            {it.href && !isLast ? (
              <Link to={it.href} className={styles.link}>
                {it.label}
              </Link>
            ) : (
              <span className={isLast ? styles.current : styles.text}>{it.label}</span>
            )}
            {!isLast && <span className={styles.sep}>//</span>}
          </div>
        );
      })}
    </div>
  );
}

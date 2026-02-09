import type { FC, ReactNode } from "react";
import styles from "./Pill.module.scss";

interface IPillProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  date: string;
}

export const Pill: FC<IPillProps> = ({ icon, title, subtitle, date }) => (
  <div className={styles.pill}>
    <div className={styles.header}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.title}>{title}</div>
    </div>
    <div className={styles.subtitle}>{subtitle}</div>
    <div className={styles.date}>{date}</div>
  </div>
);

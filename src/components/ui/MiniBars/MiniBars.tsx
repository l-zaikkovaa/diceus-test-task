import styles from "./MiniBars.module.scss";

export function MiniBars({ items }: { items: Array<{ label: string; value: number }> }) {
  return (
    <div className={styles.wrap}>
      {items.map((it) => (
        <div key={it.label} className={styles.row}>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${Math.round(it.value * 100)}%` }} />
          </div>
          <div className={styles.text}>
            <span className={styles.name}>{it.label}:</span>
            <span className={styles.val}>{Math.round(it.value * 1000) / 10}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

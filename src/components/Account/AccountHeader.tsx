import styles from "./AccountHeader.module.scss";

import type { AccountHeaderData } from "@/types";

export function AccountHeader({ account }: { account: AccountHeaderData }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.logoWrapper} aria-hidden>
          {account.logoPath ? (
            <img src={account.logoPath} alt={account.name} className={styles.logo} />
          ) : (
            (account.logoText ?? "A")
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.name}>{account.name}</div>
          <div className={styles.info}>
            <div className={styles.address}>{account.address}</div>
            <div className={styles.meta}>
              {account.meta.map((m) => (
                <div key={m.label} className={styles.metaItem}>
                  <div className={styles.metaLabel}>{m.label}</div>
                  <div className={styles.metaValue}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

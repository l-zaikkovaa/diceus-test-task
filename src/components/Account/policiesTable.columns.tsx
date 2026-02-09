import { Chip } from "../ui/Chip/Chip";
import { IconButton } from "../ui/IconButton/IconButton";
import type { Column } from "../ui/Table/Table";

import styles from "./PoliciesTable.module.scss";

import type { PoliciesRow } from "@/types";

type Params = {
  onRowInfo: (rowId: string, anchorEl: HTMLElement) => void;
};

export function getPoliciesColumns({ onRowInfo }: Params): Column<PoliciesRow>[] {
  return [
    {
      key: "line",
      header: "LINE",
      size: 170,
      className: styles.nowrap,
      cell: (r) => (
        <div className={styles.line}>
          <div className={styles.lineTopRow}>
            <img src={r.line.accountIconPath} alt="Marine" />
            <div className={styles.accountName}>{r.line.accountName}</div>
          </div>
          <div className={styles.accountId}>{r.line.accountId}</div>
        </div>
      ),
    },
    {
      key: "effDate",
      header: "EFF. DATE",
      size: { growMax: 90 },
      className: styles.ellipsis,
      cell: (r) => <span className={styles.regularText}>{r.effDate}</span>,
    },
    {
      key: "expDate",
      header: "EXP. DATE",
      size: { growMax: 100 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.expDate}</span>,
    },
    {
      key: "status",
      header: "STATUS",
      size: { growMax: 100 },
      className: styles.nowrap,
      cell: (r) => (
        <div className={styles.statusWrap}>
          <Chip tone={r.status.tone} size="md" />
          <div className={styles.statusLabel}>{r.status.label}</div>
        </div>
      ),
    },
    {
      key: "expiringTech",
      header: "EXPIRING TECH",
      size: { growMax: 110 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.expiringTech}</span>,
    },
    {
      key: "expiringPremium",
      header: "EXPIRING PREMIUM",
      size: { growMax: 130 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.expiringPremium}</span>,
    },
    {
      key: "renewalToTech",
      header: "RENEWAL TO TECH ",
      size: { growMax: 130 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.renewalToTech}</span>,
    },
    {
      key: "renewalTech",
      header: "RENEWAL TECH ",
      size: { growMax: 120 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.renewalTech}</span>,
    },
    {
      key: "renewalPremium",
      header: "RENEWAL PREMIUM ",
      size: { growMax: 150 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.regularText}>{r.renewalPremium}</span>,
    },
    {
      key: "rateChange",
      header: "RATE CHANGE ",
      size: { growMax: 120 },
      className: styles.nowrap,

      cell: (r) => (
        <span
          className={[
            styles.regularText,
            r.rateChange.tone === "red" ? styles.regularTextRed : "",
          ].join(" ")}
        >
          {r.rateChange.value}
        </span>
      ),
    },
    {
      key: "lossRatio",
      header: "LOSS RATIO",
      size: { growMax: 80 },
      className: styles.nowrap,

      cell: (r) => (
        <span className={styles.lossRatioBadge} data-tone={r.lossRatio.tone}>
          {r.lossRatio.value}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: styles.nowrap,
      align: "right",
      cell: (r) => (
        <div className={styles.cellRight}>
          <IconButton
            aria-label="Row Actions"
            title="Row Actions"
            onClick={(e) => {
              e.stopPropagation();
              onRowInfo(r.details, e.currentTarget as HTMLElement);
            }}
          >
            ⋮
          </IconButton>
        </div>
      ),
    },
  ];
}

import { Chip } from "../ui/Chip/Chip";
import { IconButton } from "../ui/IconButton/IconButton";
import type { Column } from "../ui/Table/Table";

import styles from "./MyAccountCard.module.scss";

import type { AccountRow } from "@/types";

type Params = {
  onRowInfo: (rowId: string, anchorEl: HTMLElement) => void;
};

export function getAccountColumns({ onRowInfo }: Params): Column<AccountRow>[] {
  return [
    {
      key: "account",
      header: "ACCOUNT NAME / TYPE",
      size: "grow",
      className: styles.ellipsis,
      cell: (a) => (
        <div className={styles.twoLine}>
          <div className={styles.cellTitle}>{a.accountName}</div>
          <div className={styles.cellSub}>{a.accountType}</div>
        </div>
      ),
    },
    {
      key: "line",
      header: "LINE",
      size: 170,
      className: styles.nowrap,
      cell: (a) => <span className={styles.muted}>{a.line}</span>,
    },
    {
      key: "broker",
      header: "BROKER",
      size: 140,
      className: styles.nowrap,
      cell: (a) => <span className={styles.muted}>{a.broker}</span>,
    },
    {
      key: "renewal",
      header: "RENEWAL DATE",
      size: 70,
      className: styles.nowrap,
      cell: (a) => <span className={styles.muted}>{a.renewalDate}</span>,
    },
    {
      key: "premium",
      header: "PREMIUM",
      size: 100,
      className: styles.nowrap,
      cell: (a) => a.premium,
      align: "right",
    },
    {
      key: "rated",
      header: "RATED PREMIUM",
      size: 90,
      className: styles.nowrap,
      cell: (a) => <span className={styles.muted}>{a.ratedPremium}</span>,
      align: "right",
    },
    {
      key: "loss",
      header: "LOSS RATIO",
      size: 100,
      className: styles.nowrap,
      cell: (a) => (
        <span className={styles.lossRatioBadge} data-tone={a.lossRatio.tone}>
          {a.lossRatio.value}
        </span>
      ),
      align: "center",
    },
    {
      key: "appetite",
      header: "APPETITE",
      size: 90,
      className: styles.nowrap,
      cell: (a) => (
        <div className={styles.appetiteWrap}>
          <span className={styles.appetiteText}>{a.appetite}</span>
        </div>
      ),
      align: "left",
    },
    {
      key: "status",
      header: "STATUS",
      size: 120,
      className: styles.nowrap,
      cell: (a) => (
        <div className={styles.statusWrap}>
          <Chip tone={a.status.tone} />
          <div className={styles.statusLabel}>{a.status.label}</div>
        </div>
      ),
      align: "left",
    },
    {
      key: "triage",
      header: "TRIAGE",
      size: 60,
      className: styles.nowrap,
      cell: (a) => <span className={styles.triage}>{String(a.triage)}</span>,
      align: "center",
    },
    {
      key: "win",
      header: "WINABILITY",
      size: 110,
      className: styles.nowrap,
      cell: (a) => (
        <div className={styles.winWrap}>
          <div className={styles.dotsWrap}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className={styles.winDot} />
            ))}
          </div>
          <span className={styles.winLabel}>{a.winnability.label}</span>
        </div>
      ),
    },
    {
      key: "go",
      header: "",
      size: 48,
      className: styles.nowrap,
      align: "center",
      cell: (a) => (
        <div className={styles.cellRight}>
          <IconButton
            aria-label="Row Actions"
            title="Row Actions"
            onClick={(e) => {
              e.stopPropagation();
              onRowInfo(a.details, e.currentTarget as HTMLElement);
            }}
          >
            ⋮
          </IconButton>
        </div>
      ),
    },
  ];
}

import { Chip } from "../ui/Chip/Chip";
import { IconButton } from "../ui/IconButton/IconButton";
import type { Column } from "../ui/Table/Table";

import styles from "./WorkQueue.module.scss";

import type { WorkQueueRow } from "@/types";

type Params = {
  onRowInfo: (rowId: string, anchorEl: HTMLElement) => void;
};

export function getWorkQueueColumns({ onRowInfo }: Params): Column<WorkQueueRow>[] {
  return [
    {
      key: "originator",
      header: "ORIGINATOR",
      size: 200,
      className: styles.nowrap,
      cell: (r) => (
        <div className={styles.originator}>
          <div className={styles.avatarSmall}>{r.originator.initials}</div>
          <div className={styles.cellTitle}>{r.originator.name}</div>
        </div>
      ),
    },
    {
      key: "clientLine",
      header: "CLIENT / LINE",
      size: { growMax: 230 },
      className: styles.ellipsis,
      cell: (r) => (
        <div className={styles.twoLine}>
          <div className={styles.cellTitle}>{r.clientLine.title}</div>
          <div className={styles.cellSub}>{r.clientLine.subtitle}</div>
        </div>
      ),
    },
    {
      key: "type",
      header: "TYPE",
      size: { growMax: 150 },
      className: styles.nowrap,
      cell: (r) => <span className={styles.type}>{r.type}</span>,
    },
    {
      key: "status",
      header: "STATUS",
      size: { growMax: 150 },
      className: styles.nowrap,
      cell: (r) => (
        <div className={styles.statusWrap}>
          <Chip tone={r.status.tone} />
          <div className={styles.statusLabel}>{r.status.label}</div>
        </div>
      ),
    },
    {
      key: "created",
      header: "CREATED",
      size: "content",
      className: styles.nowrap,
      cell: (r) => <span className={styles.muted}>{r.created}</span>,
    },
    {
      key: "actions",
      header: "",
      size: 48,
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

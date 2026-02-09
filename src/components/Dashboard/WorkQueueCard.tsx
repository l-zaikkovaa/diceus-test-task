import { useState, useMemo, useCallback } from "react";

import { RowInfoPopover } from "../ui/RowInfoPopover/RowInfoPopover";
import { Table } from "../ui/Table/Table";

import { getWorkQueueColumns } from "./workQueue.columns";
import styles from "./WorkQueue.module.scss";

import { workQueue, workQueueTabs } from "@/mocks";
import type { WorkQueueTab } from "@/types";

export function WorkQueueCard() {
  const [queueTab, setQueueTab] = useState<WorkQueueTab>("assigned");
  const queueRows = workQueue[queueTab];

  const [rowInfo, setRowInfo] = useState<{ rowId: string; anchorEl: HTMLElement } | null>(null);
  const closeRowInfo = useCallback(() => setRowInfo(null), []);
  const onRowInfo = useCallback((rowId: string, anchorEl: HTMLElement) => {
    setRowInfo((prev) => {
      if (prev && prev.rowId === rowId && prev.anchorEl === anchorEl) return null;
      return { rowId, anchorEl };
    });
  }, []);

  const columns = useMemo(() => getWorkQueueColumns({ onRowInfo }), [onRowInfo]);

  return (
    <div className={styles.shell}>
      <RowInfoPopover
        open={rowInfo !== null}
        text={rowInfo?.rowId ?? ""}
        anchorEl={rowInfo?.anchorEl ?? null}
        onClose={closeRowInfo}
      />

      <div className={styles.title}>Work Queue</div>
      <div className={styles.tabs}>
        {workQueueTabs.map(({ id, label }) => {
          const isActive = queueTab === id;

          return (
            <button
              key={id}
              type="button"
              className={[styles.tabBtn, isActive ? styles.activeBtn : ""].join(" ")}
              onClick={() => setQueueTab(id)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <Table columns={columns} rows={queueRows} rowKey={(r) => r.id} />
    </div>
  );
}

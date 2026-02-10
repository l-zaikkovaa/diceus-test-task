import { useState, useMemo, useId, useCallback } from "react";

import { RowInfoPopover } from "../ui/RowInfoPopover/RowInfoPopover";
import { Table } from "../ui/Table/Table";

import { getPoliciesColumns } from "./policiesTable.columns";
import styles from "./PoliciesTable.module.scss";

import { accountsTable } from "@/mocks";

export function PoliciesTable() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [rowInfo, setRowInfo] = useState<{ rowId: string; anchorEl: HTMLElement } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return accountsTable;
    return accountsTable.filter((a) => a.line.accountName.toLowerCase().includes(q));
  }, [query]);

  const closeRowInfo = useCallback(() => setRowInfo(null), []);

  const onRowInfo = useCallback((rowId: string, anchorEl: HTMLElement) => {
    setRowInfo((prev) => {
      if (prev && prev.rowId === rowId && prev.anchorEl === anchorEl) return null;
      return { rowId, anchorEl };
    });
  }, []);

  const columns = useMemo(() => getPoliciesColumns({ onRowInfo }), [onRowInfo]);

  return (
    <div className={styles.shell}>
      <RowInfoPopover
        open={rowInfo !== null}
        text={rowInfo?.rowId ?? ""}
        anchorEl={rowInfo?.anchorEl ?? null}
        onClose={closeRowInfo}
      />
      <div className={styles.toolbar}>
        <label className={styles.searchLabel} htmlFor={searchId}>
          <input
            id={searchId}
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search communication"
          />
        </label>

        <button className={styles.toolbarBtn} type="button">
          Filter
        </button>
        <button className={styles.toolbarBtn} type="button">
          Group
        </button>
      </div>

      <Table columns={columns} rows={filtered} rowKey={(r) => r.line.accountName} />
    </div>
  );
}

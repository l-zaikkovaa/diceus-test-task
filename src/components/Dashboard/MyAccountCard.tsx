import React, { useMemo, useState, useId, useRef, useEffect } from "react";

import { parseMoney, parsePercent, parseUSDate } from "../../utils/utils";
import { RowInfoPopover } from "../ui/RowInfoPopover/RowInfoPopover";
import { Table } from "../ui/Table/Table";

import { getAccountColumns } from "./accounts.columns";
import styles from "./MyAccountCard.module.scss";

import { accounts } from "@/mocks";
import type { AccountRow } from "@/types";

type SortKey =
  | "accountName"
  | "accountType"
  | "line"
  | "broker"
  | "renewalDate"
  | "premium"
  | "ratedPremium"
  | "lossRatio"
  | "appetite"
  | "status"
  | "triage"
  | "winnability";
type SortDir = "asc" | "desc";
type GroupKey = "none" | "status" | "appetite" | "broker" | "line";

function sortValue(a: AccountRow, key: SortKey): string | number {
  switch (key) {
    case "premium":
      return parseMoney(a.premium);
    case "ratedPremium":
      return parseMoney(a.ratedPremium);
    case "lossRatio":
      return parsePercent(a.lossRatio.value);
    case "renewalDate":
      return parseUSDate(a.renewalDate);
    case "status":
      return a.status.label;
    case "appetite":
      return a.appetite;
    case "winnability":
      return a.winnability.score;
    case "triage":
      return a.triage;
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (a as any)[key] ?? "";
  }
}

function useClickOutside(
  refs: Array<React.RefObject<HTMLDivElement | null> | null>,
  onOutside: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const inside = refs?.some((r) => r?.current && r.current.contains(target));
      if (!inside) onOutside();
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [enabled, onOutside, refs]);
}

export function MyAccountCard() {
  const searchId = useId();
  const [query, setQuery] = useState("");

  const [rowInfo, setRowInfo] = useState<{ rowId: string; anchorEl: HTMLElement } | null>(null);
  const closeRowInfo = React.useCallback(() => setRowInfo(null), []);
  const onRowInfo = React.useCallback((rowId: string, anchorEl: HTMLElement) => {
    setRowInfo((prev) => {
      if (prev && prev.rowId === rowId && prev.anchorEl === anchorEl) return null;
      return { rowId, anchorEl };
    });
  }, []);

  const columns = useMemo(() => getAccountColumns({ onRowInfo }), [onRowInfo]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const filterWrapRef = useRef<HTMLDivElement>(null);
  const sortWrapRef = useRef<HTMLDivElement>(null);
  const groupWrapRef = useRef<HTMLDivElement>(null);

  const anyMenuOpen = filterOpen || sortOpen || groupOpen;

  useClickOutside(
    [filterWrapRef, sortWrapRef, groupWrapRef],
    () => {
      setFilterOpen(false);
      setGroupOpen(false);
      setSortOpen(false);
    },
    anyMenuOpen,
  );

  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");
  const [appetiteFilter, setAppetiteFilter] = useState<"all" | string>("all");
  const [lossTone, setLossTone] = useState<"all" | AccountRow["lossRatio"]["tone"]>("all");

  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "accountName",
    dir: "asc",
  });
  const [groupBy, setGroupBy] = useState<GroupKey>("none");

  const statusOptions = useMemo(() => {
    return Array.from(new Set(accounts.map((account) => account.status.label))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, []);

  const appetiteOptions = useMemo(() => {
    return Array.from(new Set(accounts.map((account) => account.appetite))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, []);

  const rowsView = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = accounts;

    if (q) {
      list = list.filter((a) => {
        const blob = `${a.accountName} ${a.accountType} ${a.broker} ${a.line}`.toLowerCase();
        return blob.includes(q);
      });
    }

    if (statusFilter !== "all") list = list.filter((a) => a.status.label === statusFilter);
    if (appetiteFilter !== "all") list = list.filter((a) => a.appetite === appetiteFilter);
    if (lossTone !== "all") list = list.filter((a) => a.lossRatio.tone === lossTone);

    const dir = sort.dir === "asc" ? 1 : -1;
    list.sort((a, b) => {
      const va = sortValue(a, sort.key);
      const vb = sortValue(b, sort.key);

      if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });

    return list;
  }, [query, statusFilter, appetiteFilter, lossTone, sort]);

  const grouped = useMemo(() => {
    if (groupBy === "none") return null;

    const map = new Map<string, AccountRow[]>();
    for (const r of rowsView) {
      const key =
        groupBy === "status"
          ? r.status.label
          : groupBy === "appetite"
            ? r.appetite
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              String((r as any)[groupBy] ?? "—");

      const arr = map.get(key) ?? [];
      arr.push(r);
      map.set(key, arr);
    }

    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [rowsView, groupBy]);

  const filterActive = statusFilter !== "all" || appetiteFilter !== "all" || lossTone !== "all";

  return (
    <div className={styles.shell}>
      <RowInfoPopover
        open={rowInfo !== null}
        text={rowInfo?.rowId ?? ""}
        anchorEl={rowInfo?.anchorEl ?? null}
        onClose={closeRowInfo}
      />

      <div className={styles.topRow}>
        <h2 className={styles.title}>My accounts</h2>
        <div className={styles.toolBar}>
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

          <div className={styles.btns}>
            <div className={styles.menuWrap} ref={filterWrapRef}>
              <button
                className={styles.toolbarBtn}
                data-active={filterOpen || filterActive ? "true" : "false"}
                type="button"
                onClick={() => {
                  setFilterOpen((v) => !v);
                  setSortOpen(false);
                  setGroupOpen(false);
                }}
              >
                Filter
              </button>

              {filterOpen && (
                <div className={styles.menu}>
                  <div className={styles.menuTitle}>Status</div>
                  <div className={styles.menuGrid}>
                    <button
                      type="button"
                      className={styles.menuChip}
                      data-selected={statusFilter === "all" ? "true" : "false"}
                      onClick={() => setStatusFilter("all")}
                    >
                      All
                    </button>
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={styles.menuChip}
                        data-selected={statusFilter === s ? "true" : "false"}
                        onClick={() => setStatusFilter(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className={styles.menuDivider} />

                  <div className={styles.menuTitle}>Appetite</div>
                  <div className={styles.menuGrid}>
                    <button
                      type="button"
                      className={styles.menuChip}
                      data-selected={appetiteFilter === "all" ? "true" : "false"}
                      onClick={() => setAppetiteFilter("all")}
                    >
                      All
                    </button>
                    {appetiteOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={styles.menuChip}
                        data-selected={appetiteFilter === s ? "true" : "false"}
                        onClick={() => setAppetiteFilter(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className={styles.menuDivider} />

                  <div className={styles.menuTitle}>Loss ratio tone</div>
                  <div className={styles.menuGrid}>
                    {(["all", "green", "yellow", "red"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={styles.menuChip}
                        data-selected={lossTone === t ? "true" : "false"}
                        onClick={() => setLossTone(t)}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className={styles.menuActions}>
                    <button
                      type="button"
                      className={styles.menuActionBtn}
                      onClick={() => {
                        setStatusFilter("all");
                        setAppetiteFilter("all");
                        setLossTone("all");
                      }}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className={styles.menuActionBtnPrimary}
                      onClick={() => setFilterOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.menuWrap} ref={sortWrapRef}>
              <button
                className={styles.toolbarBtn}
                data-active={sortOpen ? "true" : "false"}
                type="button"
                onClick={() => {
                  setSortOpen((v) => !v);
                  setFilterOpen(false);
                  setGroupOpen(false);
                }}
              >
                Sort
              </button>

              {sortOpen && (
                <div className={styles.menu}>
                  <div className={styles.menuTitle}>Sort by</div>

                  <div className={styles.menuList}>
                    {(
                      [
                        ["accountName", "Account name"],
                        ["broker", "Broker"],
                        ["line", "Line"],
                        ["renewalDate", "Renewal date"],
                        ["premium", "Premium"],
                        ["ratedPremium", "Rated premium"],
                        ["lossRatio", "Loss ratio"],
                        ["status", "Status"],
                        ["appetite", "Appetite"],
                        ["triage", "Triage"],
                        ["winnability", "Winnability"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        className={styles.menuRowBtn}
                        data-selected={sort.key === key ? "true" : "false"}
                        onClick={() => setSort((s) => ({ ...s, key }))}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.menuDivider} />

                  <button
                    type="button"
                    className={styles.menuRowBtn}
                    onClick={() =>
                      setSort((s) => ({ ...s, dir: s.dir === "asc" ? "desc" : "asc" }))
                    }
                  >
                    Direction: <b>{sort.dir.toUpperCase()}</b>
                  </button>
                </div>
              )}
            </div>

            <div className={styles.menuWrap} ref={groupWrapRef}>
              <button
                className={styles.toolbarBtn}
                data-active={groupOpen || groupBy !== "none" ? "true" : "false"}
                type="button"
                onClick={() => {
                  setGroupOpen((v) => !v);
                  setFilterOpen(false);
                  setSortOpen(false);
                }}
              >
                Group
              </button>

              {groupOpen && (
                <div className={styles.menu}>
                  <div className={styles.menuTitle}>Group by</div>

                  {(
                    [
                      ["none", "None"],
                      ["status", "Status"],
                      ["appetite", "Appetite"],
                      ["broker", "Broker"],
                      ["line", "Line"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className={styles.menuRowBtn}
                      data-selected={groupBy === key ? "true" : "false"}
                      onClick={() => {
                        setGroupBy(key);
                        setGroupOpen(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className={styles.toolbarBtnPrimary} type="button">
              + New
            </button>
          </div>
        </div>
      </div>

      {grouped ? (
        <div className={styles.groupList}>
          {grouped.map(([g, rows]) => (
            <div key={g} className={styles.groupBlock}>
              <div className={styles.groupTitle}>
                {g} <span className={styles.groupCount}>({rows.length})</span>
              </div>
              <Table columns={columns} rows={rows} rowKey={(r) => r.accountName} />
            </div>
          ))}
        </div>
      ) : (
        <Table columns={columns} rows={rowsView} rowKey={(r) => r.accountName} />
      )}
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./Table.module.scss";

type ColumnSize = "content" | "grow" | number | { growMax: number };

export type Column<Row> = {
  key: string;
  header?: ReactNode;
  size?: ColumnSize;
  cell: (row: Row) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};

type Props<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  className?: string;
  rowKey?: (row: Row) => string | number;
};

export function Table<Row>({ columns, rows, className, rowKey }: Props<Row>) {
  const template = columns
    .map((col) => {
      if (col.size === "content") return "max-content";
      if (col.size === "grow" || col.size == null) return "minmax(0, 1fr)";
      if (typeof col.size === "number") return `${col.size}px`;
      if (typeof col.size === "object" && "growMax" in col.size)
        return `minmax(0, ${col.size.growMax}px)`;
    })
    .join(" ");

  return (
    <div className={`${styles.scroll} ${className ?? ""}`}>
      <div className={`${styles.table} ${className ?? ""}`} role="table">
        <div className={styles.header} role="rowgroup">
          <div className={styles.row} role="row" style={{ gridTemplateColumns: template }}>
            {columns.map((col) => (
              <div
                key={col.key}
                role="columnheader"
                className={`${styles.cell} ${styles.headCell} ${col.className ?? ""}`}
                style={{ textAlign: col.align ?? "left" }}
              >
                {col.header}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.body} role="rowgroup">
          {rows.map((row, idx) => {
            const key = rowKey ? rowKey(row) : idx;
            return (
              <div
                key={key}
                className={styles.row}
                role="row"
                style={{ gridTemplateColumns: template }}
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    role="cell"
                    className={`${styles.cell} ${col.className ?? ""}`}
                    style={{ textAlign: col.align ?? "left" }}
                  >
                    {col.cell(row)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

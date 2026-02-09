import styles from "./PortfolioGoalCard.module.scss";

import { type PortfolioGoal } from "@/types";

export function PortfolioGoalCard({ goal }: { goal: PortfolioGoal }) {
  const isSegmented = goal.type === "segmented";

  const targetPos = Array.isArray(goal.targetValue)
    ? (goal.targetValue[0] + goal.targetValue[1]) / 2 - 29
    : goal.targetValue;

  const targetLabel = Array.isArray(goal.targetValue)
    ? `TG: ${goal.targetValue[0]}-${goal.targetValue[1]}${goal.suffix}`
    : `TG: ${goal.targetValue}${goal.suffix}`;

  const currentPos = goal.totalPotential
    ? (goal.currentValue / goal.totalPotential) * 100
    : goal.currentValue;

  return (
    <div className={styles.goalCard}>
      {isSegmented ? (
        <>
          <h3 className={styles.header}>{goal.title}</h3>
          <div className={styles.barWrapper}>
            <div
              className={`${styles.indicator} ${styles.top}`}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ left: `${targetPos}%`, ["--c" as any]: "#3b82f6" }}
            >
              <span className={styles.label}>{targetLabel}</span>
              <div className={styles.arrow} />
            </div>

            <div className={styles.segmentedBar}>
              {goal.segments?.map((seg, idx) => (
                <div
                  key={idx}
                  className={styles.segment}
                  style={{ width: `${seg.width}%`, backgroundColor: seg.color }}
                />
              ))}

              <div className={styles.centerValue} style={{ left: `${currentPos}%` }}>
                {goal.currentValue}
                {goal.suffix}
              </div>
            </div>

            <div
              className={`${styles.indicator} ${styles.bottom}`}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ left: `${currentPos}%`, ["--c" as any]: "#10b981" }}
            >
              <div className={styles.arrow} />
              {goal.statusLabel && <span className={styles.label}>{goal.statusLabel}</span>}
            </div>
          </div>
        </>
      ) : (
        (() => {
          const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

          const pct = goal.totalPotential
            ? clamp((goal.currentValue / goal.totalPotential) * 100)
            : 0;

          const fillPct = clamp(pct, 18, 100);

          const leftLabel = `${goal.prefix ?? ""}${goal.currentValue}${goal.suffix ?? ""}`;
          const rightLabel = `${goal.prefix ?? ""}${goal.targetValue}${goal.suffix ?? ""}`;

          return (
            <>
              <h3 className={styles.headerSimple}>{goal.title}</h3>
              <div className={styles.simpleWrap}>
                <div className={styles.simpleRow}>
                  <div
                    className={styles.simpleBar}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className={styles.simpleFill} style={{ width: `${fillPct}%` }}>
                      <span className={styles.simpleValue}>{leftLabel}</span>
                    </div>
                  </div>

                  <div className={styles.simpleTarget}>{rightLabel}</div>
                </div>

                <div className={styles.simplePct}>{Math.round(pct)}%</div>
              </div>
            </>
          );
        })()
      )}
    </div>
  );
}

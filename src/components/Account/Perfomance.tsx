import { MetricCard } from "../ui/MetricCard/MetricCard";

import styles from "./Perfomance.module.scss";

import type { Metric } from "@/types";

function StatBody({ value, hint, subhint }: { value: string; hint?: string; subhint?: string }) {
  return (
    <div className={styles.wrapperStat}>
      <div className={styles.stat}>
        <div className={styles.big}>{value}</div>
        {hint ? <div className={styles.hint}>{hint}</div> : null}
      </div>
      {subhint ? <div className={styles.subhint}>{subhint}</div> : null}
    </div>
  );
}

export function Performance({ metric }: { metric: Metric }) {
  return (
    <>
      <MetricCard
        key={metric.title}
        title={metric.title}
        footerLink={metric.linkText}
        dots={metric.dots}
        className={styles.cardFixed}
      >
        <StatBody value={metric.value} hint={metric.hint} subhint={metric.subhint} />
      </MetricCard>
    </>
  );
}

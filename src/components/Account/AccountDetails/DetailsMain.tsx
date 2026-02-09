import { MetricCard } from "../../ui/MetricCard/MetricCard";
import { MiniBars } from "../../ui/MiniBars/MiniBars";

import styles from "./DetailsMain.module.scss";

import type { AccountDetailsContentByGroup, DecisionSupportWinabilityContent } from "@/types";
import { toTrendPath, stripPercentLabel, clampPct, clamp } from "@/utils/utils";

type Props = {
  groupId: "decision" | "risk" | "docs";
  itemId: string;
  content: AccountDetailsContentByGroup;
};

const DOTS_MAX = 5;
const MAX_DELTA = 100;
const BASE = 15;

export function DetailsMain({ groupId, itemId, content }: Props) {
  if (groupId === "decision" && itemId === "winability") {
    return <WinnabilityView data={content.decision.winability} />;
  }

  return (
    <div className={styles.placeholder}>
      Placeholder content for this section. We’ll implement the design later.
    </div>
  );
}

const FactorRow = ({
  idx,
  label,
  delta,
  tone,
}: {
  idx: number;
  label: string;
  delta: number;
  tone: "yellow" | "green";
}) => {
  const t = Math.min(1, Math.abs(delta) / MAX_DELTA);
  const eased = 1 - Math.pow(1 - t, 2);
  const width = BASE + eased * (100 - BASE);

  return (
    <div className={styles.factorRow} data-tone={tone}>
      <div className={styles.factorNum}>{idx}</div>

      <div className={styles.factorMid}>
        <div className={styles.factorLabel}>{label}</div>
        <div className={styles.factorBar}>
          <div className={styles.factorFill} style={{ width: `${width}%` }} />

          <div className={styles.factorDelta}>{delta > 0 ? `+${delta}%` : `${delta}%`}</div>
        </div>
      </div>
    </div>
  );
};

function WinnabilityView({ data }: { data: DecisionSupportWinabilityContent }) {
  const trendPath = toTrendPath(data.trend.points);

  const on = clamp(data.overallScore.dots, 0, DOTS_MAX);

  const positionItems = data.position.map((p) => ({
    label: stripPercentLabel(p.label),
    value: clampPct(p.value),
  }));

  return (
    <div className={styles.wrap}>
      <div className={styles.topCards}>
        <MetricCard title="Overall Score" className={styles.cardFixed}>
          <div className={styles.overallRow}>
            <div className={styles.overallValue}>{data.overallScore.percent}%</div>
            <div className={styles.overallPill}>
              <div className={styles.dots} aria-label={`Score ${on} out of ${DOTS_MAX}`}>
                {Array.from({ length: DOTS_MAX }, (_, i) => (
                  <span key={i} className={styles.dot} data-on={i < on} />
                ))}
              </div>
              {data.overallScore.label}
            </div>
          </div>
        </MetricCard>

        <MetricCard title="Historical trend" className={styles.cardFixed}>
          <div className={styles.trend}>
            <svg viewBox="0 0 220 52" className={styles.trendSvg} aria-hidden>
              <path d={trendPath} className={styles.trendLine} fill="none" />
            </svg>

            <div className={styles.trendLabels}>
              {data.trend.labels.map((l) => {
                return (
                  <span key={l} className={styles.trendLabel}>
                    {l}
                  </span>
                );
              })}
            </div>
          </div>
        </MetricCard>

        <MetricCard title="Position" className={styles.positionCard}>
          <div className={styles.positionBars}>
            <MiniBars items={positionItems} />
          </div>
        </MetricCard>
      </div>

      <div className={styles.midCards}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <img src="/arrowUp.png" alt="Arrow Up" />
            <div className={styles.cardTitle}>Increasing Winnability</div>
          </div>
          <div className={styles.factors}>
            {data.increasing.map(({ label, delta }, idx) => (
              <FactorRow key={label} idx={idx + 1} label={label} delta={delta} tone="green" />
            ))}
          </div>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <img src="/arrowDown.png" alt="Arrow Up" />
            <div className={styles.cardTitle}>Decreasing Winnability</div>
          </div>
          <div className={styles.factors}>
            {data.decreasing.map(({ label, delta }, idx) => (
              <FactorRow key={label} idx={idx + 1} label={label} delta={delta} tone="yellow" />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cardWrapper}>
        <div className={styles.aicardHeader}>
          <img src="/aiRocket.png" alt="Rocket" />
          <div className={styles.aicardTitle}>AI-Powevered Recommendation</div>
        </div>
        <div className={styles.recoList}>
          {data.recommendations.map((reco) => (
            <div key={reco.title} className={styles.recoItem}>
              <div className={styles.recoText}>
                <div className={styles.recoTitle}>{reco.title}</div>
                <div className={styles.recoDesc}>{reco.description}</div>
              </div>
              <button type="button" className={styles.recoBtn}>
                {reco.actionLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

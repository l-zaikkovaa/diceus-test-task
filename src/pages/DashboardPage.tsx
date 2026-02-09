import { useState } from "react";

import { Chip } from "../components/ui/Chip/Chip";
import { BtnActionModal } from "../components/ui/modals/BtnActionModal";

import styles from "./DashboardPage.module.scss";

import { MyAccountCard } from "@/components/Dashboard/MyAccountCard";
import { PortfolioGoalCard } from "@/components/Dashboard/PortfolioGoalCard";
import { WorkQueueCard } from "@/components/Dashboard/WorkQueueCard";
import { mockPortfolioGoals, marketIntel, quickActions } from "@/mocks";

export function DashboardPage() {
  const [modalBtnId, setModalBtnId] = useState<string | null>(null);
  const onBtnClickModal = (rowId: string) => setModalBtnId(rowId);
  const closeModal = () => setModalBtnId(null);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BtnActionModal
          open={modalBtnId !== null}
          btnAction={modalBtnId ?? ""}
          onClose={closeModal}
        />

        <section className={styles.topGrid}>
          <div className={styles.workArea}>
            <WorkQueueCard />
          </div>

          <div className={styles.portfolioArea}>
            <div className={styles.cardWrapper}>
              <h1 className={styles.cardTitle}>Portfolio goals</h1>

              <div className={styles.goalsList}>
                {mockPortfolioGoals.map((goal) => (
                  <PortfolioGoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.quickArea}>
            <div className={styles.cardWrapper}>
              <h2 className={styles.cardTitle}>Quick Actions</h2>
              <div className={styles.quickActions}>
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => onBtnClickModal(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.marketArea}>
            <div className={styles.cardWrapper}>
              <h2 className={styles.cardTitle}>Market intelligence</h2>
              <div className={styles.marketList}>
                {marketIntel.map((m) => (
                  <div key={m.title} className={styles.marketItem}>
                    <Chip tone={m.tone} size="lg" />
                    <div className={styles.marketText}>{m.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.myAccountArea}>
          <div className={styles.cardWrapper}>
            <MyAccountCard />
          </div>
        </div>
      </main>
    </div>
  );
}

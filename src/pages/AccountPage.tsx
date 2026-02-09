import styles from "./AccountPage.module.scss";

import { AccountDetails } from "@/components/Account/AccountDetails/AccountDetails";
import { AccountHeader } from "@/components/Account/AccountHeader";
import { Breadcrumbs } from "@/components/Account/Breadcrumbs";
import { Communication } from "@/components/Account/Communication";
import { Performance } from "@/components/Account/Perfomance";
import { Policies } from "@/components/Account/PoliciesRow";
import { PoliciesTable } from "@/components/Account/PoliciesTable";
import { CheckIcon } from "@/components/ui/CheckIcon/CheckIcon";
import { MetricCard } from "@/components/ui/MetricCard/MetricCard";
import { MiniBars } from "@/components/ui/MiniBars/MiniBars";
import { StatusStepper } from "@/components/ui/StatusStepper/StatusStepper";
import { accountPageMock as data } from "@/mocks";

export const AccountPage = () => {
  const steps = data.accountStatus.steps;
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Breadcrumbs items={data.breadcrumbs} />

        <div className={styles.topRow}>
          <AccountHeader account={data.account} />

          <div className={`${styles.cardWrapper} ${styles.needsAttentionWrapper}`}>
            <div className={styles.needsAttentionHeader}>
              <img src="/attention.png" alt="attention" />
              <span className={styles.needsAttentionTitle}>Needs Attention</span>
            </div>
            <div className={styles.needsAttentionMain}>
              {data.needsAttention.map((item, index) => (
                <div key={index} className={styles.needsAttentionItem}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemSubtitle}>{item.subtitle}</div>
                  <button className={styles.linkBtn} type="button">
                    {item.linkText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Performance Metrics</h2>
          <div className={styles.perfomanceWrapper}>
            {data.metrics.map((metric, index) => (
              <Performance metric={metric} key={index} />
            ))}
            <MetricCard title={data.exposure.title} className={styles.exposureCard}>
              <MiniBars items={data.exposure.bars} />
            </MetricCard>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Policies</h2>
          <div className={styles.row}>
            {data.policies.map((policy, index) => (
              <Policies policy={policy} key={index} />
            ))}
          </div>
        </section>

        <section className={styles.twoSection}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Account Status</h2>
            <div className={`${styles.cardWrapper} ${styles.statusWrapper}`}>
              <div className={styles.statusContainer}>
                {steps.map((step, index) => {
                  const isLast = index === steps.length - 1;
                  const isNextCompleted = !isLast && steps[index + 1].done;
                  return (
                    <StatusStepper
                      key={index}
                      step={step}
                      isLast={isLast}
                      index={index}
                      isNextCompleted={isNextCompleted}
                      isCompleted={step.done}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Complians & Documentation</h2>
              <button className={styles.linkBtn}>See history →</button>
            </div>
            <div className={styles.cardWrapper}>
              <div className={styles.grid}>
                <div className={styles.column}>
                  {data.compliance.left.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                      <div className={`${styles.iconWrapper} ${item.done ? styles.done : ""}`}>
                        <CheckIcon className={styles.checkIcon} />
                      </div>
                      <span className={styles.label}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.column}>
                  {data.compliance.right.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                      <div className={`${styles.iconWrapper} ${item.done ? styles.done : ""}`}>
                        <CheckIcon className={styles.checkIcon} />
                      </div>
                      <span className={styles.label}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Account Details</h2>
          <AccountDetails data={data.accountDetails} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Communication</h2>
          <div className={styles.cardWrapper}>
            <Communication items={data.communications} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.lastSection}`}>
          <h2 className={styles.sectionTitle}>Policies</h2>
          <div className={styles.cardWrapper}>
            <PoliciesTable />
          </div>
        </section>
      </div>
    </div>
  );
};

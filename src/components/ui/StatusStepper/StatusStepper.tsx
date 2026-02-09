import styles from "./StatusStepper.module.scss";

type StatusStepperProps = {
  step: { label: string; done: boolean };
  index: number;
  isLast: boolean;
  isNextCompleted: boolean;
  isCompleted: boolean;
};

export function StatusStepper({
  step,
  index,
  isLast,
  isNextCompleted,
  isCompleted,
}: StatusStepperProps) {
  return (
    <div key={`${step.label}-${index}`} className={styles.stepItem}>
      {!isLast && (
        <div className={`${styles.connector} ${isNextCompleted ? styles.completed : ""}`} />
      )}

      <div className={`${styles.circle} ${isCompleted ? styles.active : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          width={15}
          height={15}
          className={styles.icon}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <span className={`${styles.label} ${isCompleted ? styles.active : ""}`}>{step.label}</span>
    </div>
  );
}

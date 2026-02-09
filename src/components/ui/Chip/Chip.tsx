import styles from "./Chip.module.scss";

export type ChipTone = "blue" | "green" | "yellow" | "red";

type ChipSize = "xs" | "sm" | "md" | "lg";

type Props = {
  tone?: ChipTone;
  size?: ChipSize;
  px?: number;
  className?: string;
};

export function Chip({ tone = "blue", size = "sm", px, className }: Props) {
  return (
    <span
      className={`${styles.dot} ${styles[tone]} ${styles[size]} ${className ?? ""}`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={px ? ({ ["--chip-size" as any]: `${px}px` } as React.CSSProperties) : undefined}
      aria-hidden="true"
    />
  );
}

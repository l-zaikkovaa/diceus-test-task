import { useEffect } from "react";
import styles from "./BtnActionModal.module.scss";

type Props = {
  open: boolean;
  btnAction: string;
  onClose: () => void;
  title?: string;
};

export function BtnActionModal({ open, btnAction, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Row Action">
        <div className={styles.header}>
          <div className={styles.title}>Button Action clicked</div>
          <button className={styles.close} type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          You clicked on Button <b>{btnAction}</b>
        </div>
      </div>
    </div>
  );
}

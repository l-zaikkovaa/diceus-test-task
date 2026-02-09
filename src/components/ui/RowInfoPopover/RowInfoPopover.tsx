import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./RowInfoPopover.module.scss";

type Props = {
  open: boolean;
  text: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

export function RowInfoPopover({ open, text, anchorEl, onClose }: Props) {
  const popRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; minWidth?: number }>({
    top: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    if (!open) return;
    if (!anchorEl) return;

    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      const pop = popRef.current;

      const popWidth = pop?.offsetWidth ?? 260;
      const popHeight = pop?.offsetHeight ?? 140;

      const margin = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let left = r.right - popWidth;
      let top = r.bottom + 8;

      left = Math.max(margin, Math.min(left, vw - popWidth - margin));
      top = Math.max(margin, Math.min(top, vh - popHeight - margin));

      setPos({ top, left, minWidth: r.width });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchorEl]);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (!t) return;

      const insideAnchor = !!anchorEl && anchorEl.contains(t);
      const insidePop = !!popRef.current && popRef.current.contains(t);

      if (!insideAnchor && !insidePop) onClose();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return;

  return createPortal(
    <div
      ref={popRef}
      className={styles.popover}
      style={{ top: pos.top, left: pos.left, minWidth: pos.minWidth }}
    >
      <div className={styles.title}>Info</div>
      <div className={styles.body}>{text}</div>
    </div>,
    document.body,
  );
}

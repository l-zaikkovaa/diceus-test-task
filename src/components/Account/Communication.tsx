import { useId, useState } from "react";

import { BtnActionModal } from "../ui/modals/BtnActionModal";

import styles from "./Communication.module.scss";

import type { CommunicationItem } from "@/types";

export const Communication = ({ items }: { items: CommunicationItem[] }) => {
  const searchId = useId();
  const [query, setQuery] = useState("");

  const [modalBtnId, setModalBtnId] = useState<string | null>(null);

  const onBtnClickModal = (rowId: string) => setModalBtnId(rowId);

  const closeModal = () => setModalBtnId(null);

  const q = query.trim().toLowerCase();
  const list = q
    ? items.filter((it) => {
        const blob = `${it.title} ${it.status ?? ""} ${it.date} ${it.content}`.toLowerCase();
        return blob.includes(q);
      })
    : items;

  const left = list.filter((it) => it.column !== "right");
  const right = list.filter((it) => it.column === "right");

  const renderCard = (item: CommunicationItem) => {
    return (
      <article
        key={`${item.title}-${item.date}`}
        className={[
          styles.card,
          item.column === "right" ? styles.cardRight : styles.cardLeft,
          item.status?.toLowerCase() === "new" ? styles.cardNew : "",
        ].join(" ")}
      >
        <div className={styles.topRow}>
          {item.status ? <span className={styles.badge}>{item.status}</span> : null}
          <div className={styles.topTitle}>{item.title}</div>
        </div>

        <div className={styles.date}>{item.date}</div>
        <p className={styles.content}>{item.content}</p>

        {(item.attachments || item.btn) && (
          <>
            <div>
              {item.attachments !== 0 ? (
                <button
                  type="button"
                  onClick={() => onBtnClickModal("Attachments")}
                  className={styles.attachmentsBtn}
                >
                  <img src="/clip.png" alt="" aria-hidden="true" />
                  {item.attachments} attachments
                </button>
              ) : (
                <span />
              )}
            </div>
            <div>
              {item.btn ? (
                <button
                  type="button"
                  onClick={() => onBtnClickModal("Reply")}
                  className={styles.replyBtn}
                >
                  {item.btn}
                </button>
              ) : null}
            </div>
          </>
        )}
      </article>
    );
  };

  return (
    <div className={styles.shell}>
      <BtnActionModal
        open={modalBtnId !== null}
        btnAction={modalBtnId ?? ""}
        onClose={closeModal}
      />
      <div className={styles.toolbar}>
        <label className={styles.searchLabel} htmlFor={searchId}>
          <input
            id={searchId}
            className={styles.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search communication"
          />
        </label>

        <button className={styles.toolbarBtn} type="button">
          Filter
        </button>
        <button className={styles.toolbarBtn} type="button">
          Group
        </button>
      </div>

      <div className={styles.communicationPills}>
        <div className={styles.colLeft}>{left.map(renderCard)}</div>
        <div className={styles.colRight}>{right.map(renderCard)}</div>
      </div>
    </div>
  );
};

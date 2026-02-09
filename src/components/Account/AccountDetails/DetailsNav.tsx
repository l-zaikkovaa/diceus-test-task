import styles from "./DetailsNav.module.scss";

import type { AccountDetailsNavGroup } from "@/types";

type Props = {
  groups: AccountDetailsNavGroup[];
  activeGroupIndex: number;
  activeItemId: string;

  onGroupChange: (groupIndex: number) => void;
  onItemChange?: (itemId: string) => void;
};

const GroupHeader = ({
  isActiveGroup = false,
  onGroupChange,
  title,
  count,
}: {
  isActiveGroup?: boolean;
  onGroupChange: () => void;
  title: string;
  count: number;
}) => (
  <button
    type="button"
    className={styles.groupHeaderBtn}
    data-active={isActiveGroup}
    onClick={onGroupChange}
  >
    <div className={styles.groupTitle}>{title}</div>
    <div className={styles.badge}>{count}</div>
  </button>
);

export function DetailsNav({
  groups,
  activeGroupIndex,
  activeItemId,
  onGroupChange,
  onItemChange,
}: Props) {
  return (
    <aside className={styles.nav}>
      {groups.map((group, idx) => {
        if (idx === activeGroupIndex) {
          return (
            <div key={group.title} className={styles.activeGroupCard}>
              <GroupHeader
                onGroupChange={() => onGroupChange(idx)}
                count={group.count}
                isActiveGroup
                title={group.title}
              />
              {group.items.length > 0 ? (
                <div className={styles.items}>
                  {group.items.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      className={styles.item}
                      data-active={id === activeItemId}
                      onClick={() => onItemChange?.(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <div key={group.title} className={styles.groupRow}>
            <GroupHeader
              onGroupChange={() => onGroupChange(idx)}
              count={group.count}
              title={group.title}
            />
          </div>
        );
      })}
    </aside>
  );
}

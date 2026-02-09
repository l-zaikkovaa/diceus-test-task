import { useState, useMemo, useCallback } from "react";

import styles from "./AccountDetails.module.scss";
import { DetailsMain } from "./DetailsMain";
import { DetailsNav } from "./DetailsNav";

import type { AccountDetailsData } from "@/types";

export function AccountDetails({ data }: { data: AccountDetailsData }) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeItemId, setActiveItemId] = useState(data.nav[0].items[0].id);

  const activeGroup = data.nav[activeGroupIndex];

  const activeItemLabel = useMemo(
    () => activeGroup.items.find((x) => x.id === activeItemId)?.label ?? "",
    [activeGroup, activeItemId],
  );

  const handleGroupChange = useCallback(
    (groupIndex: number) => {
      if (groupIndex === activeGroupIndex) {
        return;
      }

      setActiveGroupIndex(groupIndex);
      setActiveItemId(data.nav[groupIndex].items[0].id);
    },
    [activeGroupIndex, data.nav],
  );

  return (
    <div className={styles.shell}>
      <DetailsNav
        groups={data.nav}
        activeItemId={activeItemId}
        activeGroupIndex={activeGroupIndex}
        onGroupChange={handleGroupChange}
        onItemChange={(id) => setActiveItemId(id)}
      />

      <div className={styles.main}>
        <div className={styles.mainTitle}>{activeItemLabel}</div>
        <DetailsMain groupId={activeGroup.id} itemId={activeItemId} content={data.content} />
      </div>
    </div>
  );
}

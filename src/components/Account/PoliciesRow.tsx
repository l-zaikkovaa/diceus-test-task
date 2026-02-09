import type { FC } from "react";

import { Pill } from "../ui/Pills/Pill";

import styles from "./PoliciesRow.module.scss";

import type { Policy } from "@/types";

const POLICY_ICONS: Record<Policy["id"], { src: string; alt: string }> = {
  marine: { src: "/marine.png", alt: "Marine" },
  liability: { src: "/liability.png", alt: "Liability" },
  workers: { src: "/workers.png", alt: "Workers" },
  property: { src: "/property.png", alt: "Property" },
  umbrella: { src: "/umbrella.png", alt: "Umbrella" },
};

interface IPolicyProps {
  policy: Policy;
}

export const Policies: FC<IPolicyProps> = ({ policy }: { policy: Policy }) => {
  const icon = POLICY_ICONS[policy.id];

  return (
    <Pill
      key={policy.title}
      icon={<img src={icon.src} alt={icon.alt} className={styles.icon} />}
      title={policy.title}
      subtitle={policy.subtitle}
      date={policy.meta}
    />
  );
};

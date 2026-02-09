export type WorkQueueTab = "assigned" | "pending" | "referrals";

export type WorkQueueRow = {
  id: string;
  originator: { initials: string; name: string };
  clientLine: { title: string; subtitle: string };
  type: string;
  status: { label: string; tone: "blue" | "yellow" | "green" };
  created: string;
  details: string;
};

export type GoalType = "segmented" | "simple";

export interface Segment {
  color: string;
  width: number;
}

export interface PortfolioGoal {
  id: string;
  title: string;
  type: GoalType;
  currentValue: number;
  targetValue: number | [number, number];
  totalPotential?: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  statusLabel?: string;
  segments?: Segment[];
}

export type AccountRow = {
  accountName: string;
  accountType: string;
  line: string;
  broker: string;
  renewalDate: string;
  premium: string;
  ratedPremium: string;
  lossRatio: { value: string; tone: "yellow" | "green" | "red" };
  appetite: string;
  status: { label: string; tone: "green" | "blue" | "yellow" };
  triage: number;
  winnability: { label: "Very Strong" | "Strong" | "Medium"; score: 3 | 4 | 5 };
  details: string;
};

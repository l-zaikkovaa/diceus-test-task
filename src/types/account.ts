export type BreadcrumbItem = { label: string; href?: string };

export type AccountHeaderData = {
  name: string;
  address: string;
  meta: Array<{ label: string; value: string }>;
  logoText?: string;
  logoPath?: string;
};

export type NeedsAttentionItem = {
  title: string;
  subtitle: string;
  linkText: string;
};

export type Metric = {
  title: string;
  value: string;
  dots?: number;
  hint?: string;
  subhint?: string;
  linkText: string;
};

export type ExposureData = {
  title: string;
  bars: Array<{ label: string; value: number }>;
};

export type Policy = {
  id: "marine" | "liability" | "workers" | "property" | "umbrella";
  title: string;
  subtitle: string;
  meta: string;
};

export type AccountStatusData = {
  steps: Array<{ label: string; done: boolean }>;
};

export type ComplianceItem = {
  label: string;
  done: boolean;
};

export type ComplianceData = {
  title: string;
  linkText: string;
  left: ComplianceItem[];
  right: ComplianceItem[];
};

export type AccountDetailsNavItem = { id: string; label: string };

export type AccountDetailsNavGroup = {
  id: "decision" | "risk" | "docs";
  title: string;
  count: number;
  items: AccountDetailsNavItem[];
};

export type DecisionSupportWinabilityContent = {
  kind: "winability";
  headerTitle: string;

  overallScore: { percent: number; dots: number; label: string };
  trend: { labels: string[]; points: number[] };
  position: Array<{ label: string; value: number }>;

  increasing: Array<{ label: string; delta: number }>;
  decreasing: Array<{ label: string; delta: number }>;

  recommendations: Array<{
    title: string;
    description: string;
    actionLabel: string;
  }>;
};

export type DecisionSupportContent = {
  winability: DecisionSupportWinabilityContent;
};

export type AccountDetailsContentByGroup = {
  decision: DecisionSupportContent;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  risk: {};
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  docs: {};
};

export type AccountDetailsData = {
  nav: AccountDetailsNavGroup[];
  content: AccountDetailsContentByGroup;
};

export type CommunicationItem = {
  title: string;
  status?: string;
  date: string;
  content: string;
  attachments?: number;
  btn?: string;
  column: "left" | "right";
};

export type PoliciesRow = {
  line: { accountIconPath: string; accountName: string; accountId: string };
  effDate: string;
  expDate: string;
  status: { label: string; tone: "green" | "blue" | "yellow" };
  expiringTech: string;
  expiringPremium: string;
  renewalToTech: string;
  renewalTech: string;
  renewalPremium: string;
  rateChange: { value: string; tone: "yellow" | "green" | "red" | "none" };
  lossRatio: { value: string; tone: "yellow" | "green" | "red" | "none" };
  details: string;
};

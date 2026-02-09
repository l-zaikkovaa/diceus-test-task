import type {
  PoliciesRow,
  BreadcrumbItem,
  AccountHeaderData,
  NeedsAttentionItem,
  Metric,
  ExposureData,
  Policy,
  AccountStatusData,
  ComplianceData,
  AccountDetailsData,
  CommunicationItem,
} from "../types";

export const accountsTable: PoliciesRow[] = [
  {
    line: {
      accountIconPath: "/marineSmall.png",
      accountName: "Marine Cargo",
      accountId: "17030212",
    },
    effDate: "6/30/2026",
    expDate: "6/30/2027",
    status: { label: "Active", tone: "green" },
    expiringTech: "$587,500",
    expiringPremium: "$605,000",
    renewalToTech: "$610,000",
    renewalTech: "$620,000",
    renewalPremium: "$625,000",
    rateChange: { value: "3.3%", tone: "none" },
    lossRatio: { value: "22%", tone: "green" },
    details: "Marine Cargo with id:17030212 - details",
  },
  {
    line: {
      accountIconPath: "/liabilitySmall.png",
      accountName: "General Liability",
      accountId: "4631092",
    },
    effDate: "6/30/2026",
    expDate: "6/30/2027",
    status: { label: "Аctive", tone: "green" },
    expiringTech: "$160,000",
    expiringPremium: "$165,000",
    renewalToTech: "$170,000",
    renewalTech: "$172,500",
    renewalPremium: "$175,000",
    rateChange: { value: "6.1%", tone: "red" },
    lossRatio: { value: "55%", tone: "yellow" },
    details: "General Liability with id:4631092 - details",
  },
  {
    line: {
      accountIconPath: "/workersSmall.png",
      accountName: "Workers Comp",
      accountId: "9182371",
    },
    effDate: "Pending",
    expDate: "Pending",
    status: { label: "Pending", tone: "yellow" },
    expiringTech: "$0",
    expiringPremium: "$0",
    renewalToTech: "$73,500",
    renewalTech: "$75,000",
    renewalPremium: "$75,000",
    rateChange: { value: "N/A", tone: "none" },
    lossRatio: { value: "N/A", tone: "none" },
    details: "Workers Comp with id:9182371 - details",
  },
  {
    line: { accountIconPath: "/umbrellaSmall.png", accountName: "Umbrella", accountId: "5274936" },
    effDate: "13/03/2026",
    expDate: "13/03/2027",
    status: { label: "Active", tone: "green" },
    expiringTech: "$245,500",
    expiringPremium: "$250,000",
    renewalToTech: "$267,000",
    renewalTech: "$270,000",
    renewalPremium: "$275,000",
    rateChange: { value: "10.0%", tone: "red" },
    lossRatio: { value: "78%", tone: "red" },
    details: "Umbrella with id:5274936 - details",
  },
];

export const accountPageMock: {
  breadcrumbs: BreadcrumbItem[];
  account: AccountHeaderData;
  needsAttention: NeedsAttentionItem[];
  metrics: Metric[];
  exposure: ExposureData;
  policies: Policy[];
  accountStatus: AccountStatusData;
  compliance: ComplianceData;
  accountDetails: AccountDetailsData;
  communications: CommunicationItem[];
} = {
  breadcrumbs: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Accounts", href: "/account" },
    { label: "Maritime Logistics Corp" },
  ],
  account: {
    name: "Maritime Logistics Corp",
    address: "425 Harbor Boulevard, Suite 300 Seattle, WA 98104",
    meta: [
      { label: "Existing account", value: "54383" },
      { label: "Broker", value: "Marsh McLennan" },
      { label: "Underwriter", value: "Kate Johnson" },
    ],
    logoText: "ML",
    logoPath: "/logoMaritime.png",
  },
  needsAttention: [
    {
      title: "Marine Survey Required",
      subtitle: "Scheduled for 06/12/2025",
      linkText: "Review details →",
    },
    {
      title: "Loss Control Complete",
      subtitle: "Last inspection: 02/15/2025",
      linkText: "View report →",
    },
    {
      title: "Claims Review Required",
      subtitle: "3 open claims | $245,000 TTL",
      linkText: "View claims →",
    },
  ],
  metrics: [
    {
      title: "Winability",
      value: "Very Strong",
      dots: 4,
      linkText: "See all factors →",
    },
    {
      title: "Loss Ratio",
      value: "25%",
      hint: "vs 42% target",
      linkText: "View history →",
    },
    {
      title: "Premium Growth",
      value: "12.4%",
      hint: "YoY increase",
      subhint: "$123M vs $150M target",
      linkText: "View trend →",
    },
  ],
  exposure: {
    title: "Exposure Distribution",
    bars: [
      { label: "Marine Cargo", value: 0.714 },
      { label: "General Liability", value: 0.2 },
      { label: "Workers Comp", value: 0.086 },
    ],
  },
  policies: [
    {
      id: "marine",
      title: "Marine Cargo",
      subtitle: "Premium: $625,000",
      meta: "Eff.Date: 6/30/2026",
    },
    {
      id: "liability",
      title: "General Liability",
      subtitle: "Premium: $175,000",
      meta: "Eff.Date: 6/30/2026",
    },
    { id: "workers", title: "Workers Comp", subtitle: "Premium: $75,000", meta: "Eff.Date: —" },
    { id: "property", title: "Property", subtitle: "Premium: $64,829.83", meta: "Eff.Date: —" },
    {
      id: "umbrella",
      title: "Umbrella",
      subtitle: "Premium: $275,000",
      meta: "Eff.Date: 13/03/2026",
    },
  ],
  accountStatus: {
    steps: [
      { label: "Submitted", done: true },
      { label: "Review", done: true },
      { label: "Quote", done: true },
      { label: "Bind", done: true },
      { label: "Issue", done: true },
      { label: "Renew", done: false },
    ],
  },
  compliance: {
    title: "Compliance & Documentation",
    linkText: "See history →",
    left: [
      { label: "KYC verification", done: true },
      { label: "Regulatory approval", done: true },
    ],
    right: [
      { label: "Required Documentation", done: true },
      { label: "Financial Verification", done: true },
    ],
  },
  accountDetails: {
    nav: [
      {
        id: "decision",
        title: "DECISION SUPPORT",
        count: 4,
        items: [
          { id: "winability", label: "Winnability" },
          { id: "exposure", label: "Exposure Review & Suggested Coverage" },
          { id: "portfolio", label: "Portfolio Strategy Alignment" },
          { id: "broker", label: "Broker Analytics" },
        ],
      },
      {
        id: "risk",
        title: "RISK ASSESSMENT",
        count: 6,
        items: [
          { id: "riskMock", label: "Risk item 1" },
          { id: "riskMock2", label: "Risk item 2" },
          { id: "riskMock3", label: "Risk item 3" },
          { id: "riskMock4", label: "Risk item 4" },
          { id: "riskMock5", label: "Risk item 5" },
          { id: "riskMock6", label: "Risk item 6" },
        ],
      },
      {
        id: "docs",
        title: "DOCUMENTS AND COMPLIANCE",
        count: 2,
        items: [
          { id: "documents", label: "Documents item 1" },
          { id: "documents1", label: "Documents item 2" },
        ],
      },
    ],

    content: {
      decision: {
        winability: {
          kind: "winability",
          headerTitle: "Winnability",

          overallScore: { percent: 82, dots: 4, label: "Very Strong" },

          trend: {
            labels: ["Jan", "Feb", "Mar", "Apr", "Now"],
            points: [38, 66, 53, 71, 78, 56, 98, 88, 110],
          },

          position: [
            { label: "Your score: 82%", value: 0.82 },
            { label: "Market Avg: 68%", value: 0.68 },
            { label: "Top competitor: 88%", value: 0.88 },
          ],

          increasing: [
            { label: "Brokers relationship", delta: 28 },
            { label: "Loss history", delta: 22 },
            { label: "Industry growth", delta: 16 },
            { label: "Multiline opportunity", delta: 11 },
          ],

          decreasing: [
            { label: "Premium pricing", delta: -24 },
            { label: "Total exposure", delta: -18 },
            { label: "Loss ratio trend", delta: -13 },
            { label: "Market competition", delta: -5 },
          ],

          recommendations: [
            {
              title: "Offer 5% premium discount in exchange for 3-year commitment",
              description:
                "Historical win rate increases 24% with multi-year commitments. Current pricing is 12% above market average. This approach would strengthen retention while maintaining adequate profitability.",
              actionLabel: "Apply",
            },
            {
              title: "Propose risk control services for cargo handling procedures",
              description:
                "Can potentially reduce loss ratio by 15–20% based on similar maritime accounts in your portfolio. Specific focus on loading/unloading operations would address the most frequent claim scenarios.",
              actionLabel: "Apply",
            },
          ],
        },
      },
      risk: {},
      docs: {},
    },
  },
  communications: [
    {
      status: "NEW",
      title: "Policy Renewal - Auto Insurance 5/15/25",
      date: "Michael Roberts // Apr 5",
      content:
        "Hello Arthur, I'm reaching out regarding the upcoming auto policy renewal for Real Estate Group, LLC. The current policy expires 6/30/2024. Would you like to review coverage options before proceeding with the renewal? I've attached the current policy details and premium breakdown for your reference.",
      attachments: 3,
      btn: "Reply",
      column: "left",
    },
    {
      status: "NEW",
      title: "New Quote Request - Workers Comp Insurance",
      date: "Sarah Chen // Apr 5",
      content:
        "Hi Arthur, Real Estate Group has expressed interest in adding workers compensation coverage to their insurance portfolio. I've completed the initial risk assessment based on the information provided and attached the required documents for your review.",
      attachments: 3,
      btn: "Reply",
      column: "left",
    },
    {
      status: "Responded",
      title: "Fwd: New Submission - BPM Real Estate - EFF 4/1/24",
      date: "Joshua Dunmire // Mar 25",
      content:
        "Arthur, attached please find our submission for the above mentioned applicant. We have included the updated loss runs and the revised exposure schedule. Let us know if you need anything else.",
      column: "right",
    },
    {
      title: "New Business: BPM Real Estate Group, LLC",
      date: "Isabel Kreller // Feb 28",
      content:
        "Hello Arthur, I am pleased to present you with a submission on this client's upcoming renewal. Please review the attached documentation and advise if you would like alternate coverage options or additional quotes.",
      attachments: 5,
      btn: "Reply",
      column: "right",
    },
  ],
};

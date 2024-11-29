export const initialTools = [
  {
    name: "Great Expectations",
    type: "quality" as const,
    cost: 500,
    effect: 0.2,
    purchased: false,
  },
  {
    name: "DBT Cloud",
    type: "cleaning" as const,
    cost: 1000,
    effect: 2,
    purchased: false,
  },
  {
    name: "Airflow",
    type: "automation" as const,
    cost: 2000,
    effect: 0.5,
    purchased: false,
  },
  {
    name: "Fivetran",
    type: "cleaning" as const,
    cost: 3000,
    effect: 5,
    purchased: false,
  },
  {
    name: "Monte Carlo",
    type: "quality" as const,
    cost: 5000,
    effect: 0.3,
    purchased: false,
  },
];

export const initialUpgrades = [
  { name: "Excel", cost: 100, effect: 1, purchased: false },
  { name: "HubSpot", cost: 500, effect: 5, purchased: false },
  { name: "Google Analytics", cost: 2000, effect: 20, purchased: false },
  { name: "SalesForce", cost: 10000, effect: 100, purchased: false },
];

export const initialModels = [
  { name: "Linear Regression", cost: 50, effect: 1 },
  { name: "Mini Rocket", cost: 200, effect: 5 },
  { name: "Keras", cost: 1000, effect: 25 },
  { name: "PyCaret", cost: 5000, effect: 100 },
];

export const initialConnectors = [
  { name: "API Rest", cost: 100, throughput: 1 },
  { name: "Mage", cost: 500, throughput: 5 },
  { name: "Firebase", cost: 2000, throughput: 25 },
  { name: "ClickHouse", cost: 10000, throughput: 100 },
];

export const initialGovernancePolicies = [
  {
    id: "gdpr",
    name: "GDPR Compliance",
    description: "Compliance with European laws",
    cost: 5000,
    monthlyFee: 1000,
    reputationBonus: 10,
    riskReduction: 0.3,
    active: false,
  },
  {
    id: "rbac",
    name: "RBAC Advanced",
    description: "Fine access management",
    cost: 2000,
    monthlyFee: 500,
    reputationBonus: 5,
    riskReduction: 0.2,
    active: false,
  },
  {
    id: "audit",
    name: "Audit Trail",
    description: "Lineage & Data Catalog",
    cost: 3000,
    monthlyFee: 750,
    reputationBonus: 7,
    riskReduction: 0.25,
    active: false,
  },
];

export const initialResources = {
  rawData: 0,
  cleanData: 0,
  models: 0,
  dataPerClick: 1,
  dataPerSecond: 0,
  cleaningPerSecond: 0,
  dataQuality: 0.1,
  connectors: 0,
  ingestedPerSecond: 0,
  dashboards: {},
  revenue: 5000,
  timeRemaining: 30 * 60,
  gameOver: false,
  hasWon: false,
  securityBonusCollected: false,
  employees: {},
  businessUnits: {},
  bitcoinBalance: 0,
  bitcoinPrice: 30000,
  autoSaleEnabled: false,
  showDailyMeeting: false,
  showNewsletterPopup: false,
  transformationRatio: 1,
  completedTraining: {},
  selfServiceRevenue: 0,
  showErrorMessage: null,
  governancePolicies: initialGovernancePolicies,
};
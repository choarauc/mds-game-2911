import { ReactNode } from 'react';

export interface Resources {
  rawData: number;
  cleanData: number;
  models: number;
  dataPerClick: number;
  dataPerSecond: number;
  cleaningPerSecond: number;
  dataQuality: number;
  connectors: number;
  ingestedPerSecond: number;
  dashboards: Record<string, number>;
  revenue: number;
  timeRemaining: number;
  gameOver: boolean;
  hasWon: boolean;
  securityBonusCollected: boolean;
  employees: Record<string, boolean>;
  businessUnits: Record<string, boolean>;
  bitcoinBalance: number;
  bitcoinPrice: number;
  autoSaleEnabled: boolean;
  showDailyMeeting: boolean;
  showNewsletterPopup: boolean;
  transformationRatio: number;
  completedTraining: Record<string, boolean>;
  selfServiceRevenue: number;
  showErrorMessage: string | null;
  governancePolicies: GovernancePolicy[];
}

export interface Tool {
  name: string;
  type: 'quality' | 'cleaning' | 'automation';
  cost: number;
  effect: number;
  purchased: boolean;
}

export interface Upgrade {
  name: string;
  cost: number;
  effect: number;
  purchased: boolean;
}

export interface Model {
  name: string;
  cost: number;
  effect: number;
}

export interface Connector {
  name: string;
  cost: number;
  throughput: number;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  cost: number;
  monthlyFee: number;
  reputationBonus: number;
  riskReduction: number;
  active: boolean;
}

export interface GameContextType {
  resources: Resources;
  tools: Tool[];
  connectors: Connector[];
  models: Model[];
  upgrades: Upgrade[];
  governancePolicies: GovernancePolicy[];
  collectData: () => void;
  cleanData: () => void;
  trainModel: (index: number) => void;
  purchaseUpgrade: (index: number) => void;
  purchaseTool: (index: number) => void;
  buildConnector: (index: number) => void;
  togglePolicy: (id: string) => void;
  createDashboard: (id: string, revenue: number) => void;
  sellData: (type: string) => void;
  buyCleanData: (id: string) => void;
  restartGame: () => void;
  hireEmployee: (id: string) => void;
  activateBusinessUnit: (id: string) => void;
  tradeBitcoin: (action: 'buy' | 'sell', amount: number) => void;
  attendDailyMeeting: () => void;
  skipDailyMeeting: () => void;
  startTraining: (programId: string) => void;
  startSelfService: (serviceId: string) => void;
  subscribeNewsletter: () => void;
  skipNewsletter: () => void;
}
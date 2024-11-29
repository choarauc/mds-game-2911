import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCleaningOutput, calculateAutomaticSale } from '../utils/cleaningUtils';
import {
  initialTools,
  initialUpgrades,
  initialModels,
  initialConnectors,
  initialGovernancePolicies,
  initialResources,
} from '../constants/gameConstants';
import type { GameContextType } from '../types/game';

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState(initialResources);
  const [tools, setTools] = useState(initialTools);
  const [upgrades, setUpgrades] = useState(initialUpgrades);
  const [governancePolicies, setGovernancePolicies] = useState(initialGovernancePolicies);

  const collectData = () => {
    if (!resources.gameOver) {
      const multiplier = resources.employees.lead ? 2 : 1;
      setResources(prev => ({
        ...prev,
        rawData: prev.rawData + (prev.dataPerClick * multiplier),
      }));
    }
  };

  const cleanData = () => {
    if (!resources.gameOver) {
      const cleaningRatio = resources.employees.engineer ? 1 : Math.max(2, Math.floor(10 * (1 - resources.dataQuality)));
      if (resources.rawData >= cleaningRatio) {
        const outputRatio = resources.employees.engineer ? resources.transformationRatio : Math.ceil(10 / cleaningRatio);
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - cleaningRatio,
          cleanData: prev.cleanData + outputRatio,
        }));
      }
    }
  };

  const trainModel = (index: number) => {
    if (!resources.gameOver) {
      const model = initialModels[index];
      if (resources.cleanData >= model.cost) {
        setResources(prev => ({
          ...prev,
          cleanData: prev.cleanData - model.cost,
          models: prev.models + 1,
          dataPerSecond: prev.dataPerSecond + model.effect,
        }));
      }
    }
  };

  const purchaseUpgrade = (index: number) => {
    if (!resources.gameOver) {
      const upgrade = upgrades[index];
      if (resources.rawData >= upgrade.cost && !upgrade.purchased) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - upgrade.cost,
          dataPerClick: prev.dataPerClick + upgrade.effect,
        }));
        setUpgrades(prev => prev.map((u, i) => 
          i === index ? { ...u, purchased: true } : u
        ));
      }
    }
  };

  const purchaseTool = (index: number) => {
    if (!resources.gameOver) {
      const tool = tools[index];
      if (resources.revenue >= tool.cost && !tool.purchased) {
        setResources(prev => {
          let newResources = {
            ...prev,
            revenue: prev.revenue - tool.cost,
          };

          switch (tool.type) {
            case 'quality':
              newResources.dataQuality = Math.min(1, prev.dataQuality + tool.effect);
              break;
            case 'cleaning':
              newResources.cleaningPerSecond = prev.cleaningPerSecond + tool.effect;
              break;
            case 'automation':
              newResources.autoSaleEnabled = true;
              break;
          }

          return newResources;
        });
        
        setTools(prev => prev.map((t, i) => 
          i === index ? { ...t, purchased: true } : t
        ));
      }
    }
  };

  const buildConnector = (index: number) => {
    if (!resources.gameOver) {
      const connector = initialConnectors[index];
      const activePolicies = governancePolicies.filter(p => p.active).length;
      const hasFullGovernance = activePolicies === 3;
      
      if (resources.connectors >= 1000 && !hasFullGovernance) {
        setResources(prev => ({
          ...prev,
          showErrorMessage: 'You need full data governance (3/3) to create more connectors.',
        }));
        setTimeout(() => {
          setResources(prev => ({ ...prev, showErrorMessage: null }));
        }, 3000);
        return;
      }

      if (resources.rawData >= connector.cost) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - connector.cost,
          connectors: prev.connectors + 1,
          ingestedPerSecond: prev.ingestedPerSecond + connector.throughput,
        }));
      }
    }
  };

  const togglePolicy = (id: string) => {
    if (!resources.gameOver) {
      const policy = governancePolicies.find(p => p.id === id);
      if (policy && !policy.active && resources.revenue >= policy.cost) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - policy.cost,
        }));
        setGovernancePolicies(prev => prev.map(p => 
          p.id === id ? { ...p, active: true } : p
        ));
      }
    }
  };

  const createDashboard = (id: string, revenue: number) => {
    if (!resources.gameOver && !resources.dashboards[id]) {
      const cost = {
        basic: 5,
        advanced: 25,
        predictive: 100,
        enterprise: 500,
      }[id] || 0;

      if (resources.models >= cost) {
        setResources(prev => ({
          ...prev,
          models: prev.models - cost,
          revenue: prev.revenue - cost * 50,
          dashboards: { ...prev.dashboards, [id]: revenue * (resources.employees.analyst ? 1.1 : 1) },
        }));
      }
    }
  };

  const sellData = (type: string) => {
    if (!resources.gameOver) {
      if (type === 'raw_data' && resources.rawData >= 10000) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - 10000,
          revenue: prev.revenue + 10,
        }));
      } else if (type === 'clean_data' && resources.cleanData >= 100) {
        setResources(prev => ({
          ...prev,
          cleanData: prev.cleanData - 100,
          revenue: prev.revenue + 10,
        }));
      }
    }
  };

  const buyCleanData = (id: string) => {
    if (!resources.gameOver) {
      if (id === 'buy_clean_10' && resources.revenue >= 10) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - 10,
          cleanData: prev.cleanData + 10,
        }));
      } else if (id === 'buy_clean_100' && resources.rawData >= 100000) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - 100000,
          cleanData: prev.cleanData + 100,
        }));
      }
    }
  };

  const hireEmployee = (id: string) => {
    if (!resources.gameOver && !resources.employees[id]) {
      const costs = {
        analyst: 5000,
        engineer: 7000,
        lead: 9000,
        head: 12000,
      };

      const cost = costs[id as keyof typeof costs];
      if (resources.revenue >= cost) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - cost,
          employees: { ...prev.employees, [id]: true },
        }));
      }
    }
  };

  const activateBusinessUnit = (id: string) => {
    if (!resources.gameOver && !resources.businessUnits[id] && resources.employees.head) {
      setResources(prev => {
        const newResources = {
          ...prev,
          businessUnits: { ...prev.businessUnits, [id]: true },
        };

        if (id === 'marketing') {
          newResources.timeRemaining += 30 * 60;
        }

        return newResources;
      });
    }
  };

  const tradeBitcoin = (action: 'buy' | 'sell', amount: number) => {
    if (!resources.gameOver && resources.businessUnits.finance) {
      const value = amount * resources.bitcoinPrice;

      if (action === 'buy' && resources.revenue >= value) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue - value,
          bitcoinBalance: (prev.bitcoinBalance || 0) + amount,
        }));
      } else if (action === 'sell' && resources.bitcoinBalance >= amount) {
        setResources(prev => ({
          ...prev,
          revenue: prev.revenue + value,
          bitcoinBalance: prev.bitcoinBalance - amount,
        }));
      }
    }
  };

  const attendDailyMeeting = () => {
    window.open('http://www.ada-study.com/?utm_source=data_stack_game&utm_medium=website&utm_campaign=profile_game&utm_content=visit_website/', '_blank');
    setResources(prev => ({
      ...prev,
      revenue: prev.revenue + 500,
      showDailyMeeting: false,
    }));
  };

  const skipDailyMeeting = () => {
    setResources(prev => ({
      ...prev,
      showDailyMeeting: false,
    }));
  };

  const subscribeNewsletter = () => {
    window.open('https://www.ada-study.com/helloada', '_blank');
    setResources(prev => ({
      ...prev,
      revenue: prev.revenue + 500,
      showNewsletterPopup: false,
    }));
  };

  const skipNewsletter = () => {
    setResources(prev => ({
      ...prev,
      showNewsletterPopup: false,
    }));
  };

  const startTraining = (programId: string) => {
    if (!resources.gameOver && resources.businessUnits.hr) {
      if (programId === 'data_quality' && resources.rawData >= 100000) {
        setResources(prev => ({
          ...prev,
          rawData: prev.rawData - 100000,
          transformationRatio: 2,
          completedTraining: { ...prev.completedTraining, data_quality: true },
        }));
      } else if (programId === 'clevel' && resources.cleanData >= 500) {
        setResources(prev => ({
          ...prev,
          cleanData: prev.cleanData - 500,
          timeRemaining: prev.timeRemaining + (15 * 60),
          completedTraining: { ...prev.completedTraining, clevel: true },
        }));
      }
    }
  };

  const startSelfService = (serviceId: string) => {
    if (!resources.gameOver && resources.businessUnits.sales) {
      if (serviceId === 'bi' && resources.rawData >= 100000) {
        if (resources.completedTraining.data_quality) {
          setResources(prev => ({
            ...prev,
            rawData: prev.rawData - 100000,
            selfServiceRevenue: prev.selfServiceRevenue + 100,
          }));
        } else {
          setResources(prev => ({
            ...prev,
            revenue: prev.revenue - 15000,
            showErrorMessage: 'You have chosen to deploy self-service before training your teams about Data Quality, this is generally a very bad choice that causes companies to lose money.',
          }));
          setTimeout(() => {
            setResources(prev => ({
              ...prev,
              showErrorMessage: null,
            }));
          }, 5000);
        }
      } else if (serviceId === 'clevel' && resources.cleanData >= 100) {
        if (resources.completedTraining.clevel) {
          setResources(prev => ({
            ...prev,
            cleanData: prev.cleanData - 100,
            selfServiceRevenue: prev.selfServiceRevenue + 100,
          }));
        } else {
          setResources(prev => ({
            ...prev,
            revenue: prev.revenue - 15000,
            showErrorMessage: 'You have chosen to deploy self-service before training your C-Level, this is generally a very bad choice that causes companies to lose money.',
          }));
          setTimeout(() => {
            setResources(prev => ({
              ...prev,
              showErrorMessage: null,
            }));
          }, 5000);
        }
      }
    }
  };

  const restartGame = () => {
    setResources(initialResources);
    setTools(initialTools);
    setUpgrades(initialUpgrades);
    setGovernancePolicies(initialGovernancePolicies);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!resources.gameOver) {
        setResources(prev => {
          const activePolicies = governancePolicies.filter(p => p.active).length;
          const shouldAwardBonus = activePolicies === 3 && !prev.securityBonusCollected;

          const totalCleaningPerSecond = prev.cleaningPerSecond;
          const availableRawData = prev.rawData;
          
          const cleanedData = availableRawData > 0 ? calculateCleaningOutput(availableRawData, totalCleaningPerSecond, prev.dataQuality) : 0;

          const { amountToSell, revenue } = prev.autoSaleEnabled 
            ? calculateAutomaticSale(prev.rawData)
            : { amountToSell: 0, revenue: 0 };

          const dashboardRevenue = Object.values(prev.dashboards).reduce((total, revenue) => total + revenue, 0);

          const governanceCosts = governancePolicies
            .filter(p => p.active)
            .reduce((total, policy) => total + policy.monthlyFee / 30, 0);

          const rawStorageCost = Math.floor(prev.rawData / 10000) * 0.01;
          const cleanStorageCost = Math.floor(prev.cleanData / 100) * 0.02;
          const totalStorageCost = rawStorageCost + cleanStorageCost;

          const priceChange = (Math.random() - 0.5) * 1000;
          const newBitcoinPrice = Math.max(1000, prev.bitcoinPrice + priceChange);

          const newTimeRemaining = prev.timeRemaining - 1;
          const gameOver = newTimeRemaining <= 0;
          const hasWon = gameOver && prev.revenue >= 15000;

          const showDailyMeeting = newTimeRemaining === (25 * 60);
          const showNewsletterPopup = newTimeRemaining === (15 * 60); // Changed from 29 to 15 minutes

          return {
            ...prev,
            rawData: Math.max(0, prev.rawData + prev.dataPerSecond + prev.ingestedPerSecond - cleanedData - amountToSell),
            cleanData: prev.cleanData + cleanedData,
            revenue: prev.revenue + dashboardRevenue + prev.selfServiceRevenue - governanceCosts + revenue - totalStorageCost + (shouldAwardBonus ? 15000 : 0),
            timeRemaining: newTimeRemaining,
            gameOver,
            hasWon,
            securityBonusCollected: shouldAwardBonus ? true : prev.securityBonusCollected,
            bitcoinPrice: newBitcoinPrice,
            showDailyMeeting: showDailyMeeting || prev.showDailyMeeting,
            showNewsletterPopup: showNewsletterPopup || prev.showNewsletterPopup,
          };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [resources.gameOver, governancePolicies]);

  return (
    <GameContext.Provider
      value={{
        resources,
        tools,
        connectors: initialConnectors,
        models: initialModels,
        upgrades,
        governancePolicies,
        collectData,
        cleanData,
        trainModel,
        purchaseUpgrade,
        purchaseTool,
        buildConnector,
        togglePolicy,
        createDashboard,
        sellData,
        buyCleanData,
        restartGame,
        hireEmployee,
        activateBusinessUnit,
        tradeBitcoin,
        attendDailyMeeting,
        skipDailyMeeting,
        subscribeNewsletter,
        skipNewsletter,
        startTraining,
        startSelfService,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}
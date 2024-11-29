import React from 'react';
import { useGameState } from '../context/GameContext';
import { Share2, Users, Building } from 'lucide-react';

const SELF_SERVICE_OPTIONS = [
  {
    id: 'bi',
    name: 'Self Service BI',
    icon: Users,
    cost: 100000,
    costType: 'raw',
    description: 'Enable BI self-service for teams',
    requiresTraining: 'data_quality',
  },
  {
    id: 'clevel',
    name: 'Self Service C-Level',
    icon: Building,
    cost: 100,
    costType: 'clean',
    description: 'Enable self-service for executives',
    requiresTraining: 'clevel',
  },
];

export default function SelfService() {
  const { resources, startSelfService } = useGameState();

  if (!resources.businessUnits.sales) return null;

  return (
    <div className="fixed bottom-4 right-[32rem] bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
          <Share2 className="text-blue-400" />
          Self Service
        </h3>
      </div>

      <div className="space-y-4">
        {SELF_SERVICE_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => startSelfService(option.id)}
            disabled={
              option.costType === 'raw'
                ? resources.rawData < option.cost
                : resources.cleanData < option.cost
            }
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              (option.costType === 'raw' ? resources.rawData : resources.cleanData) >= option.cost
                ? 'bg-blue-600/20 border border-blue-500 hover:bg-blue-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <option.icon size={16} className="text-blue-400" />
              <div className="flex flex-col items-start">
                <span>{option.name}</span>
                <span className="text-xs text-blue-300">
                  {option.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-xs">
              <span className="font-mono">
                {option.cost.toLocaleString()} {option.costType}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Deploy self-service capabilities carefully - proper training is essential!
      </div>
    </div>
  );
}
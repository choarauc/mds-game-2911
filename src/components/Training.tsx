import React from 'react';
import { useGameState } from '../context/GameContext';
import { GraduationCap, Users, Building } from 'lucide-react';

const TRAINING_PROGRAMS = [
  {
    id: 'data_quality',
    name: 'Data Quality Training',
    icon: Users,
    cost: 100000,
    costType: 'raw',
    description: 'Train teams on data quality (2:1 ratio)',
  },
  {
    id: 'clevel',
    name: 'C-Level Training',
    icon: Building,
    cost: 500,
    costType: 'clean',
    description: '+15 minutes gameplay',
  },
];

export default function Training() {
  const { resources, startTraining } = useGameState();

  if (!resources.businessUnits.hr) return null;

  return (
    <div className="fixed bottom-4 right-96 bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-violet-500/30 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-violet-400 flex items-center gap-2">
          <GraduationCap className="text-violet-400" />
          Training Programs
        </h3>
      </div>

      <div className="space-y-4">
        {TRAINING_PROGRAMS.map((program) => (
          <button
            key={program.id}
            onClick={() => startTraining(program.id)}
            disabled={
              program.costType === 'raw'
                ? resources.rawData < program.cost
                : resources.cleanData < program.cost
            }
            className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
              (program.costType === 'raw' ? resources.rawData : resources.cleanData) >= program.cost
                ? 'bg-violet-600/20 border border-violet-500 hover:bg-violet-600/30'
                : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <program.icon size={16} className="text-violet-400" />
              <div className="flex flex-col items-start">
                <span>{program.name}</span>
                <span className="text-xs text-violet-300">
                  {program.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-xs">
              <span className="font-mono">
                {program.cost.toLocaleString()} {program.costType}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Invest in your teams to improve efficiency and extend gameplay.
      </div>
    </div>
  );
}
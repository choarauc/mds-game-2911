import React from 'react';
import { useGameState } from '../context/GameContext';
import { ArrowRight, Database, Server, Shield } from 'lucide-react';

export default function DataPipeline() {
  const { resources, connectors, buildConnector, governancePolicies } = useGameState();

  // Calculate active governance policies
  const activePolicies = governancePolicies.filter(p => p.active).length;
  const hasFullGovernance = activePolicies === 3;
  const needsGovernance = resources.connectors >= 1000 && !hasFullGovernance;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Active connectors</p>
          <p className="font-mono text-lg text-orange-400">
            {resources.connectors.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Flow/s</p>
          <p className="font-mono text-lg text-orange-400">
            {resources.ingestedPerSecond.toLocaleString()}
          </p>
        </div>
      </div>

      {needsGovernance && (
        <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-3 text-sm mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-yellow-400" size={16} />
            <span className="text-yellow-400 font-semibold">Security Required</span>
          </div>
          <p className="text-yellow-300">
            You are starting to have a lot of active pipelines, you need to gain confidence to continue creating them.
            Get 3/3 in security thanks to a data governance framework in order to continue creating pipelines.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {connectors.map((connector, index) => {
          const canBuild = resources.rawData >= connector.cost && (!needsGovernance || hasFullGovernance);
          
          return (
            <button
              key={index}
              onClick={() => buildConnector(index)}
              disabled={!canBuild}
              className={`w-full p-2 rounded-lg flex items-center justify-between text-sm ${
                canBuild
                  ? 'bg-orange-600/20 border border-orange-500 hover:bg-orange-600/30'
                  : 'bg-gray-700/20 border border-gray-700 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database size={16} className="text-orange-400" />
                <div className="flex flex-col items-start">
                  <span>{connector.name}</span>
                  <span className="text-xs text-orange-300">
                    +{connector.throughput} data/s
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={12} className="text-gray-400" />
                <Server size={16} className="text-orange-400" />
                <span className="font-mono text-xs">
                  {connector.cost.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 bg-black/20 rounded-lg p-2">
        Connectors automate the ingestion of data from various sources.
        {needsGovernance && " Implement data governance to create more connectors."}
      </div>
    </div>
  );
}
import React from 'react';
import { GameProvider, useGameState } from './context/GameContext';
import Header from './components/Header';
import DataStation from './components/DataStation';
import CleaningStation from './components/CleaningStation';
import TrainingCenter from './components/TrainingCenter';
import TechTree from './components/TechTree';
import Tutorial from './components/Tutorial';
import DataPipeline from './components/DataPipeline';
import Analytics from './components/Analytics';
import DataGovernance from './components/DataGovernance';
import DataTools from './components/DataTools';
import Recruitment from './components/Recruitment';
import BusinessUnits from './components/BusinessUnits';
import Trading from './components/Trading';
import Training from './components/Training';
import SelfService from './components/SelfService';
import FinancialCharts from './components/FinancialCharts';
import DailyMeeting from './components/DailyMeeting';
import NewsletterPopup from './components/NewsletterPopup';
import { Brain, Database, Filter, DollarSign, PieChart, Workflow, Shield, Wrench, Users, Building } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const [showTutorial, setShowTutorial] = React.useState(true);
  const { 
    resources, 
    attendDailyMeeting, 
    skipDailyMeeting,
    subscribeNewsletter,
    skipNewsletter,
  } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <Header />
      
      {showTutorial && <Tutorial onComplete={() => setShowTutorial(false)} />}
      
      <AnimatePresence>
        {resources.showDailyMeeting && (
          <DailyMeeting 
            onClose={skipDailyMeeting}
            onAttend={attendDailyMeeting}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resources.showNewsletterPopup && (
          <NewsletterPopup 
            onClose={skipNewsletter}
            onSubscribe={subscribeNewsletter}
          />
        )}
      </AnimatePresence>

      {resources.showErrorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900/80 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {resources.showErrorMessage}
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Database className="text-blue-400" />
              Sources
            </h2>
            <DataStation />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Workflow className="text-orange-400" />
              Pipeline
            </h2>
            <DataPipeline />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Wrench className="text-cyan-400" />
              Tools
            </h2>
            <DataTools />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Filter className="text-purple-400" />
              Transformation
            </h2>
            <CleaningStation />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Brain className="text-pink-400" />
              Training
            </h2>
            <TrainingCenter />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <PieChart className="text-yellow-400" />
              Analytics
            </h2>
            <Analytics />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Shield className="text-emerald-400" />
              Governance
            </h2>
            <DataGovernance />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <DollarSign className="text-green-400" />
              Marketplace
            </h2>
            <TechTree />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Users className="text-violet-400" />
              Recruitment
            </h2>
            <Recruitment />
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Building className="text-amber-400" />
              Business Units
            </h2>
            <BusinessUnits />
          </div>
        </div>
      </main>

      <Trading />
      <Training />
      <SelfService />
      <FinancialCharts />
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
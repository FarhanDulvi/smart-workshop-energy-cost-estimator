import React, { useState } from 'react';
import { Machine, Tariff } from './types';
import { TariffInput } from './components/TariffInput';
import { MachineForm } from './components/MachineForm';
import { CostReport } from './components/CostReport';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  // State management (replacing the C program's main function variables)
  const [machines, setMachines] = useState<Machine[]>([]);
  const [tariff, setTariff] = useState<Tariff>({
    peakRate: 0.15, // Default example values
    offPeakRate: 0.08
  });

  const handleAddMachine = (machine: Machine) => {
    setMachines(prev => [...prev, machine]);
  };

  const handleRemoveMachine = (id: string) => {
    setMachines(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg border border-indigo-500">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Smart Workshop</h1>
              <p className="text-indigo-200 text-xs font-medium">Energy Cost Estimator (Option 1)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="xl:col-span-4 space-y-6">
            <TariffInput tariff={tariff} setTariff={setTariff} />
            <MachineForm onAddMachine={handleAddMachine} />
            
            {/* Instruction Panel */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-900">
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ul className="list-disc list-inside space-y-1 text-indigo-800/80">
                <li>Set your electricity tariffs first.</li>
                <li>Add machines with their power rating and usage details.</li>
                <li>Review the cost breakdown on the right.</li>
                <li>Watch out for warnings on excessive peak usage.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="xl:col-span-8">
            <CostReport 
              machines={machines} 
              tariff={tariff} 
              onRemoveMachine={handleRemoveMachine} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
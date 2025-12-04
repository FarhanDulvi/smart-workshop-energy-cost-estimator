import React, { useState } from 'react';
import { Machine } from '../types';
import { Plus, Settings } from 'lucide-react';

interface MachineFormProps {
  onAddMachine: (machine: Machine) => void;
}

export const MachineForm: React.FC<MachineFormProps> = ({ onAddMachine }) => {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [hours, setHours] = useState('');
  const [peak, setPeak] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !power || !hours || !peak) return;

    const newMachine: Machine = {
      id: crypto.randomUUID(),
      name,
      powerRating: parseFloat(power),
      operatingHours: parseFloat(hours),
      peakPercentage: parseFloat(peak)
    };

    onAddMachine(newMachine);
    
    // Reset form
    setName('');
    setPower('');
    setHours('');
    setPeak('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <Settings className="w-5 h-5" />
        <h2 className="text-lg font-bold">Add Machine Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Machine Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g. Lathe A"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Power Rating (kW)</label>
          <input
            type="number"
            value={power}
            onChange={(e) => setPower(e.target.value)}
            step="0.1"
            min="0"
            className="block w-full rounded-md border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="kW"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Hours/Day</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            step="0.5"
            min="0"
            max="24"
            className="block w-full rounded-md border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Hours"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">% Peak Time</label>
          <input
            type="number"
            value={peak}
            onChange={(e) => setPeak(e.target.value)}
            step="1"
            min="0"
            max="100"
            className="block w-full rounded-md border-slate-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="%"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-md flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>
    </div>
  );
};
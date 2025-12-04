import React from 'react';
import { Tariff } from '../types';
import { DollarSign, Zap } from 'lucide-react';

interface TariffInputProps {
  tariff: Tariff;
  setTariff: React.Dispatch<React.SetStateAction<Tariff>>;
}

export const TariffInput: React.FC<TariffInputProps> = ({ tariff, setTariff }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTariff(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center gap-2 mb-4 text-indigo-700">
        <Zap className="w-5 h-5" />
        <h2 className="text-lg font-bold">Electricity Tariff Configuration</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Peak Rate ($/kWh)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="number"
              name="peakRate"
              value={tariff.peakRate}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="pl-10 block w-full rounded-md border-slate-300 bg-slate-50 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">Cost per kWh during peak hours</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Off-Peak Rate ($/kWh)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="number"
              name="offPeakRate"
              value={tariff.offPeakRate}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="pl-10 block w-full rounded-md border-slate-300 bg-slate-50 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">Cost per kWh during off-peak hours</p>
        </div>
      </div>
    </div>
  );
};
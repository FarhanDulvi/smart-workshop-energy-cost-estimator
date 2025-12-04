import React, { useMemo } from 'react';
import { Machine, Tariff, MachineCostResult } from '../types';
import { AlertTriangle, Trash2, TrendingUp, Calendar } from 'lucide-react';

interface CostReportProps {
  machines: Machine[];
  tariff: Tariff;
  onRemoveMachine: (id: string) => void;
}

export const CostReport: React.FC<CostReportProps> = ({ machines, tariff, onRemoveMachine }) => {
  
  // Logic Structure: Calculations derived from state (simulating the Processing step in IPO)
  const results: MachineCostResult[] = useMemo(() => {
    return machines.map(machine => {
      // Logic: Peak Hours = Total Hours * (Peak% / 100)
      const peakHours = machine.operatingHours * (machine.peakPercentage / 100);
      const offPeakHours = machine.operatingHours - peakHours;

      // Logic: Energy (kWh) = Power (kW) * Hours
      const peakEnergy = machine.powerRating * peakHours;
      const offPeakEnergy = machine.powerRating * offPeakHours;

      // Logic: Cost = Energy * Rate
      const dailyPeakCost = peakEnergy * tariff.peakRate;
      const dailyOffPeakCost = offPeakEnergy * tariff.offPeakRate;
      const dailyCost = dailyPeakCost + dailyOffPeakCost;

      // Logic: Monthly = Daily * 30
      const monthlyCost = dailyCost * 30;

      // Logic: Warning condition
      const hasWarning = peakHours > 12;

      return {
        machine,
        peakHours,
        offPeakHours,
        peakEnergy,
        offPeakEnergy,
        dailyCost,
        monthlyCost,
        hasWarning
      };
    });
  }, [machines, tariff]);

  const totalDailyBill = results.reduce((sum, item) => sum + item.dailyCost, 0);
  const totalMonthlyBill = results.reduce((sum, item) => sum + item.monthlyCost, 0);

  if (machines.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
        <p className="text-slate-500">No machines added yet. Add a machine to see the cost estimate.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-600 font-medium">Total Daily Bill</p>
            <p className="text-2xl font-bold text-emerald-900">${totalDailyBill.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Est. Monthly Bill (30 Days)</p>
            <p className="text-2xl font-bold text-blue-900">${totalMonthlyBill.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Detailed Cost Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Machine</th>
                <th className="px-6 py-3">Power (kW)</th>
                <th className="px-6 py-3">Hours (Peak/Off)</th>
                <th className="px-6 py-3">Energy (kWh)</th>
                <th className="px-6 py-3">Daily Cost</th>
                <th className="px-6 py-3">Monthly Cost</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {results.map((item) => (
                <tr key={item.machine.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.machine.name}</td>
                  <td className="px-6 py-4">{item.machine.powerRating} kW</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500">P: {item.peakHours.toFixed(1)}h</span>
                      <span className="text-xs text-slate-500">O: {item.offPeakHours.toFixed(1)}h</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs">Peak: {item.peakEnergy.toFixed(1)}</span>
                      <span className="text-xs">Off: {item.offPeakEnergy.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-emerald-600 font-medium">${item.dailyCost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">${item.monthlyCost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    {item.hasWarning && (
                      <div className="group relative flex justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500 cursor-help" />
                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10 text-center">
                          Warning: Operates more than 12h in peak time. Consider shifting to off-peak.
                        </div>
                      </div>
                    )}
                    {!item.hasWarning && <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onRemoveMachine(item.machine.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
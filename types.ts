export interface Machine {
  id: string;
  name: string;
  powerRating: number; // in kW
  operatingHours: number; // hours per day
  peakPercentage: number; // 0-100 percentage of time in peak hours
}

export interface Tariff {
  peakRate: number; // $ per kWh
  offPeakRate: number; // $ per kWh
}

export interface MachineCostResult {
  machine: Machine;
  peakHours: number;
  offPeakHours: number;
  peakEnergy: number; // kWh
  offPeakEnergy: number; // kWh
  dailyCost: number;
  monthlyCost: number;
  hasWarning: boolean;
}
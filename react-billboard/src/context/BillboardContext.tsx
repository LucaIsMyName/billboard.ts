import React, { createContext, useContext, useState } from 'react';
import { BillboardContextType, BillboardOptions, Dataset } from '../types';

const BillboardContext = createContext<BillboardContextType | undefined>(undefined);

export interface BillboardProviderProps {
  children: React.ReactNode;
  options: BillboardOptions;
}

export const BillboardProvider: React.FC<BillboardProviderProps> = ({
  children,
  options: initialOptions,
}) => {
  // Only store datasets from props, component-based datasets will be handled directly
  const [propDatasets] = useState<Dataset[]>(initialOptions.datasets || []);

  const value = {
    options: {
      ...initialOptions,
      datasets: propDatasets,
    }
  };

  return (
    <BillboardContext.Provider value={value}>
      {children}
    </BillboardContext.Provider>
  );
};

export const useBillboard = () => {
  const context = useContext(BillboardContext);
  if (!context) {
    throw new Error('useBillboard must be used within a BillboardProvider');
  }
  return context;
};
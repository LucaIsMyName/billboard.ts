import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { BillboardContextType, BillboardOptions, Dataset } from '../types';

const BillboardContext = createContext<BillboardContextType | undefined>(undefined);

export interface BillboardProviderProps {
  children: React.ReactNode;
  options: BillboardOptions;
}

export const BillboardProvider: React.FC<BillboardProviderProps> = ({
  children,
  options,
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>(options.datasets || []);

  const updateDataset = useCallback((dataset: Dataset) => {
    setDatasets(prev => {
      const existing = prev.findIndex(d => d.name === dataset.name);
      if (existing >= 0) {
        const newDatasets = [...prev];
        newDatasets[existing] = dataset;
        return newDatasets;
      }
      return [...prev, dataset];
    });
  }, []); // No dependencies needed as it's a stable function

  const value = useMemo(() => ({ 
    options: {
      ...options,
      datasets
    },
    updateDataset
  }), [options, datasets, updateDataset]);

  return (
    <BillboardContext.Provider value={value}>
      {children}
    </BillboardContext.Provider>
  );
};

export const useBillboard = () => {
  const context = useContext(BillboardContext);
  if (context === undefined) {
    throw new Error('useBillboard must be used within a BillboardProvider');
  }
  return context;
};
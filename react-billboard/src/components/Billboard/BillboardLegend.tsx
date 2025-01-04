import React from 'react';
import { BillboardComponentProps } from '../../types';
import { useBillboard } from '../../context/BillboardContext';

export const BillboardLegend: React.FC<BillboardComponentProps> = ({
  children,
  className,
}) => {
  const { options } = useBillboard();

  if (!options.datasets?.length) return null;

  return (
    <div className={className}>
      {children || (
        <ul className="flex gap-4">
          {options.datasets.map((dataset, index) => (
            <li key={index} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: dataset.color }}
              />
              <span>{dataset.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
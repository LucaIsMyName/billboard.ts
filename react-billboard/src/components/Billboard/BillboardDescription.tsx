import React from 'react';
import { BillboardComponentProps } from '../../types';
import { useBillboard } from '../../context/BillboardContext';

export const BillboardDescription: React.FC<BillboardComponentProps> = ({
  children,
  className,
}) => {
  const { options } = useBillboard();
  const description = children || options.description;

  if (!description) return null;

  return (
    <p className={className}>
      {description}
    </p>
  );
};
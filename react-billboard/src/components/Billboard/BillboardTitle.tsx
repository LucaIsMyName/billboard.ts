import React from 'react';
import { BillboardComponentProps } from '../../types';
import { useBillboard } from '../../context/BillboardContext';

export const BillboardTitle: React.FC<BillboardComponentProps> = ({
  children,
  className,
}) => {
  const { options } = useBillboard();
  const title = children || options.title;

  if (!title) return null;

  return (
    <h2 className={className}>
      {title}
    </h2>
  );
};

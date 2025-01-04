import React, { useMemo } from 'react';
import { BillboardDatasetProps } from '../../types';
import { BillboardDatapoint } from './BillboardDatapoint';

interface ExtendedBillboardDatasetProps extends Omit<BillboardDatasetProps, 'data'> {
  data?: BillboardDatasetProps['data'];
  children?: React.ReactNode;
}

export const BillboardDataset: React.FC<ExtendedBillboardDatasetProps> = ({
  data,
  name = '',
  color,
  children,
  style,
}) => {
  // Convert children Datapoints to data array if present
  const dataPoints = useMemo(() => {
    if (children) {
      return React.Children.toArray(children)
        .filter(child => 
          React.isValidElement(child) && 
          (child.type === BillboardDatapoint || (child.type as any)?.displayName === 'BillboardDatapoint')
        )
        .map(child => {
          const props = (child as React.ReactElement).props;
          return {
            x: props.x,
            y: props.y,
            name: props.name,
            color: props.style?.color || props.color
          };
        });
    }
    return data || [];
  }, [children, data]);

  // Make the dataset data available to parent components
  return {
    name,
    data: dataPoints,
    color,
    style,
  };
};

BillboardDataset.displayName = 'BillboardDataset';
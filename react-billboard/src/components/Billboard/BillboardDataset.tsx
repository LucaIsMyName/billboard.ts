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
  const processedData = useMemo(() => {
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

  // Store the dataset info
  const datasetInfo = {
    name,
    data: processedData,
    color,
    style
  };

  // Return a hidden div with the dataset info as a data attribute
  return (
    <div 
      style={{ display: 'none' }}
      data-billboard-dataset={true}
      data-info={JSON.stringify(datasetInfo)}
    >
      {children}
    </div>
  );
};

BillboardDataset.displayName = 'BillboardDataset';
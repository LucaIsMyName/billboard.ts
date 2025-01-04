import React from 'react';
import { DataPoint, DataPointStyle } from '../../types';

export interface BillboardDatapointProps extends Omit<DataPoint, 'name'> {
  name?: string;
  z?: number;
  style?: DataPointStyle;
}

export const BillboardDatapoint: React.FC<BillboardDatapointProps> = (props) => {
  return (
    <div
      style={{ display: 'block' }}
      data-billboard-datapoint={true}
      data-point={JSON.stringify(props)}
    />
  );
};

BillboardDatapoint.displayName = 'BillboardDatapoint';
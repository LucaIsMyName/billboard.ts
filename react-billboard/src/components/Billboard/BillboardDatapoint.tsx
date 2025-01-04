import React from 'react';
import { DataPoint, DataPointStyle } from '../../types';

export interface BillboardDatapointProps extends Omit<DataPoint, 'name'> {
  name?: string;
  z?: number;
  style?: DataPointStyle;
}

export const BillboardDatapoint: React.FC<BillboardDatapointProps> = (props) => {
  console.log('Datapoint Props:', props);

  return (
    <div
      data-billboard-datapoint
      style={{ display: 'none' }}
      data-x={props.x}
      data-y={props.y}
      data-style={JSON.stringify(props.style)}
    />
  );
};

BillboardDatapoint.displayName = 'BillboardDatapoint';
import React from 'react';
import { DataPoint, DataPointStyle } from '../../types';

export interface BillboardDatapointProps extends Omit<DataPoint, 'name'> {
  name?: string;
  z?: number;
  style?: DataPointStyle;  // Add style prop
}

export const BillboardDatapoint: React.FC<BillboardDatapointProps> = () => {
  return null;
};
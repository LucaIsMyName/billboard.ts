export type ChartType = 'line' | 'area' | 'scatter' | 'bar' | 'pie';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
}

export interface DataPoint {
  x: number | string;
  y: number;
  color?: string;
  [key: string]: any;
}

export interface DataPointStyle {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  opacity?: number;
  radius?: number;
}

export interface DatasetStyle {
  stroke?: string;
  fill?: string;
  fillOpacity?: number;
  strokeWidth?: number;
  strokeDasharray?: string;
  dot?: boolean | object;
  activeDot?: object;
  label?: boolean | object;
  connectNulls?: boolean;
  type?: 'basis' | 'linear' | 'monotone' | 'natural' | 'step';
}

export interface Dataset {
  name: string;
  data: DataPoint[];
  color?: string;
  style?: DatasetStyle;
}

export interface BillboardOptions {
  type: ChartType;
  variant?: string;
  title?: string;
  description?: string;
  xAxis?: AxisOptions;
  yAxis?: AxisOptions;
  datasets?: Dataset[];
  className?: string;
}

export interface BillboardContextType {
  options: BillboardOptions;
  updateDataset: (dataset: Dataset) => void;
}

export interface BillboardComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BillboardChartProps extends BillboardComponentProps {
  x?: AxisOptions;
  y?: AxisOptions;
}

export interface BillboardDatasetProps {
  name: string;
  data?: DataPoint[];
  color?: string;
  style?: DatasetStyle;
}
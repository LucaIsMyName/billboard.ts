export type ChartType = 'line' | 'area' | 'bar' | 'scatter' | 'pie' | 'composed' | "treemap";

export type DataComponentType = 'line' | 'area' | 'bar' | 'scatter' | 'pie';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
  scale?: 'auto' | 'linear' | 'pow' | 'sqrt' | 'log' | 'identity' | 'time' | 'band' | 'point' | 'ordinal';
}

export interface DataPoint {
  x: number | string;
  y: number;
  name?: string;
  color?: string;
}

export interface DataPointStyle {
  strokeWidth?: number;
  fillOpacity?: number;
  dot?: boolean;
  type?: 'monotone' | 'linear' | 'step';
  barSize?: number;
  outerRadius?: number;
  innerRadius?: number;
  cx?: string;
  cy?: string;
  label?: boolean;
}

export interface DatasetStyle {
  strokeWidth?: number;
  fillOpacity?: number;
  dot?: boolean;
  type?: 'monotone' | 'linear' | 'step';
  barSize?: number;
  outerRadius?: number;
  innerRadius?: number;
  cx?: string;
  cy?: string;
  label?: boolean;
}

export interface Dataset {
  name: string;
  data: DataPoint[];
  color?: string;
  style?: DatasetStyle;
  componentType?: DataComponentType; // For composed charts
}

export interface BillboardOptions {
  type: ChartType;
  datasets?: Dataset[];
  className?: string;
  hasLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  hasTooltip?: boolean;
  hasZoom?: boolean;
  strokeColor?: string;
  fillColor?: string;
  aspectRatio?: number;
}

export interface BillboardContextType {
  options: BillboardOptions;
}

export interface BillboardComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BillboardChartProps extends BillboardComponentProps {
  x?: AxisOptions;
  y?: AxisOptions;
  options: BillboardOptions;
}

export interface BillboardDatasetProps {
  name: string;
  data?: DataPoint[];
  color?: string;
  style?: DatasetStyle;
  componentType?: DataComponentType;
  className?: string;
}
export type ChartType = 'line' | 'area' | 'scatter' | 'bar' | 'donut' | 'pie' | 'bubble';

export interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
}

export interface DataPoint {
  x: number | string;
  y: number;
  [key: string]: any;
}

export interface Dataset {
  name: string;
  data: DataPoint[];
  color?: string;
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
  data: DataPoint[];
  name?: string;
  color?: string;
}

// Existing types...

export interface DataPointStyle {
  color?: string;
  radius?: number;              // Size of point marker
  symbol?: 'circle' | 'square' | 'diamond' | 'triangle' | 'triangle-down';
  fillColor?: string;          // For bubble charts or point fill
  lineWidth?: number;          // Border width
  lineColor?: string;          // Border color
  opacity?: number;            // 0-1
  borderRadius?: number;       // For column/bar charts
  className?: string;          // CSS class for the point
  cursor?: string;             // CSS cursor type
  dashStyle?: 'Solid' | 'Dash' | 'Dot' | 'LongDash' | 'ShortDash';
}

export interface DatasetStyle {
  color?: string;              // Main color for the series
  lineWidth?: number;          // For line charts
  lineCap?: 'round' | 'square';
  dashStyle?: 'Solid' | 'Dash' | 'Dot' | 'LongDash' | 'ShortDash';
  opacity?: number;            // 0-1
  fillOpacity?: number;        // For area charts
  marker?: {                   // Default marker style for all points
    enabled?: boolean;
    radius?: number;
    symbol?: 'circle' | 'square' | 'diamond' | 'triangle' | 'triangle-down';
    fillColor?: string;
    lineWidth?: number;
    lineColor?: string;
  };
  borderRadius?: number;       // For bar/column charts
  borderWidth?: number;
  borderColor?: string;
  className?: string;          // CSS class for the series
  cursor?: string;             // CSS cursor type
  shadow?: boolean | object;   // Enable shadows
}
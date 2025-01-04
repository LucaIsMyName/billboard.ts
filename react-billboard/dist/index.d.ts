import React$1 from 'react';

type ChartType = 'line' | 'area' | 'bar' | 'scatter' | 'pie' | 'composed' | 'treemap' | 'funnel';
type DataComponentType = "line" | "area" | "bar" | "scatter" | "pie";
interface AxisOptions {
    title?: string;
    min?: number;
    max?: number;
    scale?: "auto" | "linear" | "pow" | "sqrt" | "log" | "identity" | "time" | "band" | "point" | "ordinal";
    unit?: UnitOptions;
}
interface UnitOptions {
    symbol?: string;
    label?: string;
    id?: number | string;
}
interface DataPoint {
    x?: number | string;
    y?: number;
    z?: number;
    name?: string;
    color?: string;
    size?: number;
    style?: DataPointStyle;
    componentType?: DataComponentType;
    [key: string]: any;
}
interface DataPointStyle {
    strokeWidth?: number;
    fillOpacity?: number;
    dot?: boolean;
    type?: "monotone" | "linear" | "step";
    barSize?: number;
    outerRadius?: number;
    innerRadius?: number;
    cx?: string;
    cy?: string;
    label?: boolean;
    [key: string]: any;
}
interface DatasetStyle {
    strokeWidth?: number;
    fillOpacity?: number;
    dot?: boolean;
    type?: "monotone" | "linear" | "step";
    barSize?: number;
    outerRadius?: number;
    innerRadius?: number;
    cx?: string;
    cy?: string;
    label?: boolean;
    funnel?: FunnelStyle;
    [key: string]: any;
}
interface Dataset {
    name: string;
    data: DataPoint[];
    color?: string;
    style?: DatasetStyle;
    componentType?: DataComponentType;
    [key: string]: any;
}
interface BillboardOptions {
    type?: ChartType;
    datasets?: Dataset[];
    title?: string;
    description?: string;
    className?: string;
    legend?: {
        show?: boolean;
        className?: string;
        position?: "top" | "bottom" | "left" | "right";
    };
    tooltip?: {
        show?: boolean;
    };
    strokeColor?: string;
    fillColor?: string;
    aspectRatio?: number;
    [key: string]: any;
}
interface BillboardComponentProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}
interface BillboardChartProps extends BillboardComponentProps {
    x?: AxisOptions;
    y?: AxisOptions;
    options?: BillboardOptions;
}
interface BillboardDatasetProps {
    name: string;
    data?: DataPoint[];
    color?: string;
    style?: DatasetStyle;
    componentType?: DataComponentType;
    className?: string;
}
interface FunnelStyle extends DatasetStyle {
    position?: 'right' | 'left' | 'center';
    labelFill?: string;
    labelStroke?: string;
    isAnimationActive?: boolean;
}

declare const BillboardTitle: React$1.FC<BillboardComponentProps>;

declare const BillboardDescription: React$1.FC<BillboardComponentProps>;

declare const BillboardChart: React$1.FC<BillboardChartProps>;

interface ExtendedBillboardDatasetProps extends Omit<BillboardDatasetProps, 'data'> {
    data?: BillboardDatasetProps['data'];
    children?: React$1.ReactNode;
}
declare const BillboardDataset: React$1.FC<ExtendedBillboardDatasetProps>;

interface BillboardDatapointProps extends Omit<DataPoint, 'name'> {
    name?: string;
    z?: number;
    style?: DataPointStyle;
}
declare const BillboardDatapoint: React$1.FC<BillboardDatapointProps>;

declare const BillboardLegend: React$1.FC<BillboardComponentProps>;

interface BillboardProps extends BillboardOptions {
    children?: React$1.ReactNode;
}
interface BillboardComponent extends React$1.FC<BillboardProps> {
    Title: typeof BillboardTitle;
    Description: typeof BillboardDescription;
    Chart: typeof BillboardChart;
    Dataset: typeof BillboardDataset;
    Datapoint: typeof BillboardDatapoint;
    Legend: typeof BillboardLegend;
}
declare const Billboard: BillboardComponent;

declare const testExport: () => void;

export { AxisOptions, Billboard, BillboardChartProps, BillboardComponentProps, BillboardDatasetProps, BillboardOptions, BillboardProps, ChartType, DataComponentType, DataPoint, DataPointStyle, Dataset, testExport };

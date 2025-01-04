import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1 from 'react';

type ChartType = 'line' | 'area' | 'scatter' | 'bar' | 'donut' | 'pie' | 'bubble';
interface AxisOptions {
    title?: string;
    min?: number;
    max?: number;
}
interface DataPoint {
    x: number | string;
    y: number;
    [key: string]: any;
}
interface Dataset {
    name: string;
    data: DataPoint[];
    color?: string;
}
interface BillboardOptions {
    type: ChartType;
    variant?: string;
    title?: string;
    description?: string;
    xAxis?: AxisOptions;
    yAxis?: AxisOptions;
    datasets?: Dataset[];
    className?: string;
}
interface BillboardComponentProps {
    className?: string;
    children?: React.ReactNode;
}
interface BillboardChartProps extends BillboardComponentProps {
    x?: AxisOptions;
    y?: AxisOptions;
}
interface BillboardDatasetProps {
    data: DataPoint[];
    name?: string;
    color?: string;
}

interface BillboardProps extends BillboardOptions {
    children?: React$1.ReactNode;
}
declare const Billboard: (({ children, ...options }: BillboardProps) => react_jsx_runtime.JSX.Element) & {
    Title: React$1.FC<BillboardComponentProps>;
    Description: React$1.FC<BillboardComponentProps>;
    Chart: React$1.FC<BillboardChartProps>;
    Dataset: React$1.FC<BillboardDatasetProps>;
    Legend: React$1.FC<BillboardComponentProps>;
};

declare const testExport: () => void;

export { AxisOptions, Billboard, BillboardChartProps, BillboardComponentProps, BillboardDatasetProps, BillboardOptions, BillboardProps, ChartType, DataPoint, Dataset, testExport };

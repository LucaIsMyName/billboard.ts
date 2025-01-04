import React from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie,
  ScatterChart, Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BillboardChartProps, Dataset } from "../../types";
import { useBillboard } from "../../context/BillboardContext";
import { BillboardDataset } from "./BillboardDataset";

const ChartComponents = {
  line: LineChart,
  area: AreaChart,
  bar: BarChart,
  pie: PieChart,
  scatter: ScatterChart,
} as const;

const DataComponents = {
  line: Line,
  area: Area,
  bar: Bar,
  pie: Pie,
  scatter: Scatter,
} as const;

export const BillboardChart: React.FC<BillboardChartProps> = ({
  children,
  className,
  x,
  y,
}) => {
  const { options } = useBillboard();
  
  // Extract child datasets
  const childDatasets = React.Children.toArray(children)
    .filter(child => 
      React.isValidElement(child) && 
      (child.type === BillboardDataset || (child.type as any)?.displayName === 'BillboardDataset')
    )
    .map(child => {
      const result = (child as React.ReactElement).type(
        (child as React.ReactElement).props
      );
      return result as Dataset;
    });

  // Combine prop datasets with child datasets
  const allDatasets = [...(options.datasets || []), ...childDatasets];
  
  // Format data for Recharts
  const formattedData = allDatasets[0]?.data?.map((point, index) => {
    const dataPoint = {
      name: point.x,
    };
    allDatasets.forEach(dataset => {
      if (dataset.data?.[index]) {
        dataPoint[dataset.name] = dataset.data[index].y;
      }
    });
    return dataPoint;
  }) || [];

  const ChartComponent = ChartComponents[options.type] || LineChart;
  const DataComponent = DataComponents[options.type] as typeof Line;

  // Rest of the rendering logic...
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={x?.title ? { value: x.title, position: "bottom" } : undefined}
          />
          <YAxis
            label={y?.title ? { value: y.title, angle: -90, position: "left" } : undefined}
          />
          <Tooltip />
          <Legend />
          {allDatasets.map((dataset) => (
            <DataComponent
              key={dataset.name}
              type="monotone"
              dataKey={dataset.name}
              stroke={dataset.color}
              fill={dataset.color}
              strokeWidth={dataset.style?.strokeWidth}
              fillOpacity={dataset.style?.fillOpacity}
              dot={
                dataset.style?.dot
                  ? {
                      strokeWidth: dataset.style.strokeWidth || 1,
                      r: 4,
                      fill: dataset.color,
                    }
                  : false
              }
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

BillboardChart.displayName = 'BillboardChart';
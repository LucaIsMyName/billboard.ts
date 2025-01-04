import React from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList, TooltipProps, Treemap } from "recharts";
import { BillboardChartProps, Dataset, DataPoint } from "../../types";
import { useBillboard } from "../../context/BillboardContext";
import { BillboardDataset } from "./BillboardDataset";
import { BillboardDatapoint } from "./BillboardDatapoint";

type ChartComponentType = typeof ChartComponents;
type DataComponentType = typeof DataComponents;
type ChartType = keyof ChartComponentType;
type DataType = keyof DataComponentType;

interface UnitOptions {
  symbol?: string;
  label?: string;
  id?: number | string;
}

const ChartComponents = {
  line: LineChart,
  area: AreaChart,
  bar: BarChart,
  pie: PieChart,
  scatter: ScatterChart,
  composed: LineChart,
  bubble: ScatterChart,
  funnel: FunnelChart,
} as const;

const DataComponents = {
  line: Line,
  area: Area,
  bar: Bar,
  pie: Pie,
  scatter: Scatter,
} as const;

// Helper function for unit formatting
const formatWithUnit = (value: any, unit?: UnitOptions): string => {
  if (!unit) return String(value);
  const symbol = unit.symbol || "";
  return `${value}${symbol}`;
};

// Custom Tooltip Component
interface CustomTooltipProps extends TooltipProps<any, any> {
  xUnit?: UnitOptions;
  yUnit?: UnitOptions;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, xUnit, yUnit }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-2 border rounded shadow">
      <p className="text-sm mb-1">
        {`${label}${xUnit?.symbol || ""}`}
        {xUnit?.label && <span className="text-gray-500 text-xs"> ({xUnit.label})</span>}
      </p>
      {payload.map((entry: any, index: number) => (
        <p
          key={index}
          style={{ color: entry.color }}
          className="text-sm">
          {`${entry.name}: ${formatWithUnit(entry.value, yUnit)}`}
          {yUnit?.label && <span className="text-gray-500 text-xs"> ({yUnit.label})</span>}
        </p>
      ))}
    </div>
  );
};

export const BillboardChart: React.FC<BillboardChartProps> = ({ children, className, x, y }) => {
  const { options } = useBillboard();

  // Extract datasets from children
  const childDatasets = React.Children.toArray(children)
    .filter((child): child is React.ReactElement => React.isValidElement(child) && (child.type === BillboardDataset || (child.type as any)?.displayName === "BillboardDataset"))
    .map((dataset) => {
      try {
        if (dataset.props["data-billboard-dataset"]) {
          return JSON.parse(dataset.props["data-info"]) as Dataset;
        }

        const childPoints = React.Children.toArray(dataset.props.children)
          .filter((datapoint): datapoint is React.ReactElement => React.isValidElement(datapoint) && (datapoint.type === BillboardDatapoint || (datapoint.type as any)?.displayName === "BillboardDatapoint"))
          .map((datapoint): DataPoint => {
            const props = datapoint.props;
            return {
              x: props.x,
              y: props.y,
              name: props.name,
              color: props.style?.color || props.color,
            };
          });

        return {
          name: dataset.props.name,
          data: dataset.props.data || childPoints,
          color: dataset.props.color,
          style: dataset.props.style,
        } as Dataset;
      } catch (error) {
        console.error("Error processing dataset:", error);
        return null;
      }
    })
    .filter((dataset): dataset is Dataset => dataset !== null);

  const allDatasets = [...(options.datasets || []), ...childDatasets];

  // Format data for Recharts
  const formattedData =
    allDatasets[0]?.data.map((point, index) => {
      const dataPoint: Record<string, any> = {
        name: point.x,
      };
      allDatasets.forEach((dataset) => {
        if (dataset.data[index]) {
          dataPoint[dataset.name] = dataset.data[index].y;
        }
      });
      return dataPoint;
    }) || [];

  const ChartComponent = ChartComponents[options.type as ChartType] || LineChart;
  const DataComponent = DataComponents[options.type as DataType] || Line;

  if (options.type === "funnel") {
    // Transform data for funnel chart
    const funnelData =
      allDatasets[0]?.data.map((point) => ({
        value: point.y,
        name: point.name || point.x,
        fill: point.color || allDatasets[0].color,
      })) || [];

    const funnelStyle = allDatasets[0]?.style?.funnel || {};

    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <FunnelChart>
            {options.hasTooltip ?? <Tooltip />}
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive={funnelStyle.isAnimationActive !== false}>
              <LabelList
                position={funnelStyle.position || "right"}
                fill={funnelStyle.labelFill || "#000"}
                stroke={funnelStyle.labelStroke || "none"}
                dataKey="name"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (options.type === "treemap") {
    // Restructure data for treemap
    const treemapData = {
      name: "root",
      children: allDatasets.flatMap((dataset) =>
        dataset.data.map((point) => ({
          name: point.name || String(point.x),
          size: point.size || point.y,
          fill: point.color || dataset.color,
          category: dataset.name,
        }))
      ),
    };

    console.log("Treemap Data:", treemapData);

    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <Treemap
            data={treemapData.children}
            width={400}
            height={400}
            className="treemap"
            dataKey="size"
            stroke={options.strokeColor || "#fff"}
            fill={options.fillColor || "#888"}
            aspectRatio={options.aspectRatio || 4 / 3}>
            <Tooltip />
            {options.hasLegend && <Legend />}
          </Treemap>
        </ResponsiveContainer>
      </div>
    );
  }

  if (options.type === "scatter") {
    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="x"
            />
            <YAxis
              type="number"
              dataKey="y"
              name="y"
            />
            {options.hasTooltip ?? <Tooltip cursor={{ strokeDasharray: "3 3" }} />}
            {options.hasLegend ?? <Legend className={options.legend.className || ""} />}
            {allDatasets.map((dataset) => (
              <Scatter
                key={dataset.name}
                name={dataset.name}
                data={dataset.data}
                fill={dataset.color}
                stroke={dataset.color}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (options.type === "pie") {
    // if more than 1 dataset is provided, maps these datsets from inner to outter rings!

    if (allDatasets.length > 1) {
      const pieData = allDatasets.map((dataset) =>
        dataset.data.map((point) => ({
          name: point.x,
          value: point.y,
          fill: dataset.color,
        }))
      );
      console.log("Pie Data:", pieData);

      return (
        <div className={className}>
          <ResponsiveContainer
            width="100%"
            height="100%">
            <PieChart>
              {pieData.map((data, index) => (
                <Pie
                  key={index}
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  label
                  innerRadius={50 + 20 * (index + 1) - (20 * (index + 1)) / allDatasets.length}
                  outerRadius={
                    // calculate outer radius based on space available
                    50 + 20 * (index + 2) - (20 * (index + 2)) / allDatasets.length
                  }
                  style={{
                    fill: allDatasets[index].color,
                    zIndex: index,
                  }}
                />
              ))}
              {options.hasTooltip ?? <Tooltip />}
              {options.hasLegend ?? <Legend />}
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <PieChart>
            <Pie
              data={allDatasets[0]?.data?.map((point) => ({
                name: point.x,
                value: point.y,
                fill: point.color,
              }))}
              dataKey="value"
              nameKey="name"
              label
            />
            {options.hasTooltip ?? <Tooltip />}
            {options.hasLegend ?? <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const formatWithUnit = (value: any, unit?: UnitOptions) => {
    if (!unit) return value;
    const symbol = unit.symbol || "";
    return `${value}${symbol}`;
  };

  // Create custom Tooltip content
  const CustomTooltip = ({ active, payload, label, xUnit, yUnit }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="text-sm mb-1">
          {`${label}${xUnit?.symbol || ""}`}
          {xUnit?.label && <span className="text-gray-500 text-xs"> ({xUnit.label})</span>}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className="text-sm">
            {`${entry.name}: ${formatWithUnit(entry.value, yUnit)}`}
            {yUnit?.label && <span className="text-gray-500 text-xs"> ({yUnit.label})</span>}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <ResponsiveContainer
        width="100%"
        height="100%">
        <ChartComponent
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={x?.title ? { value: x.title, position: "bottom" } : undefined}
          />
          <YAxis label={y?.title ? { value: y.title, angle: -90, position: "left" } : undefined} />
          <Tooltip />
          <Legend />
          {/* {allDatasets.map((dataset) => {
            const Component = DataComponents[options.type as DataType] || Line;
            return (
              <Component
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
                        r: dataset.style.dotRadius || 3,
                        fill: dataset.color,
                      }
                    : false
                }
              />
            );
          })} */}
          {allDatasets.map((dataset) => {
            switch (options.type) {
              case "line":
                return (
                  <Line
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
                            r: dataset.style.dotRadius || 3,
                            fill: dataset.color,
                          }
                        : false
                    }
                  />
                );
              case "area":
                return (
                  <Area
                    key={dataset.name}
                    type="monotone"
                    dataKey={dataset.name}
                    stroke={dataset.color}
                    fill={dataset.color}
                    strokeWidth={dataset.style?.strokeWidth}
                    fillOpacity={dataset.style?.fillOpacity}
                  />
                );
              case "bar":
                return (
                  <Bar
                    key={dataset.name}
                    dataKey={dataset.name}
                    stroke={dataset.color}
                    fill={dataset.color}
                    strokeWidth={dataset.style?.strokeWidth}
                    fillOpacity={dataset.style?.fillOpacity}
                  />
                );
              default:
                return (
                  <Line
                    key={dataset.name}
                    type="monotone"
                    dataKey={dataset.name}
                    stroke={dataset.color}
                    fill={dataset.color}
                    strokeWidth={dataset.style?.strokeWidth}
                    fillOpacity={dataset.style?.fillOpacity}
                  />
                );
            }
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

BillboardChart.displayName = "BillboardChart";

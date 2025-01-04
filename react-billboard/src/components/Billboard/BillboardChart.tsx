import React from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Treemap } from "recharts";
import { BillboardChartProps, Dataset } from "../../types";
import { useBillboard } from "../../context/BillboardContext";
import { BillboardDataset } from "./BillboardDataset";

const ChartComponents = {
  line: LineChart,
  area: AreaChart,
  bar: BarChart,
  pie: PieChart,
  scatter: ScatterChart,
  composed: LineChart,
  bubble: ScatterChart,
} as const;

const DataComponents = {
  line: Line,
  area: Area,
  bar: Bar,
  pie: Pie,
  scatter: Scatter,
} as const;

export const BillboardChart: React.FC<BillboardChartProps> = ({ children, className, x, y }) => {
  const { options } = useBillboard();

  // Extract datasets from children
  const childDatasets = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && (child.type === BillboardDataset || (child.type as any)?.displayName === "BillboardDataset"))
    .map((child) => {
      const dataset = child as React.ReactElement;
      console.log("Dataset Element:", dataset);
      console.log("Dataset Props:", dataset.props);

      // Handle both data prop and children datapoints
      let datasetInfo;
      if (dataset.props.ref?.current) {
        datasetInfo = dataset.props.ref.current;
      } else {
        datasetInfo = {
          name: dataset.props.name,
          data: dataset.props.data || [],
          color: dataset.props.color,
          style: dataset.props.style,
        };
      }
      console.log("Dataset Info:", datasetInfo);
      return datasetInfo;
    });

  // Combine prop datasets with child datasets
  const allDatasets = [...(options.datasets || []), ...childDatasets];

  console.log("All Datasets:", allDatasets);
  console.log("First Dataset Data:", allDatasets[0]?.data);

  // Format data for Recharts
  const formattedData =
    allDatasets[0]?.data?.map((point, index) => {
      const dataPoint = {
        name: point.x,
      };
      allDatasets.forEach((dataset) => {
        if (dataset.data?.[index]) {
          dataPoint[dataset.name] = dataset.data[index].y;
        }
      });
      console.log("Formatted Point:", dataPoint);
      return dataPoint;
    }) || [];

  console.log("Formatted Data:", formattedData);

  const ChartComponent = ChartComponents[options.type] || LineChart;
  const DataComponent = DataComponents[options.type] as typeof Line;

  if (options.type === "treemap") {
    if (allDatasets.length > 1) {
      const treemapData = allDatasets.map((dataset) => ({
        name: dataset.name,
        children: dataset.data.map((point: any) => ({
          name: point.x,
          size: point.y,
        })),
      }));
      console.log("Treemap Data:", treemapData);

      return (
        <div className={className}>
          <ResponsiveContainer
            width="100%"
            height="100%">
            <div className="flex">
              {treemapData.map((name, children) => (
                <Treemap
                  key={name}
                  data={children}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  fill="#8884d8"
                />
              ))}
            </div>
          </ResponsiveContainer>
        </div>
      );
    }

    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <Treemap
            data={allDatasets[0]?.data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
          />
        </ResponsiveContainer>
      </div>
    );
  }

  if (options.type === "scatter") {
    console.log("Scatter Chart Datasets:", allDatasets);
    return (
      <div className={className}>
        <ResponsiveContainer
          width="100%"
          height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={x?.title ? { value: x.title, position: "bottom" } : undefined}
            />
            <YAxis label={y?.title ? { value: y.title, angle: -90, position: "left" } : undefined} />
            {options.hasTooltip ?? <Tooltip />}
            {options.hasLegend ?? <Legend />}
            {allDatasets.map((dataset) => (
              <DataComponent
                key={dataset.name}
                data={dataset.data}
                fill={dataset.color}
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
                  innerRadius={index === 0 ? 0 : 50 + 20 * index}
                  outerRadius={50 + 20 * (index + 1)}
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
          {options.hasTooltip ?? <Tooltip />}
          {options.hasLegend ?? <Legend />}
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
                      r: dataset.style.dotRadius || 3,
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

BillboardChart.displayName = "BillboardChart";

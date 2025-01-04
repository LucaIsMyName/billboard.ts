import React from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Treemap } from "recharts";
import { BillboardChartProps, Dataset } from "../../types";
import { useBillboard } from "../../context/BillboardContext";
import { BillboardDataset } from "./BillboardDataset";
import { BillboardDatapoint } from "./BillboardDatapoint";

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
      try {
        if (dataset.props["data-billboard-dataset"]) {
          return JSON.parse(dataset.props["data-info"]);
        }
        // Handle direct props
        return {
          name: dataset.props.name,
          data:
            dataset.props.data ||
            React.Children.toArray(dataset.props.children)
              .filter((datapoint) => React.isValidElement(datapoint) && (datapoint.type === BillboardDatapoint || (datapoint.type as any)?.displayName === "BillboardDatapoint"))
              .map((datapoint) => {
                const props = (datapoint as React.ReactElement).props;
                return {
                  x: props.x,
                  y: props.y,
                  name: props.name,
                  color: props.style?.color || props.color,
                };
              }),
          color: dataset.props.color,
          style: dataset.props.style,
        };
      } catch (error) {
        console.error("Error processing dataset:", error);
        return null;
      }
    })
    .filter(Boolean);

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
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
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

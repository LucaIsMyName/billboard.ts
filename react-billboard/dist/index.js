import React2, { createContext, useMemo, useState, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { LineChart, ResponsiveContainer, Treemap, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, AreaChart, BarChart, Line, Area, Bar, Scatter } from 'recharts';

// src/context/BillboardContext.tsx
var BillboardContext = createContext(void 0);
var BillboardProvider = ({
  children,
  options: initialOptions
}) => {
  const [propDatasets] = useState(initialOptions.datasets || []);
  const value = {
    options: {
      ...initialOptions,
      datasets: propDatasets
    }
  };
  return /* @__PURE__ */ jsx(BillboardContext.Provider, { value, children });
};
var useBillboard = () => {
  const context = useContext(BillboardContext);
  if (!context) {
    throw new Error("useBillboard must be used within a BillboardProvider");
  }
  return context;
};
var BillboardTitle = ({
  children,
  className
}) => {
  const { options } = useBillboard();
  const title = children || options.title;
  if (!title)
    return null;
  return /* @__PURE__ */ jsx("h2", { className, children: title });
};
var BillboardDescription = ({
  children,
  className
}) => {
  const { options } = useBillboard();
  const description = children || options.description;
  if (!description)
    return null;
  return /* @__PURE__ */ jsx("p", { className, children: description });
};
var BillboardDatapoint = (props) => {
  console.log("Datapoint Props:", props);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-billboard-datapoint": true,
      "data-billboard-datapoint-random-id": Math.floor(Math.random() * 1e6) + "-" + Date.now() + props.x + props.y,
      style: { display: "none", ...props.style },
      "data-x": props.x,
      "data-y": props.y,
      "data-style": JSON.stringify(props.style)
    }
  );
};
BillboardDatapoint.displayName = "BillboardDatapoint";

// src/components/Billboard/BillboardDataset.tsx
var BillboardDataset = ({
  data,
  name = "",
  color,
  children,
  className,
  style
}) => {
  const dataPoints = useMemo(() => {
    if (children) {
      return React2.Children.toArray(children).filter(
        (child) => React2.isValidElement(child) && (child.type === BillboardDatapoint || child.type?.displayName === "BillboardDatapoint")
      ).map((child) => {
        const props = child.props;
        return {
          x: props.x,
          y: props.y,
          name: props.name,
          color: props.style?.color || props.color
        };
      });
    }
    return data || [];
  }, [children, data]);
  return {
    name,
    data: dataPoints,
    color,
    style,
    className
  };
};
BillboardDataset.displayName = "BillboardDataset";
var ChartComponents = {
  line: LineChart,
  area: AreaChart,
  bar: BarChart,
  pie: PieChart,
  scatter: ScatterChart,
  composed: LineChart,
  bubble: ScatterChart
};
var DataComponents = {
  line: Line,
  area: Area,
  bar: Bar,
  pie: Pie,
  scatter: Scatter
};
var BillboardChart = ({ children, className, x, y }) => {
  const { options } = useBillboard();
  const childDatasets = React2.Children.toArray(children).filter((child) => React2.isValidElement(child) && (child.type === BillboardDataset || child.type?.displayName === "BillboardDataset")).map((child) => {
    const dataset = child;
    console.log("Dataset Element:", dataset);
    console.log("Dataset Props:", dataset.props);
    let datasetInfo;
    if (dataset.props.ref?.current) {
      datasetInfo = dataset.props.ref.current;
    } else {
      datasetInfo = {
        name: dataset.props.name,
        data: dataset.props.data || [],
        color: dataset.props.color,
        style: dataset.props.style
      };
    }
    console.log("Dataset Info:", datasetInfo);
    return datasetInfo;
  });
  const allDatasets = [...options.datasets || [], ...childDatasets];
  console.log("All Datasets:", allDatasets);
  console.log("First Dataset Data:", allDatasets[0]?.data);
  const formattedData = allDatasets[0]?.data?.map((point, index) => {
    const dataPoint = {
      name: point.x
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
  const DataComponent = DataComponents[options.type];
  if (options.type === "treemap") {
    if (allDatasets.length > 1) {
      const treemapData = allDatasets.map((dataset) => ({
        name: dataset.name,
        children: dataset.data.map((point) => ({
          name: point.x,
          size: point.y
        }))
      }));
      console.log("Treemap Data:", treemapData);
      return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
        ResponsiveContainer,
        {
          width: "100%",
          height: "100%",
          children: /* @__PURE__ */ jsx("div", { className: "flex", children: treemapData.map((name, children2) => /* @__PURE__ */ jsx(
            Treemap,
            {
              data: children2,
              dataKey: "size",
              aspectRatio: 4 / 3,
              stroke: "#fff",
              fill: "#8884d8"
            },
            name
          )) })
        }
      ) });
    }
    return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
      ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsx(
          Treemap,
          {
            data: allDatasets[0]?.data,
            dataKey: "size",
            aspectRatio: 4 / 3,
            stroke: "#fff",
            fill: "#8884d8"
          }
        )
      }
    ) });
  }
  if (options.type === "scatter") {
    console.log("Scatter Chart Datasets:", allDatasets);
    return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
      ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxs(ScatterChart, { children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "name",
              label: x?.title ? { value: x.title, position: "bottom" } : void 0
            }
          ),
          /* @__PURE__ */ jsx(YAxis, { label: y?.title ? { value: y.title, angle: -90, position: "left" } : void 0 }),
          options.hasTooltip ?? /* @__PURE__ */ jsx(Tooltip, {}),
          options.hasLegend ?? /* @__PURE__ */ jsx(Legend, {}),
          allDatasets.map((dataset) => /* @__PURE__ */ jsx(
            DataComponent,
            {
              data: dataset.data,
              fill: dataset.color
            },
            dataset.name
          ))
        ] })
      }
    ) });
  }
  if (options.type === "pie") {
    if (allDatasets.length > 1) {
      const pieData = allDatasets.map(
        (dataset) => dataset.data.map((point) => ({
          name: point.x,
          value: point.y,
          fill: dataset.color
        }))
      );
      console.log("Pie Data:", pieData);
      return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
        ResponsiveContainer,
        {
          width: "100%",
          height: "100%",
          children: /* @__PURE__ */ jsxs(PieChart, { children: [
            pieData.map((data, index) => /* @__PURE__ */ jsx(
              Pie,
              {
                data,
                dataKey: "value",
                nameKey: "name",
                label: true,
                innerRadius: index === 0 ? 0 : 50 + 20 * index,
                outerRadius: 50 + 20 * (index + 1),
                style: {
                  fill: allDatasets[index].color,
                  zIndex: index
                }
              },
              index
            )),
            options.hasTooltip ?? /* @__PURE__ */ jsx(Tooltip, {}),
            options.hasLegend ?? /* @__PURE__ */ jsx(Legend, {})
          ] })
        }
      ) });
    }
    return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
      ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: allDatasets[0]?.data?.map((point) => ({
                name: point.x,
                value: point.y,
                fill: point.color
              })),
              dataKey: "value",
              nameKey: "name",
              label: true
            }
          ),
          options.hasTooltip ?? /* @__PURE__ */ jsx(Tooltip, {}),
          options.hasLegend ?? /* @__PURE__ */ jsx(Legend, {})
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx(
    ResponsiveContainer,
    {
      width: "100%",
      height: "100%",
      children: /* @__PURE__ */ jsxs(
        ChartComponent,
        {
          data: formattedData,
          margin: { top: 10, right: 30, left: 0, bottom: 0 },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "name",
                label: x?.title ? { value: x.title, position: "bottom" } : void 0
              }
            ),
            /* @__PURE__ */ jsx(YAxis, { label: y?.title ? { value: y.title, angle: -90, position: "left" } : void 0 }),
            options.hasTooltip ?? /* @__PURE__ */ jsx(Tooltip, {}),
            options.hasLegend ?? /* @__PURE__ */ jsx(Legend, {}),
            allDatasets.map((dataset) => /* @__PURE__ */ jsx(
              DataComponent,
              {
                type: "monotone",
                dataKey: dataset.name,
                stroke: dataset.color,
                fill: dataset.color,
                strokeWidth: dataset.style?.strokeWidth,
                fillOpacity: dataset.style?.fillOpacity,
                dot: dataset.style?.dot ? {
                  strokeWidth: dataset.style.strokeWidth || 1,
                  r: dataset.style.dotRadius || 3,
                  fill: dataset.color
                } : false
              },
              dataset.name
            ))
          ]
        }
      )
    }
  ) });
};
BillboardChart.displayName = "BillboardChart";
var BillboardLegend = ({
  children,
  className
}) => {
  const { options } = useBillboard();
  if (!options.datasets?.length)
    return null;
  return /* @__PURE__ */ jsx("div", { className, children: children || /* @__PURE__ */ jsx("ul", { className: "flex gap-4", children: options.datasets.map((dataset, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "w-4 h-4 rounded-full",
        style: { backgroundColor: dataset.color }
      }
    ),
    /* @__PURE__ */ jsx("span", { children: dataset.name })
  ] }, index)) }) });
};
var BillboardBase = ({ children, ...options }) => {
  return /* @__PURE__ */ jsx(BillboardProvider, { options, children: /* @__PURE__ */ jsx("div", { className: options.className, children: children || /* @__PURE__ */ jsx(BillboardChart, { options }) }) });
};
var Billboard = Object.assign(BillboardBase, {
  Title: BillboardTitle,
  Description: BillboardDescription,
  Chart: BillboardChart,
  Dataset: BillboardDataset,
  Datapoint: BillboardDatapoint,
  Legend: BillboardLegend
});

// src/index.ts
var testExport = () => {
  console.log("Test export");
};

export { Billboard, testExport };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
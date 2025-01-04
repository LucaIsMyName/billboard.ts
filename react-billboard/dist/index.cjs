'use strict';

var React3 = require('react');
var jsxRuntime = require('react/jsx-runtime');
var recharts = require('recharts');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React3__default = /*#__PURE__*/_interopDefault(React3);

// src/context/BillboardContext.tsx
var BillboardContext = React3.createContext(void 0);
var BillboardProvider = ({
  children,
  options: initialOptions
}) => {
  const [propDatasets] = React3.useState(initialOptions.datasets || []);
  const value = {
    options: {
      ...initialOptions,
      datasets: propDatasets
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(BillboardContext.Provider, { value, children });
};
var useBillboard = () => {
  const context = React3.useContext(BillboardContext);
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
  return /* @__PURE__ */ jsxRuntime.jsx("h2", { className, children: title });
};
var BillboardDescription = ({
  children,
  className
}) => {
  const { options } = useBillboard();
  const description = children || options.description;
  if (!description)
    return null;
  return /* @__PURE__ */ jsxRuntime.jsx("p", { className, children: description });
};
var BillboardDatapoint = (props) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      style: { display: "none" },
      "data-billboard-datapoint": true,
      "data-point": JSON.stringify(props)
    }
  );
};
BillboardDatapoint.displayName = "BillboardDatapoint";
var BillboardDataset = ({
  data,
  name = "",
  color,
  children,
  style
}) => {
  const processedData = React3.useMemo(() => {
    if (children) {
      return React3__default.default.Children.toArray(children).filter(
        (child) => React3__default.default.isValidElement(child) && (child.type === BillboardDatapoint || child.type?.displayName === "BillboardDatapoint")
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
  const datasetInfo = {
    name,
    data: processedData,
    color,
    style
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      style: { display: "none" },
      "data-billboard-dataset": true,
      "data-info": JSON.stringify(datasetInfo),
      children
    }
  );
};
BillboardDataset.displayName = "BillboardDataset";
var ChartComponents = {
  line: recharts.LineChart,
  area: recharts.AreaChart,
  bar: recharts.BarChart,
  pie: recharts.PieChart,
  scatter: recharts.ScatterChart,
  composed: recharts.LineChart,
  bubble: recharts.ScatterChart
};
var DataComponents = {
  line: recharts.Line,
  area: recharts.Area,
  bar: recharts.Bar,
  pie: recharts.Pie,
  scatter: recharts.Scatter
};
var BillboardChart = ({ children, className, x, y }) => {
  const { options } = useBillboard();
  const childDatasets = React3__default.default.Children.toArray(children).filter((child) => React3__default.default.isValidElement(child) && (child.type === BillboardDataset || child.type?.displayName === "BillboardDataset")).map((child) => {
    const dataset = child;
    try {
      if (dataset.props["data-billboard-dataset"]) {
        return JSON.parse(dataset.props["data-info"]);
      }
      return {
        name: dataset.props.name,
        data: dataset.props.data || React3__default.default.Children.toArray(dataset.props.children).filter((datapoint) => React3__default.default.isValidElement(datapoint) && (datapoint.type === BillboardDatapoint || datapoint.type?.displayName === "BillboardDatapoint")).map((datapoint) => {
          const props = datapoint.props;
          return {
            x: props.x,
            y: props.y,
            name: props.name,
            color: props.style?.color || props.color
          };
        }),
        color: dataset.props.color,
        style: dataset.props.style
      };
    } catch (error) {
      console.error("Error processing dataset:", error);
      return null;
    }
  }).filter(Boolean);
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
  const ChartComponent = ChartComponents[options.type] || recharts.LineChart;
  const DataComponent = DataComponents[options.type];
  if (options.type === "treemap") {
    const treemapData = {
      name: "root",
      children: allDatasets.flatMap(
        (dataset) => dataset.data.map((point) => ({
          name: point.name || String(point.x),
          size: point.size || point.y,
          fill: point.color || dataset.color,
          category: dataset.name
        }))
      )
    };
    console.log("Treemap Data:", treemapData);
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
      recharts.ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          recharts.Treemap,
          {
            data: treemapData.children,
            width: 400,
            height: 400,
            className: "treemap",
            dataKey: "size",
            stroke: options.strokeColor || "#fff",
            fill: options.fillColor || "#888",
            aspectRatio: options.aspectRatio || 4 / 3,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
              options.hasLegend && /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {})
            ]
          }
        )
      }
    ) });
  }
  if (options.type === "scatter") {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
      recharts.ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.ScatterChart, { margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            recharts.XAxis,
            {
              type: "number",
              dataKey: "x",
              name: "x"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            recharts.YAxis,
            {
              type: "number",
              dataKey: "y",
              name: "y"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, { cursor: { strokeDasharray: "3 3" } }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {}),
          allDatasets.map((dataset) => /* @__PURE__ */ jsxRuntime.jsx(
            recharts.Scatter,
            {
              name: dataset.name,
              data: dataset.data,
              fill: dataset.color,
              stroke: dataset.color
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
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
        recharts.ResponsiveContainer,
        {
          width: "100%",
          height: "100%",
          children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.PieChart, { children: [
            pieData.map((data, index) => /* @__PURE__ */ jsxRuntime.jsx(
              recharts.Pie,
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
            options.hasTooltip ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
            options.hasLegend ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {})
          ] })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
      recharts.ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.PieChart, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            recharts.Pie,
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
          options.hasTooltip ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
          options.hasLegend ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {})
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
    recharts.ResponsiveContainer,
    {
      width: "100%",
      height: "100%",
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        ChartComponent,
        {
          data: formattedData,
          margin: { top: 10, right: 30, left: 0, bottom: 0 },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              recharts.XAxis,
              {
                dataKey: "name",
                label: x?.title ? { value: x.title, position: "bottom" } : void 0
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(recharts.YAxis, { label: y?.title ? { value: y.title, angle: -90, position: "left" } : void 0 }),
            options.hasTooltip ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
            options.hasLegend ?? /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {}),
            allDatasets.map((dataset) => /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: children || /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "flex gap-4", children: options.datasets.map((dataset, index) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        className: "w-4 h-4 rounded-full",
        style: { backgroundColor: dataset.color }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: dataset.name })
  ] }, index)) }) });
};
var BillboardBase = ({ children, ...options }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(BillboardProvider, { options, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: options.className, children: children || /* @__PURE__ */ jsxRuntime.jsx(BillboardChart, { options }) }) });
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

exports.Billboard = Billboard;
exports.testExport = testExport;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map
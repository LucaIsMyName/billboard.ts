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
        (child) => {
          var _a;
          return React3__default.default.isValidElement(child) && (child.type === BillboardDatapoint || ((_a = child.type) == null ? void 0 : _a.displayName) === "BillboardDatapoint");
        }
      ).map((child) => {
        var _a;
        const props = child.props;
        return {
          x: props.x,
          y: props.y,
          name: props.name,
          color: ((_a = props.style) == null ? void 0 : _a.color) || props.color
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
  bubble: recharts.ScatterChart,
  funnel: recharts.FunnelChart
};
var DataComponents = {
  line: recharts.Line,
  area: recharts.Area,
  bar: recharts.Bar,
  pie: recharts.Pie,
  scatter: recharts.Scatter
};
var BillboardChart = ({ children, className, x, y }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const { options } = useBillboard();
  const childDatasets = React3__default.default.Children.toArray(children).filter((child) => {
    var _a2;
    return React3__default.default.isValidElement(child) && (child.type === BillboardDataset || ((_a2 = child.type) == null ? void 0 : _a2.displayName) === "BillboardDataset");
  }).map((dataset) => {
    try {
      if (dataset.props["data-billboard-dataset"]) {
        return JSON.parse(dataset.props["data-info"]);
      }
      const childPoints = React3__default.default.Children.toArray(dataset.props.children).filter((datapoint) => {
        var _a2;
        return React3__default.default.isValidElement(datapoint) && (datapoint.type === BillboardDatapoint || ((_a2 = datapoint.type) == null ? void 0 : _a2.displayName) === "BillboardDatapoint");
      }).map((datapoint) => {
        var _a2;
        const props = datapoint.props;
        return {
          x: props.x,
          y: props.y,
          name: props.name,
          color: ((_a2 = props.style) == null ? void 0 : _a2.color) || props.color
        };
      });
      return {
        name: dataset.props.name,
        data: dataset.props.data || childPoints,
        color: dataset.props.color,
        style: dataset.props.style
      };
    } catch (error) {
      console.error("Error processing dataset:", error);
      return null;
    }
  }).filter((dataset) => dataset !== null);
  const allDatasets = [...options.datasets || [], ...childDatasets];
  const formattedData = ((_a = allDatasets[0]) == null ? void 0 : _a.data.map((point, index) => {
    const dataPoint = {
      name: point.x
    };
    allDatasets.forEach((dataset) => {
      if (dataset.data[index]) {
        dataPoint[dataset.name] = dataset.data[index].y;
      }
    });
    return dataPoint;
  })) || [];
  const ChartComponent = ChartComponents[options.type] || recharts.LineChart;
  DataComponents[options.type] || recharts.Line;
  if (options.type === "funnel") {
    const funnelData = ((_b = allDatasets[0]) == null ? void 0 : _b.data.map((point) => ({
      value: point.y,
      name: point.name || point.x,
      fill: point.color || allDatasets[0].color
    }))) || [];
    const funnelStyle = ((_d = (_c = allDatasets[0]) == null ? void 0 : _c.style) == null ? void 0 : _d.funnel) || {};
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx(
      recharts.ResponsiveContainer,
      {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.FunnelChart, { children: [
          (_e = options.hasTooltip) != null ? _e : /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
          /* @__PURE__ */ jsxRuntime.jsx(
            recharts.Funnel,
            {
              dataKey: "value",
              data: funnelData,
              isAnimationActive: funnelStyle.isAnimationActive !== false,
              children: /* @__PURE__ */ jsxRuntime.jsx(
                recharts.LabelList,
                {
                  position: funnelStyle.position || "right",
                  fill: funnelStyle.labelFill || "#000",
                  stroke: funnelStyle.labelStroke || "none",
                  dataKey: "name"
                }
              )
            }
          )
        ] })
      }
    ) });
  }
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
          (_f = options.hasTooltip) != null ? _f : /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, { cursor: { strokeDasharray: "3 3" } }),
          (_g = options.hasLegend) != null ? _g : /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, { className: options.legend.className || "" }),
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
                innerRadius: 50 + 20 * (index + 1) - 20 * (index + 1) / allDatasets.length,
                outerRadius: (
                  // calculate outer radius based on space available
                  50 + 20 * (index + 2) - 20 * (index + 2) / allDatasets.length
                ),
                style: {
                  fill: allDatasets[index].color,
                  zIndex: index
                }
              },
              index
            )),
            (_h = options.hasTooltip) != null ? _h : /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
            (_i = options.hasLegend) != null ? _i : /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {})
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
              data: (_k = (_j = allDatasets[0]) == null ? void 0 : _j.data) == null ? void 0 : _k.map((point) => ({
                name: point.x,
                value: point.y,
                fill: point.color
              })),
              dataKey: "value",
              nameKey: "name",
              label: true
            }
          ),
          (_l = options.hasTooltip) != null ? _l : /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
          (_m = options.hasLegend) != null ? _m : /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {})
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
                label: (x == null ? void 0 : x.title) ? { value: x.title, position: "bottom" } : void 0
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(recharts.YAxis, { label: (y == null ? void 0 : y.title) ? { value: y.title, angle: -90, position: "left" } : void 0 }),
            /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
            /* @__PURE__ */ jsxRuntime.jsx(recharts.Legend, {}),
            allDatasets.map((dataset) => {
              var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2;
              switch (options.type) {
                case "line":
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    recharts.Line,
                    {
                      type: "monotone",
                      dataKey: dataset.name,
                      stroke: dataset.color,
                      fill: dataset.color,
                      strokeWidth: (_a2 = dataset.style) == null ? void 0 : _a2.strokeWidth,
                      fillOpacity: (_b2 = dataset.style) == null ? void 0 : _b2.fillOpacity,
                      dot: ((_c2 = dataset.style) == null ? void 0 : _c2.dot) ? {
                        strokeWidth: dataset.style.strokeWidth || 1,
                        r: dataset.style.dotRadius || 3,
                        fill: dataset.color
                      } : false
                    },
                    dataset.name
                  );
                case "area":
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    recharts.Area,
                    {
                      type: "monotone",
                      dataKey: dataset.name,
                      stroke: dataset.color,
                      fill: dataset.color,
                      strokeWidth: (_d2 = dataset.style) == null ? void 0 : _d2.strokeWidth,
                      fillOpacity: (_e2 = dataset.style) == null ? void 0 : _e2.fillOpacity
                    },
                    dataset.name
                  );
                case "bar":
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    recharts.Bar,
                    {
                      dataKey: dataset.name,
                      stroke: dataset.color,
                      fill: dataset.color,
                      strokeWidth: (_f2 = dataset.style) == null ? void 0 : _f2.strokeWidth,
                      fillOpacity: (_g2 = dataset.style) == null ? void 0 : _g2.fillOpacity
                    },
                    dataset.name
                  );
                default:
                  return /* @__PURE__ */ jsxRuntime.jsx(
                    recharts.Line,
                    {
                      type: "monotone",
                      dataKey: dataset.name,
                      stroke: dataset.color,
                      fill: dataset.color,
                      strokeWidth: (_h2 = dataset.style) == null ? void 0 : _h2.strokeWidth,
                      fillOpacity: (_i2 = dataset.style) == null ? void 0 : _i2.fillOpacity
                    },
                    dataset.name
                  );
              }
            })
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
  var _a;
  const { options } = useBillboard();
  if (!((_a = options.datasets) == null ? void 0 : _a.length))
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
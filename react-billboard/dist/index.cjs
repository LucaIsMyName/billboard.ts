'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var Highcharts = require('highcharts');
var HighchartsReact = require('highcharts-react-official');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Highcharts__default = /*#__PURE__*/_interopDefault(Highcharts);
var HighchartsReact__default = /*#__PURE__*/_interopDefault(HighchartsReact);

// src/context/BillboardContext.tsx
var BillboardContext = react.createContext(void 0);
var BillboardProvider = ({
  children,
  options
}) => {
  const value = react.useMemo(() => ({ options }), [options]);
  return /* @__PURE__ */ jsxRuntime.jsx(BillboardContext.Provider, { value, children });
};
var useBillboard = () => {
  const context = react.useContext(BillboardContext);
  if (context === void 0) {
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

// src/utils/chartConfigs.ts
var getChartConfig = (options) => {
  const baseConfig = {
    chart: {
      type: options.type,
      style: {
        fontFamily: "inherit"
      }
    },
    title: {
      text: void 0
      // We handle title separately
    },
    credits: {
      enabled: false
    },
    xAxis: {
      title: {
        text: options.xAxis?.title
      },
      min: options.xAxis?.min,
      max: options.xAxis?.max
    },
    yAxis: {
      title: {
        text: options.yAxis?.title
      },
      min: options.yAxis?.min,
      max: options.yAxis?.max
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1e3
        }
      }
    },
    series: options.datasets?.map((dataset) => ({
      name: dataset.name,
      data: dataset.data,
      color: dataset.color
    })) || []
  };
  switch (options.type) {
    case "line":
      return {
        ...baseConfig,
        plotOptions: {
          ...baseConfig.plotOptions,
          line: {
            marker: {
              enabled: true
            }
          }
        }
      };
    case "area":
      return {
        ...baseConfig,
        plotOptions: {
          ...baseConfig.plotOptions,
          area: {
            fillOpacity: 0.3
          }
        }
      };
    case "bar":
      return {
        ...baseConfig,
        plotOptions: {
          ...baseConfig.plotOptions,
          bar: {
            borderRadius: 4
          }
        }
      };
    default:
      return baseConfig;
  }
};
var BillboardChart = ({
  children,
  className,
  x,
  y
}) => {
  const { options } = useBillboard();
  const chartRef = react.useRef(null);
  const chartOptions = getChartConfig({
    ...options,
    xAxis: x || options.xAxis,
    yAxis: y || options.yAxis
  });
  react.useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      HighchartsReact__default.default,
      {
        highcharts: Highcharts__default.default,
        options: chartOptions,
        ref: chartRef
      }
    ),
    children
  ] });
};
var BillboardDataset = ({
  data,
  name,
  color
}) => {
  const { options } = useBillboard();
  react.useEffect(() => {
  }, [data, name, color, options]);
  return null;
};
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
var BillboardComponent = ({ children, ...options }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(BillboardProvider, { options, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: options.className, children: children || /* @__PURE__ */ jsxRuntime.jsx(BillboardChart, {}) }) });
};
var Billboard = Object.assign(BillboardComponent, {
  Title: BillboardTitle,
  Description: BillboardDescription,
  Chart: BillboardChart,
  Dataset: BillboardDataset,
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
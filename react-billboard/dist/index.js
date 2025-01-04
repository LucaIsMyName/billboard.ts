import { createContext, useRef, useEffect, useMemo, useContext } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// src/context/BillboardContext.tsx
var BillboardContext = createContext(void 0);
var BillboardProvider = ({
  children,
  options
}) => {
  const value = useMemo(() => ({ options }), [options]);
  return /* @__PURE__ */ jsx(BillboardContext.Provider, { value, children });
};
var useBillboard = () => {
  const context = useContext(BillboardContext);
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
  const chartRef = useRef(null);
  const chartOptions = getChartConfig({
    ...options,
    xAxis: x || options.xAxis,
    yAxis: y || options.yAxis
  });
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(
      HighchartsReact,
      {
        highcharts: Highcharts,
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
  useEffect(() => {
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
var BillboardComponent = ({ children, ...options }) => {
  return /* @__PURE__ */ jsx(BillboardProvider, { options, children: /* @__PURE__ */ jsx("div", { className: options.className, children: children || /* @__PURE__ */ jsx(BillboardChart, {}) }) });
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

export { Billboard, testExport };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map
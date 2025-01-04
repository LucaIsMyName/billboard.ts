import { BillboardOptions } from '../types';

export const getChartConfig = (options: BillboardOptions): Highcharts.Options => {
  const baseConfig: Highcharts.Options = {
    chart: {
      type: options.type as any,
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    xAxis: options.type === 'pie' ? undefined : {
      categories: options.datasets?.[0]?.data.map(point => point.x as string) || [],
      title: {
        text: options.xAxis?.title,
      },
    },
    yAxis: options.type === 'pie' ? undefined : {
      title: {
        text: options.yAxis?.title,
      },
    },
    plotOptions: {
      series: {
        animation: true,
      },
    },
    series: options.datasets?.map(dataset => ({
      type: options.type,
      name: dataset.name,
      data: dataset.data.map(point => ({
        x: point.x,
        y: point.y,
        z: point.z,
        name: point.name,
        color: point.color,
        marker: point.marker,
        className: point.className,
      })),
      // Apply dataset-level styling
      color: dataset.color,
      lineWidth: dataset.style?.lineWidth,
      linecap: dataset.style?.lineCap,
      dashStyle: dataset.style?.dashStyle,
      opacity: dataset.style?.opacity,
      fillOpacity: dataset.style?.fillOpacity,
      borderRadius: dataset.style?.borderRadius,
      borderWidth: dataset.style?.borderWidth,
      borderColor: dataset.style?.borderColor,
      className: dataset.style?.className,
      cursor: dataset.style?.cursor,
      shadow: dataset.style?.shadow,
      marker: dataset.style?.marker,
    })) || [],
  };

  // Format data based on chart type
  const formattedData = options.datasets?.map(dataset => {
    switch (options.type) {
      case 'pie':
        return {
          type: 'pie',
          name: dataset.name,
          data: dataset.data.map(point => ({
            name: point.name || point.x,
            y: point.y,
            color: point.color,
          })),
        };

      case 'bubble':
        return {
          type: 'bubble',
          name: dataset.name,
          data: dataset.data.map(point => ({
            x: point.x as number,
            y: point.y,
            z: point.z || 1,
            color: point.color,
          })),
        };

      case 'scatter':
        return {
          type: 'scatter',
          name: dataset.name,
          data: dataset.data.map(point => ([
            point.x as number,
            point.y,
          ])),
          color: dataset.color,
        };

      default:
        return {
          type: options.type,
          name: dataset.name,
          data: dataset.data.map(point => point.y),
          color: dataset.color,
        };
    }
  });

  return {
    ...baseConfig,
    series: formattedData || [],
  };
};
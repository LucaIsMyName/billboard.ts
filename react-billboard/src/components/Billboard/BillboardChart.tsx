import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSunburst from 'highcharts/modules/sunburst';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsBullet from 'highcharts/modules/bullet';

// Initialize Highcharts modules
HighchartsMore(Highcharts);
HighchartsSunburst(Highcharts);
HighchartsTreemap(Highcharts);
HighchartsHeatmap(Highcharts);
HighchartsBullet(Highcharts);

import { BillboardChartProps } from '../../types';
import { useBillboard } from '../../context/BillboardContext';
import { getChartConfig } from '../../utils/chartConfigs';

export const BillboardChart: React.FC<BillboardChartProps> = ({
  children,
  className,
  x,
  y,
}) => {
  const { options } = useBillboard();
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions = getChartConfig({
    ...options,
    xAxis: x || options.xAxis,
    yAxis: y || options.yAxis,
  });

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, [options.datasets]); // Re-reflow when datasets change

  // Add accessibility options to remove warning
  const finalOptions = {
    ...chartOptions,
    accessibility: {
      enabled: false
    }
  };

  return (
    <div className={className}>
      <HighchartsReact
        highcharts={Highcharts}
        options={finalOptions}
        ref={chartRef}
      />
      {children}
    </div>
  );
};
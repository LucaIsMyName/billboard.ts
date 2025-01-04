import { BillboardOptions } from "../types";

export const getChartConfig = (options: BillboardOptions): any => {
  const { type, datasets } = options;
  const data = datasets?.map((dataset) => {
    const { name, data: datasetData } = dataset;
    return {
      name,
      data: datasetData.map((dataPoint) => {
        const { x, y, name, color } = dataPoint;
        return {
          x,
          y,
          name,
          color,
        };
      }),
    };
  });

  return {
    data,
    type,
  };
};

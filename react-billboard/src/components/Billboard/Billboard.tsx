import React from "react";
import { BillboardProvider } from "../../context/BillboardContext";
import { BillboardOptions } from "../../types";
import { BillboardTitle } from "./BillboardTitle";
import { BillboardDescription } from "./BillboardDescription";
import { BillboardChart } from "./BillboardChart";
import { BillboardDataset } from "./BillboardDataset";
import { BillboardDatapoint } from "./BillboardDatapoint";
import { BillboardLegend } from "./BillboardLegend";

export interface BillboardProps extends BillboardOptions {
  children?: React.ReactNode;
}

interface BillboardComponent extends React.FC<BillboardProps> {
  Title: typeof BillboardTitle;
  Description: typeof BillboardDescription;
  Chart: typeof BillboardChart;
  Dataset: typeof BillboardDataset;
  Datapoint: typeof BillboardDatapoint;
  Legend: typeof BillboardLegend;
}

const BillboardBase: React.FC<BillboardProps> = ({ children, ...options }) => {
  return (
    <BillboardProvider options={options}>
      <div className={options.className}>{children || <BillboardChart options={options} />}</div>
    </BillboardProvider>
  );
};

export const Billboard: BillboardComponent = Object.assign(BillboardBase, {
  Title: BillboardTitle,
  Description: BillboardDescription,
  Chart: BillboardChart,
  Dataset: BillboardDataset,
  Datapoint: BillboardDatapoint,
  Legend: BillboardLegend,
});

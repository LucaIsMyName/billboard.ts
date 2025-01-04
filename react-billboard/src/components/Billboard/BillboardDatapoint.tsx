import React from "react";
import { DataPoint, DataPointStyle } from "../../types";

export interface BillboardDatapointProps extends Omit<DataPoint, "name"> {
  name?: string;
  z?: number;
  style?: DataPointStyle;
}

export const BillboardDatapoint: React.FC<BillboardDatapointProps> = (props) => {
  console.log("Datapoint Props:", props);

  return (
    <div
      data-billboard-datapoint
      data-billboard-datapoint-random-id={Math.floor(Math.random() * 1000000) + "-" + Date.now() + props.x + props.y}
      style={{ display: "none", ...props.style }}
      data-x={props.x}
      data-y={props.y}
      data-style={JSON.stringify(props.style)}
    />
  );
};

BillboardDatapoint.displayName = "BillboardDatapoint";

import React, { useEffect, useRef, Children } from 'react';
import { BillboardDatasetProps, DatasetStyle } from '../../types';
import { useBillboard } from '../../context/BillboardContext';
import { BillboardDatapoint } from './BillboardDatapoint';

interface ExtendedBillboardDatasetProps extends Omit<BillboardDatasetProps, 'data'> {
  data?: BillboardDatasetProps['data'];
  children?: React.ReactNode;
  style?: DatasetStyle;  // Add style prop
}

export const BillboardDataset: React.FC<ExtendedBillboardDatasetProps> = ({
  data,
  name = '',
  color,
  children,
  style,
}) => {
  const { updateDataset } = useBillboard();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const dataFromChildren = children 
      ? Children.toArray(children)
          .filter(child => React.isValidElement(child) && child.type === BillboardDatapoint)
          .map(child => {
            const props = (child as React.ReactElement).props;
            return {
              x: props.x,
              y: props.y,
              z: props.z,
              name: props.name,
              color: props.style?.color || props.color,
              marker: props.style && {
                radius: props.style.radius,
                symbol: props.style.symbol,
                fillColor: props.style.fillColor,
                lineWidth: props.style.lineWidth,
                lineColor: props.style.lineColor,
              },
              className: props.style?.className,
            };
          })
      : data || [];

    if (isInitialMount.current) {
      isInitialMount.current = false;
      updateDataset({
        name,
        data: dataFromChildren,
        color,
        style,
      });
    } else if (dataFromChildren.length > 0) {
      updateDataset({
        name,
        data: dataFromChildren,
        color,
        style,
      });
    }
  }, [data, name, color, updateDataset, children, style]);

  return null;
};
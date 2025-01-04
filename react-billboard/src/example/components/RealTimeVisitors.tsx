import React, { useEffect, useState } from "react";
import { Billboard } from "../../components/Billboard/Billboard";
import { generateRandomValue, getRandomColor } from "../utils/mockData";

export const RealTimeVisitors = () => {
  const [visitors, setVisitors] = useState<Array<{ x: string; y: number }>>([]);
  const [uniqueVisitors, setUniqueVisitors] = useState<Array<{ x: string; y: number }>>([]);
  const maxPoints = 20; // Keep last 20 points

  useEffect(() => {
    // Add a new data point every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setVisitors((prev) => {
        const newData = [...prev, { x: timeString, y: generateRandomValue(50, 200) }];
        // Keep only the last maxPoints
        return newData.slice(-maxPoints);
      });
      setUniqueVisitors((prev) => {
        const newUniqueData = [...prev, { x: timeString, y: generateRandomValue(40, 100) }];
        // Keep only the last maxPoints
        return newUniqueData.slice(-maxPoints);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Real-Time Visitors</h2>
      <Billboard
        type="line"
        options={{
          legend: {
            show: true,
          },
        }}>
        <Billboard.Chart className="h-[300px]">
          <Billboard.Dataset
            name="Active Visitors"
            color={getRandomColor()}
            style={{
              strokeWidth: 2,
              dot: true,
              innerRadius: 4,
            }}
            data={visitors}
          />
          <Billboard.Dataset
            name="Unique Visitors"
            color={getRandomColor()}
            style={{
              strokeWidth: 5,
              dot: true,
              innerRadius: 4,
            }}
            data={uniqueVisitors}
          />
        </Billboard.Chart>
      </Billboard>
    </div>
  );
};

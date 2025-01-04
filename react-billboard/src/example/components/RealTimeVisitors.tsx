import React, { useEffect, useState } from 'react';
import { Billboard } from "../../components/Billboard/Billboard"
import { generateRandomValue } from '../utils/mockData';

export const RealTimeVisitors = () => {
  const [visitors, setVisitors] = useState<Array<{ x: string; y: number }>>([]);
  const maxPoints = 20; // Keep last 20 points

  useEffect(() => {
    // Add a new data point every second
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      setVisitors(prev => {
        const newData = [
          ...prev,
          { x: timeString, y: generateRandomValue(50, 200) }
        ];
        // Keep only the last maxPoints
        return newData.slice(-maxPoints);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Real-Time Visitors</h2>
      <Billboard type="line">
        <Billboard.Chart className="h-[300px]">
          <Billboard.Dataset
            name="Active Visitors"
            color="#4299E1"
            style={{
              strokeWidth: 2,
              dot: true,
            }}
            data={visitors}
          />
        </Billboard.Chart>
      </Billboard>
    </div>
  );
};
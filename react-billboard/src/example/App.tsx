import React from "react";
import { Billboard } from "../components/Billboard/Billboard";

// Test data
const revenueData = [
  { x: "Jan", y: 1000 },
  { x: "Feb", y: 1500 },
  { x: "Mar", y: 1200 },
  { x: "Apr", y: 1800 },
  { x: "May", y: 2100 },
];

const profitData = [
  { x: "Jan", y: 400 },
  { x: "Feb", y: 600 },
  { x: "Mar", y: 500 },
  { x: "Apr", y: 700 },
  { x: "May", y: 800 },
];

export const App = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Billboard Chart Examples</h1>
      
      {/* Line Chart */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Line Chart Example</h2>
        <Billboard 
          type="line"
          datasets={[{
            name: "Revenue",
            data: revenueData,
            color: "#4299E1",
            style: {
              strokeWidth: 2,
              dot: true,
            }
          },{
            name: "Profit",
            data: revenueData.map(point => { return { x: point.x, y: point.y / 2 * Math.random() } }),
            color: "#4299E1",
            style: {
              strokeWidth: 2,
              dot: true,
            }
          }]}
        >
          <Billboard.Chart className="h-[400px]" />
        </Billboard>
      </div>

      {/* Area Chart */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Area Chart Example</h2>
        <Billboard type="area">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Revenue"
              data={revenueData}
              color="#4299E1"
              style={{
                fillOpacity: 0.3,
                strokeWidth: 2,
              }}
            />
            <Billboard.Dataset
              name="Profit"
              data={profitData}
              color="#48BB78"
              style={{
                fillOpacity: 0.3,
                strokeWidth: 2,
              }}
            />
          </Billboard.Chart>
        </Billboard>
      </div>

      {/* Component-based Example */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Component-based Example</h2>
        <Billboard type="area">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Revenue"
              color="#4299E1"
              
              style={{
                strokeWidth: 2,
                dot: true,
              }}
            >
              <Billboard.Datapoint x="Jan" y={1000} />
              <Billboard.Datapoint x="Feb" y={1500} />
              <Billboard.Datapoint x="Mar" y={1200} />
              <Billboard.Datapoint x="Apr" y={1800} />
              <Billboard.Datapoint x="May" y={2100} />
            </Billboard.Dataset>
          </Billboard.Chart>
        </Billboard>
      </div>
    </div>
  );
};
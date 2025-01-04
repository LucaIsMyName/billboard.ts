import React from "react";
import { Billboard } from "../components/Billboard/Billboard";
import { Legend } from "recharts";

// Test data

const mockData = [
  { x: "Jan", y: 1000 * Math.random(), z: 0 },
  { x: "Feb", y: 1000 * Math.random(), z: 0 },
  { x: "Mar", y: 1000 * Math.random(), z: 0 },
  { x: "Apr", y: 1000 * Math.random(), z: 0 },
  { x: "May", y: 1000 * Math.random(), z: 0 },
];
const revenueData = mockData;

const growthData = mockData;

const profitData = mockData;

const getRandomColor = () => {
  // find a way to random generate hex colors and return them
  let colors = ["#4299E1", "#48C999", "#8884d8", "#913ea0", "#ff7300", "#8884d8", "#82ca9d", "#ff7300", "#ff7500", "#ff71cc", "0033cf", "33cf33"];

  return colors[Math.floor(Math.random() * colors.length * +1)];
};

export const App = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Billboard Chart Examples</h1>

      {/* Line Chart */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Line Chart Example</h2>
        <Billboard
          type="line"
          options={{
            title: "Revenue vs. Profit",
            description: "This is a simple line chart example.",
            hasLegend: false,
          }}
          datasets={[
            {
              name: "Revenue",
              data: revenueData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              }),
              color: getRandomColor(),
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
            {
              name: "Profit",
              data: revenueData.map((point) => {
                return { x: point.x, y: (point.y / 2) * Math.random() };
              }),
              color: getRandomColor(),
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
          ]}>
          <Billboard.Chart className="h-[50vh]" />
        </Billboard>
      </div>

      {/* Area Chart */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Area Chart Example</h2>
        <Billboard type="area">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Revenue"
              data={revenueData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              })}
              color="#4299E1"
              style={{
                fillOpacity: 0.3,
                strokeWidth: 2,
              }}
            />
            <Billboard.Dataset
              name="Profit"
              data={profitData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              })}
              color={getRandomColor()}
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
        // Composed Chart Example
        <Billboard type="line">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Revenue"
              color="#8884d8"
              style={{
                fillOpacity: 0.3,
                type: "monotone",
              }}
              data={revenueData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              })}
            />
            <Billboard.Dataset
              name="Profit"
              color={getRandomColor()}
              style={{
                barSize: 10,
                strokeWidth: 2,
              }}
              data={profitData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              })}
            />
            <Billboard.Dataset
              name="Growth"
              color="#ff7300"
              style={{
                strokeWidth: 2,
              }}
              data={growthData.map((point) => {
                return { x: point.x, y: point.y * Math.random(), color: getRandomColor() };
              })}
            />
          </Billboard.Chart>
        </Billboard>
        // Multi-level Pie Chart
        <Billboard type="pie">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Inner Ring"
              color={getRandomColor()}
              style={{
                outerRadius: 60,
                label: true,
              }}
              data={[1, 2, 3].map((i) => {
                return { x: `A${i}`, y: Math.floor(Math.random() * 100), color: getRandomColor() };
              })}
            />
            <Billboard.Dataset
              name="Middle Ring"
              color={`${getRandomColor()}`}
              style={{
                outerRadius: 60,
                label: false,
              }}
              data={[1, 2, 3].map((i) => {
                return { x: `B${i}`, y: Math.floor(Math.random() * 100), color: getRandomColor() };
              })}
            />
            <Billboard.Dataset
              name="Outer Ring"
              color={`${getRandomColor()}`}
              style={{
                innerRadius: 70,
                outerRadius: 90,
                label: false,
              }}
              data={[1, 2, 3].map((i) => {
                return { x: `C${i}`, y: Math.floor(Math.random() * 100), color: getRandomColor() };
              })}
            />
          </Billboard.Chart>
        </Billboard>
        // Scatter Plot Example
        <Billboard
          options={{
            title: "Revenue vs. Profit",
            description: "This is a simple scatter plot example.",
            hasLegend: false,
            hasTooltip: false,
          }}
          datasets={[
            {
              name: "Revenue",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return { x: i, y: i * 1000 * Math.random(), z: 0 };
              }),
              color: getRandomColor(),
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
            {
              name: "Profit",
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return { x: i, y: 1000 * Math.random(), z: 0 };
              }),
              color: getRandomColor(),
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
          ]}
          type="scatter">
          <Billboard.Chart className="h-[400px]"></Billboard.Chart>
        </Billboard>
        <Billboard
          options={{
            title: "Revenue vs. Profit",
            description: "This is a simple scatter plot example.",
            hasLegend: false,
            hasTooltip: false,
            style: {
              strokeWidth: 2,
              dot: true,
            },
          }}
          type="treemap">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Revenue Stream 1"
              data={[
                { color: getRandomColor(), name: "Product A", size: 1000 + Math.random() * 2000 },
                { color: getRandomColor(), name: "Product B", size: 1000 + Math.random() * 2000 },
                { color: getRandomColor(), name: "Product C", size: 1000 + Math.random() * 2000 },
              ]}
            />
          </Billboard.Chart>
        </Billboard>
        <Billboard type="pie">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Profit"
              color={getRandomColor()}
              style={{
                strokeWidth: 2,
                dot: true,
              }}>
              <Billboard.Datapoint
                x={"Product A1"}
                y={Math.floor(Math.random() * 1000)}
                name="One"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={"Product A2"}
                y={Math.floor(Math.random() * 500)}
                name="Two"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={"Product A3"}
                y={Math.floor(Math.random() * 500)}
                name="Three"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={"Product A4"}
                y={Math.floor(Math.random() * 500)}
                name="Four"
                color={getRandomColor()}
              />
            </Billboard.Dataset>
            <Billboard.Dataset
              name="Revenue"
              color={getRandomColor()}
              style={{
                strokeWidth: 2,
                dot: true,
              }}>
              <Billboard.Datapoint
                x={1}
                y={Math.floor(Math.random() * 1000)}
                name="One"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={2}
                y={Math.floor(Math.random() * 1000)}
                name="Two"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={3}
                y={Math.floor(Math.random() * 1000)}
                name="Three"
                color={getRandomColor()}
              />
              <Billboard.Datapoint
                x={4}
                y={Math.floor(Math.random() * 1000)}
                name="Four"
                color={getRandomColor()}
              />
            </Billboard.Dataset>
          </Billboard.Chart>
        </Billboard>
      </div>
    </div>
  );
};

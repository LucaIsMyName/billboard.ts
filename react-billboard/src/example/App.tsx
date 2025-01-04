import React from "react";
import { Billboard } from "../components/Billboard/Billboard";

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
              color: "#4299E1",
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
              color: "#3300E1",
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
              color="#48C999"
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
              type="line"
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
              type="line"
              color="#913ea0"
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
              type="line"
              color="#ff7300"
              style={{
                strokeWidth: 2,
              }}
              data={growthData.map((point) => {
                return { x: point.x, y: point.y * Math.random() };
              })}
            />
          </Billboard.Chart>
        </Billboard>
        // Multi-level Pie Chart
        <Billboard type="pie">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              name="Inner Ring"
              color="#8884d8"
              style={{
                outerRadius: 60,
                label: true,
              }}
              data={[1, 2, 3].map((i) => {
                return { x: `A${i}`, y: Math.floor(Math.random() * 100) };
              })}
            />
            <Billboard.Dataset
              name="Outer Ring"
              color="#82ca9d"
              style={{
                innerRadius: 70,
                outerRadius: 90,
                label: true,
              }}
              data={[1, 2, 3].map((i) => {
                return { x: `A${i}`, y: Math.floor(Math.random() * 100) };
              })}
            />
          </Billboard.Chart>
        </Billboard>
        // Scatter Plot Example
        <Billboard
          datasets={[
            {
              name: "Revenue",
              data: [
                { x: 1, y: 1000 * Math.random(), z: 0 },
                { x: 2, y: 1000 * Math.random(), z: 0 },
                { x: 3, y: 1000 * Math.random(), z: 0 },
              ],
              color: "#4299E1",
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
            {
              name: "Profit",
              data: [
                { x: 1, y: 1000 * Math.random(), z: 0 },
                { x: 2, y: 1000 * Math.random(), z: 0 },
                { x: 3, y: 1000 * Math.random(), z: 0 },
              ],
              color: "#48C999",
              style: {
                strokeWidth: 2,
                dot: true,
              },
            },
          ]}
          type="scatter">
          <Billboard.Chart className="h-[400px]"></Billboard.Chart>
        </Billboard>
        <Billboard type="treemap">
          <Billboard.Chart className="h-[400px]">
            <Billboard.Dataset
              className="ml-32 -mr-32 h-[400px]"
              name="Revenue"
              color="#8884d8"
              data={[
                { name: "A", size: 1000 * Math.random() },
                { name: "B", size: 1000 * Math.random() },
                { name: "C", size: 1000 * Math.random() },
              ]}
            />
            <Billboard.Dataset
              className="ml-32 h-[500px]"
              name="Profit"
              color="#82ca9d"
              data={[
                { name: "A", size: 500 * Math.random() },
                { name: "B", size: 500 * Math.random() },
                { name: "C", size: 500 * Math.random() },
              ]}
            />
          </Billboard.Chart>
        </Billboard>
      </div>
    </div>
  );
};

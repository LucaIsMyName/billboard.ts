import React from "react";
import { Billboard } from "../components/Billboard/Billboard";
import { Legend } from "recharts";
import { Dashboard } from "./components/Dashboard";

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
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <Dashboard />
    </div>
  );
};

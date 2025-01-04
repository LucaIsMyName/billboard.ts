import React from "react";
import { Billboard } from "../components/Billboard/Billboard";

export const App = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Billboard Chart Examples</h1>

      {/* Line Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
        <Billboard
          type="line"
          className="w-full">
          <Billboard.Title className="text-lg font-bold">Revenue vs Profit</Billboard.Title>
          <Billboard.Chart
            className="h-96"
            y={{ title: "Amount ($)" }}>
            <Billboard.Dataset
              name="Revenue"
              color="#4299E1">
              <Billboard.Datapoint
                x="Jan"
                y={1000}
              />
              <Billboard.Datapoint
                x="Feb"
                y={1500}
              />
              <Billboard.Datapoint
                x="Mar"
                y={1200}
              />
              <Billboard.Datapoint
                x="Apr"
                y={1800}
              />
              <Billboard.Datapoint
                x="May"
                y={2000}
              />
            </Billboard.Dataset>
            <Billboard.Dataset
              name="Profit"
              color="#48BB78">
              <Billboard.Datapoint
                x="Jan"
                y={300}
              />
              <Billboard.Datapoint
                x="Feb"
                y={400}
              />
              <Billboard.Datapoint
                x="Mar"
                y={350}
              />
              <Billboard.Datapoint
                x="Apr"
                y={500}
              />
              <Billboard.Datapoint
                x="May"
                y={600}
              />
            </Billboard.Dataset>
          </Billboard.Chart>
          <Billboard.Legend className="mt-4" />
        </Billboard>
      </div>

      {/* Pie Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
        <Billboard
          type="pie"
          className="w-full">
          <Billboard.Title className="text-lg font-bold">Revenue Distribution</Billboard.Title>
          <Billboard.Chart className="h-96">
            <Billboard.Dataset name="Revenue Sources">
              <Billboard.Datapoint
                name="Product A"
                y={35}
              />
              <Billboard.Datapoint
                name="Product B"
                y={25}
              />
              <Billboard.Datapoint
                name="Product C"
                y={20}
              />
              <Billboard.Datapoint
                name="Product D"
                y={15}
              />
              <Billboard.Datapoint
                name="Others"
                y={5}
              />
            </Billboard.Dataset>
          </Billboard.Chart>
          <Billboard.Legend className="mt-4" />
        </Billboard>
      </div>

      {/* Bubble Chart */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Bubble Chart</h2>
        <Billboard
          type="bubble"
          className="w-full">
          <Billboard.Title className="text-lg font-bold">Product Analysis</Billboard.Title>
          <Billboard.Chart
            className="h-96"
            x={{ title: "Price ($)" }}
            y={{ title: "Sales Volume" }}>
            <Billboard.Dataset name="Products">
              <Billboard.Datapoint
                x={50}
                y={100}
                z={20}
                name="Product A"
                color="#4299E1"
              />
              <Billboard.Datapoint
                x={75}
                y={80}
                z={15}
                name="Product B"
                color="#48BB78"
              />
              <Billboard.Datapoint
                x={65}
                y={120}
                z={25}
                name="Product C"
                color="#EF4444"
              />
            </Billboard.Dataset>
          </Billboard.Chart>
          <Billboard.Legend className="mt-4" />
        </Billboard>
      </div>

      {/* Scatter Plot */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Scatter Plot</h2>
        <Billboard
          type="scatter"
          className="w-full">
          <Billboard.Title className="text-lg font-bold">Price vs Rating</Billboard.Title>
          <Billboard.Chart
            className="h-96"
            x={{ title: "Price ($)" }}
            y={{ title: "Customer Rating" }}>
            <Billboard.Dataset name="Electronics">
              <Billboard.Datapoint
                x={200}
                y={4.5}
                color="#4299E1"
              />
              <Billboard.Datapoint
                x={150}
                y={3.8}
                color="#4299E1"
              />
              <Billboard.Datapoint
                x={300}
                y={4.2}
                color="#4299E1"
              />
              <Billboard.Datapoint
                x={250}
                y={4.7}
                color="#4299E1"
              />
            </Billboard.Dataset>
            <Billboard.Dataset name="Accessories">
              <Billboard.Datapoint
                x={50}
                y={3.9}
                color="#48BB78"
              />
              <Billboard.Datapoint
                x={75}
                y={4.1}
                color="#48BB78"
              />
              <Billboard.Datapoint
                x={45}
                y={3.5}
                color="#48BB78"
              />
              <Billboard.Datapoint
                x={60}
                y={4.3}
                color="#48BB78"
              />
            </Billboard.Dataset>
          </Billboard.Chart>
          <Billboard.Legend className="mt-4" />
        </Billboard>
      </div>
      <section className="text-center text-gray-500">
        // Styling examples
        <Billboard type="line">
          <Billboard.Chart>
            {/* Styled Dataset */}
            <Billboard.Dataset
              name="Revenue"
              style={{
                color: "#4299E1",
                lineWidth: 3,
                dashStyle: "Dash",
                marker: {
                  symbol: "circle",
                  radius: 6,
                  fillColor: "white",
                  lineWidth: 2,
                  lineColor: "#4299E1",
                },
              }}>
              {/* Styled Datapoints */}
              <Billboard.Datapoint
                x="Jan"
                y={1000}
                style={{
                  color: "#EF4444", // This point will be red
                  radius: 8, // This point will be larger
                  symbol: "diamond", // This point will be diamond-shaped
                }}
              />
              <Billboard.Datapoint
                x="Feb"
                y={1500}
              />
              <Billboard.Datapoint
                x="Mar"
                y={1200}
                style={{
                  color: "#10B981",
                  symbol: "triangle",
                }}
              />
            </Billboard.Dataset>
          </Billboard.Chart>
        </Billboard>
        // Bar chart styling example
        <Billboard type="bar">
          <Billboard.Chart>
            <Billboard.Dataset
              name="Sales"
              style={{
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "#3299E1",
                opacity: 0.8,
              }}>
              {[1, 2, 3].map((i) => {
                return (
                  <Billboard.Datapoint
                    key={i}
                    x={`Product ${i}`}
                    y={Math.floor(Math.random() * 100)}
                  />
                );
              })}
            </Billboard.Dataset>
          </Billboard.Chart>
        </Billboard>
      </section>
    </div>
  );
};

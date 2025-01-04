import React from "react";
import { Billboard } from "../../components/Billboard/Billboard";
import { RealTimeVisitors } from "./RealTimeVisitors";
import { generatePastWeekData, funnelData, yearlyData, trafficSources, deviceData, getRandomColor } from "../utils/mockData";

export const Dashboard = () => {
  const weeklyData = generatePastWeekData();


  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

        {/* Real-time section */}
        <section className="mb-8">
          <RealTimeVisitors />
        </section>

        {/* Weekly Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
            {/* Props-based example */}
            <Billboard type="pie">
              <Billboard.Chart className="h-[300px]">
                <Billboard.Dataset
                  name="Visitors"
                  data={weeklyData}
                  color={getRandomColor()}
                  style={{ strokeWidth: 2, dot: true, innerRadius: 4 }}
                />
                <Billboard.Dataset
                  name="Unique Visitors"
                  data={yearlyData}
                  color={getRandomColor()}
                  style={{ strokeWidth: 2 }}
                />
              </Billboard.Chart>
            </Billboard>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">User Journey</h2>
            {/* Component-based example */}
            <Billboard type="funnel">
              <Billboard.Chart className="h-[300px]">
                <Billboard.Dataset
                  name="User Journey"
                  style={{
                    funnel: {
                      position: "right",
                      labelFill: "#000",
                      isAnimationActive: true,
                    },
                  }}
                  data={funnelData}
                />
              </Billboard.Chart>
            </Billboard>
          </div>
        </section>

        {/* Traffic Sources and Devices */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
            <Billboard type="pie">
              <Billboard.Chart className="h-[300px]">
                <Billboard.Dataset
                  name="Traffic"
                  data={trafficSources}
                  style={{
                    label: true,
                  }}
                />
              </Billboard.Chart>
            </Billboard>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Devices</h2>
            <Billboard type="pie">
              <Billboard.Chart className="h-[300px]">
                {/* Using Datapoint components example */}
                <Billboard.Dataset name="Devices">
                  {deviceData.map((device) => (
                    <Billboard.Datapoint
                      key={device.x}
                      x={device.x}
                      y={device.y}
                      color={device.color}
                    />
                  ))}
                </Billboard.Dataset>
              </Billboard.Chart>
            </Billboard>
          </div>
        </section>

        {/* Bar Charts Examples */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
            <Billboard type="bar">
              <Billboard.Chart className="h-[300px]">
                <Billboard.Dataset
                  name="Traffic"
                  color={getRandomColor()} // This will be used for all bars
                  data={trafficSources.map((source) => ({
                    x: source.x,
                    y: source.y,
                    color: source.color,
                  }))}
                />
              </Billboard.Chart>
            </Billboard>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Devices</h2>
            <Billboard
              type="bar"
              options={{}}>
              <Billboard.Chart className="h-[300px]">
                <Billboard.Dataset name="Devices">
                  {deviceData.map((device) => (
                    <Billboard.Datapoint
                      key={device.x}
                      x={device.x}
                      y={device.y}
                      color={getRandomColor()}
                      style={{
                        color: getRandomColor(),
                        fill: getRandomColor(),
                      }}
                    />
                  ))}
                </Billboard.Dataset>
              </Billboard.Chart>
            </Billboard>
          </div>
        </section>

        {/* API Examples Section */}
        <details className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <summary className="text-xl font-bold">Billboard Usage Examples</summary>

          <div className="prose max-w-none pt-6">
            <h3 className="text-lg font-semibold mb-4">Props-based Usage</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {`<Billboard 
  type="line"
  datasets={[{
    name: "Visitors",
    data: weeklyData,
    color: "#4299E1",
    style: { strokeWidth: 2 }
  }]}
>
  <Billboard.Chart className="h-[300px]" />
</Billboard>`}
            </pre>

            <h3 className="text-lg font-semibold mt-8 mb-4">Component-based Usage</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {`<Billboard type="line">
  <Billboard.Chart className="h-[300px]">
    <Billboard.Dataset name="Visitors" color="#4299E1">
      <Billboard.Datapoint x="Jan" y={1000} />
      <Billboard.Datapoint x="Feb" y={1500} />
    </Billboard.Dataset>
  </Billboard.Chart>
</Billboard>`}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
};

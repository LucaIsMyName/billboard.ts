# Billboard Chart Library Documentation

Billboard is a React component library that provides a declarative, component-based API for creating charts using Highcharts. It offers both a prop-based and component-based approach to chart creation, with full TypeScript support.

## Installation

```bash
npm install react-billboard highcharts highcharts-react-official
```

## Basic Usage

```tsx
import { Billboard } from 'react-billboard';

// Simple usage with props
const SimpleChart = () => (
  <Billboard 
    type="line"
    datasets={[
      {
        name: "Revenue",
        data: [
          { x: "Jan", y: 1000 },
          { x: "Feb", y: 1500 }
        ]
      }
    ]}
  />
);

// Component-based usage
const ComponentChart = () => (
  <Billboard type="line">
    <Billboard.Title>Monthly Revenue</Billboard.Title>
    <Billboard.Chart>
      <Billboard.Dataset name="Revenue">
        <Billboard.Datapoint x="Jan" y={1000} />
        <Billboard.Datapoint x="Feb" y={1500} />
      </Billboard.Dataset>
    </Billboard.Chart>
  </Billboard>
);
```

## Component API

### `<Billboard>`

The main container component for creating charts.

#### Props

- `type` (required): The type of chart to render
  - Options: 'line' | 'area' | 'bar' | 'scatter' | 'pie' | 'donut' | 'bubble'
- `datasets`: Array of dataset objects (for prop-based usage)
- `className`: CSS class name for styling
- `children`: React nodes (for component-based usage)

### `<Billboard.Title>`

Renders the chart title.

#### Props
- `children`: React node (string or element)
- `className`: CSS class name for styling

### `<Billboard.Description>`

Renders a description below the title.

#### Props
- `children`: React node (string or element)
- `className`: CSS class name for styling

### `<Billboard.Chart>`

The chart container component.

#### Props
- `className`: CSS class name for styling
- `x`: X-axis configuration object
  ```typescript
  {
    title?: string;
    min?: number;
    max?: number;
  }
  ```
- `y`: Y-axis configuration object (same structure as x)
- `children`: Dataset components

### `<Billboard.Dataset>`

Container for data points.

#### Props
- `name`: Dataset name (required)
- `color`: Color for the dataset series
- `data`: Array of data points (for prop-based usage)
- `children`: Datapoint components

### `<Billboard.Datapoint>`

Individual data point component. Must be a child of Dataset.

#### Props
- `x`: X value (string or number)
- `y`: Y value (number)
- `z`: Z value (for bubble charts)
- `name`: Point name (for pie charts)
- `color`: Individual point color

### `<Billboard.Legend>`

Renders the chart legend.

#### Props
- `className`: CSS class name for styling

## Examples

### Line Chart
```tsx
<Billboard type="line">
  <Billboard.Title>Monthly Revenue</Billboard.Title>
  <Billboard.Description>Financial performance over time</Billboard.Description>
  <Billboard.Chart 
    className="h-96"
    y={{ title: "Amount ($)" }}
    x={{title: "Years"}}
  >
    <Billboard.Dataset name="Revenue" color="#4299E1">
      <Billboard.Datapoint x="Jan" y={1000} />
      <Billboard.Datapoint x="Feb" y={1500} />
      <Billboard.Datapoint x="Mar" y={1200} />
    </Billboard.Dataset>
  </Billboard.Chart>
  <Billboard.Legend />
</Billboard>
```

### Pie Chart
```tsx
<Billboard type="pie">
  <Billboard.Chart className="h-96">
    <Billboard.Dataset name="Market Share">
      <Billboard.Datapoint name="Product A" y={35} />
      <Billboard.Datapoint name="Product B" y={25} />
      <Billboard.Datapoint name="Product C" y={20} />
    </Billboard.Dataset>
  </Billboard.Chart>
</Billboard>
```

### Bubble Chart
```tsx
<Billboard type="bubble">
  <Billboard.Chart 
    className="h-96"
    x={{ title: "Price" }}
    y={{ title: "Performance" }}
  >
    <Billboard.Dataset name="Products">
      <Billboard.Datapoint x={50} y={70} z={15} name="Product A" />
      <Billboard.Datapoint x={65} y={85} z={20} name="Product B" />
    </Billboard.Dataset>
  </Billboard.Chart>
</Billboard>
```

### Mixed Usage (Props and Components)
```tsx
const data = [
  { x: "Jan", y: 1000 },
  { x: "Feb", y: 1500 }
];

<Billboard type="line">
  <Billboard.Title>Mixed Usage Example</Billboard.Title>
  <Billboard.Dataset 
    name="Revenue"
    data={data}  // Using props
  />
  <Billboard.Dataset name="Profit">  // Using components
    <Billboard.Datapoint x="Jan" y={300} />
    <Billboard.Datapoint x="Feb" y={450} />
  </Billboard.Dataset>
</Billboard>
```

## TypeScript Types

```typescript
type ChartType = 'line' | 'area' | 'scatter' | 'bar' | 'donut' | 'pie' | 'bubble';

interface AxisOptions {
  title?: string;
  min?: number;
  max?: number;
}

interface DataPoint {
  x: number | string;
  y: number;
  z?: number;
  name?: string;
  color?: string;
}

interface Dataset {
  name: string;
  data: DataPoint[];
  color?: string;
}
```

## Styling

All components accept a `className` prop for styling using CSS. The library is designed to be style-agnostic, allowing for complete customization of the appearance.

```tsx
<Billboard className="my-8 p-4 bg-white rounded shadow">
  <Billboard.Title className="text-2xl font-bold text-gray-800">
    Styled Chart
  </Billboard.Title>
  <Billboard.Chart className="h-96 mt-4" />
</Billboard>
```

## Best Practices

1. Always wrap `<Billboard.Datapoint>` components within a `<Billboard.Dataset>`
2. Provide explicit dimensions through className (especially height)
3. Use axis titles for better chart clarity
4. Provide meaningful colors for data visualization
5. Use the Legend component when multiple datasets are present

## Limitations

1. Datapoints must be children of Dataset components
2. Some chart types (bubble, scatter) require additional Highcharts modules
3. Custom chart types are not yet supported
4. Animation customization is limited
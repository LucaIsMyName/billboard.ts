# Billboard Chart Library

Billboard is a React component library that provides a declarative, component-based API for creating charts using Recharts. It offers both a props-based and component-based approach, making it flexible for different usage patterns while maintaining a consistent API.

## Installation

```bash
npm install react-billboard
```

## Usage Examples

### Props-based Approach
```tsx
import { Billboard } from 'react-billboard';

const MyChart = () => (
  <Billboard 
    type="line"
    datasets={[{
      name: "Revenue",
      data: [
        { x: "Jan", y: 1000 },
        { x: "Feb", y: 1500 },
        { x: "Mar", y: 1200 }
      ],
      color: "#4299E1",
      style: {
        strokeWidth: 2,
        dot: true,
      }
    }]}
  >
    <Billboard.Chart className="h-[400px]" />
  </Billboard>
);
```

### Component-based Approach
```tsx
const MyComponentChart = () => (
  <Billboard type="line">
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
      </Billboard.Dataset>
    </Billboard.Chart>
  </Billboard>
);
```

### Area Chart with Multiple Datasets
```tsx
const MyAreaChart = () => (
  <Billboard type="area">
    <Billboard.Chart className="h-[400px]">
      <Billboard.Dataset
        name="Revenue"
        color="#4299E1"
        style={{
          fillOpacity: 0.3,
          strokeWidth: 2,
        }}
        data={[
          { x: "Jan", y: 1000 },
          { x: "Feb", y: 1500 },
          { x: "Mar", y: 1200 }
        ]}
      />
      <Billboard.Dataset
        name="Profit"
        color="#48BB78"
        style={{
          fillOpacity: 0.3,
          strokeWidth: 2,
        }}
        data={[
          { x: "Jan", y: 300 },
          { x: "Feb", y: 450 },
          { x: "Mar", y: 350 }
        ]}
      />
    </Billboard.Chart>
  </Billboard>
);
```

## Component API

### `<Billboard>`

Main container component for creating charts.

#### Props
- `type` (required): `'line' | 'area' | 'bar' | 'scatter' | 'pie'`
- `datasets?`: Array of dataset objects (for props-based usage)
- `className?`: CSS class name
- `children?`: React nodes

### `<Billboard.Chart>`

Chart container component.

#### Props
- `className?`: CSS class name (required for setting height)
- `x?`: X-axis configuration
  ```typescript
  {
    title?: string;
    min?: number;
    max?: number;
  }
  ```
- `y?`: Y-axis configuration (same as x)
- `children?`: Dataset components

### `<Billboard.Dataset>`

Dataset container component.

#### Props
- `name`: Dataset identifier
- `color?`: Dataset color
- `data?`: Array of data points
- `style?`: Dataset styling options
  ```typescript
  {
    strokeWidth?: number;
    fillOpacity?: number;
    dot?: boolean;
  }
  ```
- `children?`: Datapoint components

### `<Billboard.Datapoint>`

Individual data point component. Must be a child of Dataset.

#### Props
- `x`: X value (string | number)
- `y`: Y value (number)
- `color?`: Point color
- `style?`: Point-specific styling

## TypeScript Types

```typescript
type ChartType = 'line' | 'area' | 'bar' | 'scatter' | 'pie';

interface DataPoint {
  x: string | number;
  y: number;
  color?: string;
}

interface DatasetStyle {
  strokeWidth?: number;
  fillOpacity?: number;
  dot?: boolean;
}

interface Dataset {
  name: string;
  data: DataPoint[];
  color?: string;
  style?: DatasetStyle;
}
```

## Styling

The library uses Recharts under the hood and supports two types of styling:

1. Container styling through className props
```tsx
<Billboard.Chart className="h-[400px] w-full" />
```

2. Chart-specific styling through the style prop
```tsx
<Billboard.Dataset
  style={{
    strokeWidth: 2,
    fillOpacity: 0.3,
    dot: true
  }}
/>
```

## Best Practices

1. Always provide a fixed height via className on Billboard.Chart
2. Use consistent colors across related datasets
3. For area charts, use fillOpacity for better visualization
4. When using Datapoints, always place them inside a Dataset
5. Use meaningful names for datasets to populate the legend

## Limitations

1. The library currently supports basic chart types from Recharts
2. Custom Recharts components must be added through the base Billboard props
3. Some Recharts features require direct props configuration
4. Animation options are inherited from Recharts defaults

## Browser Support

Supports all modern browsers that support SVG and React.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
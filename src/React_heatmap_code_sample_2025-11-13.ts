import React, { useState } from 'react';

interface HeatmapData {
  x: number;
  y: number;
  value: number;
}

const generateHeatmapData = (width: number, height: number, count: number): HeatmapData[] => {
  const data: HeatmapData[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const value = Math.random();
    data.push({ x, y, value });
  }
  return data;
};

interface HeatmapProps {
  width: number;
  height: number;
  data: HeatmapData[];
}

const Heatmap: React.FC<HeatmapProps> = ({ width, height, data }) => {
  const cellSize = 10;
  const maxIntensity = Math.max(...data.map(d => d.value));

  const getColor = (value: number): string => {
    const intensity = value / maxIntensity;
    const red = Math.floor(255 * intensity);
    const green = Math.floor(255 * (1 - intensity));
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <svg width={width * cellSize} height={height * cellSize}>
      {data.map((d, index) => (
        <rect
          key={index}
          x={d.x * cellSize}
          y={d.y * cellSize}
          width={cellSize}
          height={cellSize}
          fill={getColor(d.value)}
        />
      ))}
    </svg>
  );
};

const App: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>(generateHeatmapData(50, 50, 200));

  return (
    <div>
      <Heatmap width={50} height={50} data={heatmapData} />
      <button onClick={() => setHeatmapData(generateHeatmapData(50, 50, 200))}>Regenerate</button>
    </div>
  );
};

export default App;
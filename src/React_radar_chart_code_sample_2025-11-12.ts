import React, { useRef, useEffect } from 'react';
import { Chart, registerables, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

Chart.register(...registerables, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
  options?: any;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    if (!chartCanvas) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartCanvas, {
      type: 'radar',
      data: data,
      options: options || {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default RadarChart;
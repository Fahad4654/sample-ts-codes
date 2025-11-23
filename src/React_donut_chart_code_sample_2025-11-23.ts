import React, { useRef, useEffect } from 'react';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size: number;
  innerRadiusRatio?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, size, innerRadiusRatio = 0.6 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    const innerRadius = radius * innerRadiusRatio;

    let total = data.reduce((acc, curr) => acc + curr.value, 0);
    let startAngle = 0;

    const createArc = (dataPoint: { value: number; color: string }) => {
      const angle = (dataPoint.value / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + innerRadius * Math.cos(startAngle);
      const y4 = centerY + innerRadius * Math.sin(startAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;

      startAngle = endAngle;

      return <path key={dataPoint.color} d={d} fill={dataPoint.color} />;
    };

    const arcs = data.map(createArc);

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    arcs.forEach(arc => svg.appendChild(arc));

  }, [data, size, innerRadiusRatio]);

  return (
    <svg ref={svgRef} width={size} height={size} />
  );
};

export default DonutChart;
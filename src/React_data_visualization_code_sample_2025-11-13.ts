import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

const generateData = (count: number): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    data.push({ x: i, y: Math.random() * 100 });
  }
  return data;
};


const LineChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>(generateData(20));
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y) || 100]).range([innerHeight, 0]);

    const line = d3.line<DataPoint>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));

    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale));

  }, [data]);


  return (
    <div>
      <svg width={500} height={300} ref={svgRef}></svg>
      <button onClick={() => setData(generateData(20))}>Update Data</button>
    </div>
  );
};

export default LineChart;
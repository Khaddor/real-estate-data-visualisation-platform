import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';

const BarChart = () => {
  const ref = useRef(null);

  const sampleData = [
    { date: '2019-01-01T13:46:56+00:00', nombreVente: 150 },
    { date: '2019-01-02T13:46:56+00:00', nombreVente: 126 },
    { date: '2019-01-03T13:46:56+00:00', nombreVente: 397 },
    { date: '2019-01-04T13:46:56+00:00', nombreVente: 600 },
    { date: '2019-01-05T13:46:56+00:00', nombreVente: 78 },
  ];

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Clear existing content in the container
    d3.select(container).selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Draw bars using the sampleData
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(sampleData.map(d => d.date));

    const y = d3.scaleLinear()
      .domain([0, d3.max(sampleData, d => d.nombreVente)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.selectAll(".bar")
      .data(sampleData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.date))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.nombreVente))
      .attr("height", d => height - y(d.nombreVente))
      .attr("fill", "#69b3a2");
  }, [sampleData]);

  return (
    <div className="BarChart" ref={ref}></div>
  );
}

export default BarChart;

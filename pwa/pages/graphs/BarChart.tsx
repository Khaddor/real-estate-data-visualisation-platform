import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';

export const fetchDataFromAPI = async (interval, startDate, endDate) => {
  try {
    const response = await fetch(`https://localhost/nombreVentes/${interval}/${startDate}/${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log('Data not found!');
      return [];
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.error("Invalid data format:", rawData);
      return [];
    }

    console.log('rawData', rawData);

    return rawData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const BarChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const newChartData = await fetchDataFromAPI("jour", "2022-01-01", "2022-01-07");
        setChartData(newChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const chartContainer = chartRef.current;
    if (!chartContainer) return;

    // Clear existing content in the container
    d3.select(chartContainer).selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Draw bars using the fetched data
    const xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(chartData.map(d => d.date));

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.nombreVente)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(yScale));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.date))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d.nombreVente))
      .attr("height", d => height - yScale(d.nombreVente))
      .attr("fill", "#69b3a2");
  }, [chartData]);

  return (
    <div className="CustomBarChart" ref={chartRef}></div>
  );
}

export default BarChart;

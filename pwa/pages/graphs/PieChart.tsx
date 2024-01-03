import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

interface SalesData {
  region: string;
  nombreVente: number;
}

interface PieChartProps {
  data: SalesData[];
}

const PieChart1: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Invalid data format:", data);
      return;
    }

    const width = 450;
    const height = 450;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear the SVG if it exists
    d3.select(svgRef.current).select("svg").remove();

    // Append the svg object to the div
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.region))
      .range(d3.schemeCategory10);

    const pie = d3
      .pie<SalesData>()
      .sort(null)
      .value((d) => d.nombreVente);

    const data_ready = pie(data);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<SalesData>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);

    // Build the pie chart
    svg
      .selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.region))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add labels
    svg
      .selectAll("text")
      .data(data_ready)
      .join("text")
      .text((d) => `${d.data.region} (${d.data.nombreVente}%)`)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 4);
  }, [data]); // Only re-run the effect if `data` changes

  return (
    <div>
      <div ref={svgRef}></div>
    </div>
  );
};

const PieChart = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [year, setYear] = useState("2018");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost/ventes_par_region/${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Data not found");
        }

        const result = await response.json();
        console.log("result Data:", result);

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div>
      <h1>Pie Chart</h1>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="2018">2018 data</option>
        <option value="2019">2019 data</option>
        <option value="2021">2021 data</option>
        <option value="2022">2022 data</option>
        <option value="2023">2023 data</option>
      </select>
      <PieChart1 data={data} />
    </div>
  );
};

export default PieChart;

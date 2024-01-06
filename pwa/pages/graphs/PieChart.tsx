import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

interface VentesData {
  region: string;
  nombreVente: number;
}

interface PieChartProps {
  data: VentesData[];
}

const PieChart1: React.FC<PieChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Calculate total sales
  const totalSales = data.reduce(
    (sum, { nombreVente }) => sum + nombreVente,
    0
  );

  // Add a salesPercentage property to each region's data
  const dataWithPercentages = data.map((item) => ({
    ...item,
    salesPercentage: ((item.nombreVente / totalSales) * 100).toFixed(2), // Keep two decimals and convert to string
  }));

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Invalid data format:", data);
      return;
    }

    const width = 1000;
    const height = 600;
    const margin = 30;
    const radius = Math.min(width, height) / 2 - margin;

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

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
      .pie<VentesData>()
      .sort(null)
      .value((d) => d.salesPercentage);

    const data_ready = pie(dataWithPercentages);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<VentesData>>()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);

    svg
      .selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d, i) => color(d.data.region))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", (d, i) => 0.7);

    // Add lines and labels
    const lines = svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d) {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        // Add the percentage to the label text
        return `${d.data.salesPercentage}%`;
      })
      .attr("transform", function (d) {
        const pos = arc.centroid(d); // Place the labels at the centroid of each slice
        return `translate(${pos})`;
      })
      .style("text-anchor", "middle") // Center-align the labels
      .style("font-size", "12px") // Adjust font size as needed
      .style("fill", "black");

    const labels = svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        return d.data.region;
      })
      .attr("transform", function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d) {
        console.log(d.data.key);
        return d.data.key;
      })
      .attr("transform", function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      });
  }, [data]); // Only re-run the effect if `data` changes

  return (
    <div className="relative">
      <div className="w-full h-full" ref={svgRef}></div>
    </div>
  );
};

const PieChart = () => {
  const [data, setData] = useState<VentesData[]>([]);
  const [year, setYear] = useState("2018");
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h1>Pie Chart</h1>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="2018">2018 data</option>
        <option value="2019">2019 data</option>
        <option value="2021">2021 data</option>
        <option value="2022">2022 data</option>
        <option value="2023">2023 data</option>
      </select>
      {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : (
        <PieChart1 data={data} className="px-8" />
      )}
    </div>
  );
};

export default PieChart;

import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

interface DataPoint {
  date: string;
  averagePrice: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Ensure data is available and is in the expected format
    if (!Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return;
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse data and set scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    data.forEach(d => {
      d.averagePrice = +d.averagePrice; // Convert averagePrice to number
    });

    console.log("Parsed Dates:", data.map(d => new Date(d.date))); // Log parsed dates

    x.domain(d3.extent(data, d => new Date(d.date) as Date) as [Date, Date]);
    y.domain([0, d3.max(data, d => d.averagePrice) as number]);

    // Create line function
    const line = d3.line<DataPoint>()
      .x(d => x(new Date(d.date) as Date))
      .y(d => y(d.averagePrice));

    // Add X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue");
  }, [data]);

  return <div ref={svgRef}></div>;
};

const LineChartComponent = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost/prix_moyen_par_mois?page=1");
        if (!response.ok) {
          throw new Error("Data not found");
        }

        const result = await response.json();
        const rawData = result['hydra:member'];
        console.log("Raw Data:", rawData);
        setData(rawData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LineChart data={data} />
      )}
    </div>
  );
};

export default LineChartComponent;

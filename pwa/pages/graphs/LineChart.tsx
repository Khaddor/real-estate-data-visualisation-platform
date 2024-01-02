import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

interface DataPoint {
  date: string;
  prixMoyen: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    // Ensure data is available and is in the expected format
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Invalid data format:", data);
      return;
    }

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 50 }; // Increased bottom margin for Y-axis labels
    const width = 1000 - margin.left - margin.right;
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
      d.prixMoyen = +d.prixMoyen; // Convert averagePrice to number
    });

    console.log("Parsed Dates:", data.map(d => new Date(d.date))); // Log parsed dates

    x.domain(d3.extent(data, d => new Date(d.date) as Date) as [Date, Date]);
    y.domain([0, d3.max(data, d => d.prixMoyen) as number]);

    // Create line function
    const line = d3.line<DataPoint>()
      .x(d => x(new Date(d.date) as Date))
      .y(d => y(d.prixMoyen));

    // Add X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y Axis with grid lines
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ""))
      .call(g => g.selectAll(".tick line").attr("stroke-opacity", 0.1));

    // Add Y Axis labels
    svg.append("g")
    .selectAll("text")
    .data(y.ticks(5))
    .enter().append("text")
    .attr("transform", d => `translate(-10, ${y(d)})`)
    .attr("dy", -2)
    .style("font-size", "10px") // Adjust font size
    .style("text-anchor", "end")
    .text(d => (d / 1000).toFixed(2) + "k");

    // Add the line with increased thickness and transition
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .on("mouseover", () => {
        setTooltipVisible(true);
        d3.select(".line").attr("stroke", "blue").attr("stroke-width", 5); // Change color and thickness on hover
      })
      .on("mousemove", showTooltip)
      .on("mouseout", () => {
        setTooltipVisible(false);
        d3.select(".line").attr("stroke", "steelblue").attr("stroke-width", 3); // Revert to original color and thickness
      })
      .transition() // Add transition
      .duration(2000) // Adjust duration as needed
      .ease(d3.easeLinear)
      .attr("d", line);

      function showTooltip(event: MouseEvent) {
        if (!tooltipRef.current) return;
      
        const bisectDate = d3.bisector<DataPoint, Date>((d: DataPoint) => new Date(d.date) as Date).left;
        const mouseX = d3.pointer(event)[0];
        const invertedX = x.invert(mouseX);
      
        const index = bisectDate(data, invertedX, 1);
        const dataPoint = data[index];
      
        if (!dataPoint) return;
      
        const formatTime = d3.timeFormat("%Y-%m");
      
        const tooltipContent = `<strong>Date:</strong> ${formatTime(new Date(dataPoint.date))}<br/><strong>Average Price:</strong> ${(dataPoint.prixMoyen / 1000).toFixed(2)}K`;
      
        tooltipRef.current.innerHTML = tooltipContent;
      
        // Position the tooltip close to the mouse
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const tooltipHeight = tooltipRef.current.offsetHeight;
        tooltipRef.current.style.top = `${event.clientY - tooltipHeight}px`;
        tooltipRef.current.style.left = `${event.clientX - tooltipWidth / 2}px`;
      }
      
  }, [data]);

  return (
    <div className="relative">
      <div ref={tooltipRef} className={`absolute bg-white border border-gray-300 p-2 rounded-md shadow-md ${tooltipVisible ? 'visible' : 'invisible'}`} />
      <div className="w-full h-full" ref={svgRef}></div>
    </div>
  );
};

const LineChartComponent = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost/prix_moyen_par_mois`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

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
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      {loading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : (
        <LineChart data={data} />
      )}
    </div>
  );
};

export default LineChartComponent;

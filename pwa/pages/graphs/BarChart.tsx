// Commit message: Initial empty BarChart with D3 JS
// Commit code:
import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';

const BarChart = () => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }, []);

  return (
    <div className="BarChart" ref={ref}>Barchart</div>
  );
}

export default BarChart;

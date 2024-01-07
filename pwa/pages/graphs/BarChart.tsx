import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import * as d3 from 'd3';

interface BarChartData {
  date: string;
  nombreVente: number;
}

interface TooltipRef extends HTMLDivElement {
  style: {
    top: string;
    left: string;
    visibility: string;
  };
  innerHTML: string;
}

export const fetchDataFromAPI = async (interval: string, startDate: string, endDate: string): Promise<BarChartData[]> => {
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

    const rawData: BarChartData[] = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.error("Invalid data format:", rawData);
      return [];
    }
    console.log('rawdata', rawData);

    return rawData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const BarChart: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<TooltipRef>({ current: null });

  const sampleData: BarChartData[] = [
    // ... (unchanged)
  ];

  const [data, setData] = useState<BarChartData[]>(sampleData);
  const [interval, setInterval] = useState<string>("jour");
  const [dateDebut, setDateDebut] = useState<string>("2019-01-01");
  const [dateFin, setDateFin] = useState<string>("2019-01-07");
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const newData = await fetchDataFromAPI(interval, dateDebut, dateFin);
        const dt = newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setData(dt);
        setUpdated(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (shouldFetchData) {
      setLoading(true);
      fetchData();
      setShouldFetchData(false);
    }

    if (updated) {
      drawChart();
      setUpdated(false);
    }
  }, [shouldFetchData, updated, interval, dateDebut, dateFin]);

  const drawChart = (): void => {
    const container = ref.current;
    if (!container) return;

    d3.select(container).select("svg").remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const max = Math.max(...data.map(o => o.nombreVente)) * 1.2;
    const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.date.substring(0, 10)))
      .padding(0.2);

    const xAxis = d3.axisBottom(x);

    // Conditionally set x-axis tick values for better readability
    if (interval === "jour" && data.length > 20) {
      xAxis.tickValues([]); // Set empty array for tick values
    }

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const bars = svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.date.substring(0, 10)) || 0;
      })
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#dde5b6")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#adc178");
        handleMouseOver(event, d);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#dde5b6");
        handleMouseOut();
      });

    bars.transition()
      .duration(800)
      .attr("y", function (d) {
        return y(d.nombreVente);
      })
      .attr("height", function (d) {
        return height - y(d.nombreVente);
      })
      .delay(function (d, i) {
        return (i * 500);
      });

    function handleMouseOver(event, d) {
      const tooltipContent = `<strong>Date:</strong> ${d.date.substring(0, 10)}<br/><strong>Nombre Vente:</strong> ${d.nombreVente}`;
      tooltipRef.current.innerHTML = tooltipContent;
      tooltipRef.current.style.top = `${event.clientY - 100}px`;
      tooltipRef.current.style.left = `${event.clientX - 600}px`;
      tooltipRef.current.style.visibility = "visible";
    }

    function handleMouseOut(): void {
      tooltipRef.current!.style.visibility = "hidden";
    }
  };


  const handleIntervalChange = event => {
    setInterval(event.target.value);
    setShouldFetchData(true);
  };

  const handleDateDebutChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDateDebut(event.target.value);
    setShouldFetchData(true);
  };

  const handleDateFinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDateFin(event.target.value);
    setShouldFetchData(true);
  };

  return (
    <div className="BarChart" ref={ref} style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div ref={tooltipRef} style={{ position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', padding: '8px', borderRadius: '8px', visibility: 'hidden' }}></div>

      <p>
        <label style={{ marginRight: '10px' }}>Choisissez un intervalle </label>
        <select name="sort" id="intervalle" onChange={handleIntervalChange} style={{ padding: '8px', fontSize: '16px' }}>
          <option value="jour">Jour</option>
          <option value="mois">Mois</option>
          <option value="annee">Année</option>
        </select>
      </p>

      <p>
        <label style={{ marginRight: '10px' }}>Date de début </label>
        <input type="date" id="DateStart" defaultValue="2019-01-01" min="2018-07-01" max="2023-06-30" onChange={handleDateDebutChange} style={{ padding: '8px', fontSize: '16px' }} />
      </p>

      <p>
        <label style={{ marginRight: '10px' }}>Date de fin </label>
        <input type="date" id="DateEnd" defaultValue="2019-01-07" min="2018-07-01" max="2023-06-30" onChange={handleDateFinChange} style={{ padding: '8px', fontSize: '16px' }} />
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
};

export default BarChart;

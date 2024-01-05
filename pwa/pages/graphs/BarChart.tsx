import React, { useEffect, useRef, useState } from "react";
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
    console.log('rawdata', rawData);

    return rawData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const BarChart = () => {
  const ref = useRef(null);
  const tooltipRef = useRef(null);

  const sampleData = [
    { date: '2019-01-01T13:46:56+00:00', nombreVente: 150 },
    { date: '2019-01-02T13:46:56+00:00', nombreVente: 126 },
    { date: '2019-01-03T13:46:56+00:00', nombreVente: 397 },
    { date: '2019-01-04T13:46:56+00:00', nombreVente: 600 },
    { date: '2019-01-05T13:46:56+00:00', nombreVente: 78 },
    { date: '2019-01-06T14:09:58+00:00', nombreVente: 1 },
    { date: '2019-01-07T14:09:58+00:00', nombreVente: 473 },
  ];

  const [data, setData] = useState(sampleData);
  const [interval, setInterval] = useState("jour");
  const [dateDebut, setDateDebut] = useState("2019-01-01");
  const [dateFin, setDateFin] = useState("2019-01-07");
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await fetchDataFromAPI(interval, dateDebut, dateFin);
        const dt = newData.sort((a: any, b: any) => new Date(a.date) - new Date(b.date));
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

  const drawChart = () => {
    const container = ref.current;
    if (!container) return;

    d3.select(container).select("svg").remove();

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
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
      .domain(
        data.map(function (d: any) {
          return d.date.substring(0, 10);
        })
      )
      .padding(0.2);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const bars = svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.date.substring(0, 10));
      })
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#dde5b6")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "#adc178"); // Change color on hover for the bar
        handleMouseOver(event, d); // Call the custom mouseover function
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#dde5b6"); // Revert to original color on mouseout for the bar
        handleMouseOut(); // Call the custom mouseout function
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
        return (i * 100);
      });

    function handleMouseOver(event, d) {
      const formatTime = d3.timeFormat("%Y-%m-%d");
      const tooltipContent = `<strong>Date:</strong> ${formatTime(new Date(d.date))}<br/><strong>Nombre Vente:</strong> ${d.nombreVente}`;
      tooltipRef.current.innerHTML = tooltipContent;
      tooltipRef.current.style.top = `${event.clientY - 100}px`;
      tooltipRef.current.style.left = `${event.clientX -600  }px`;
      tooltipRef.current.style.visibility = "visible";
    }

    function handleMouseOut() {
      tooltipRef.current.style.visibility = "hidden";
    }
  };

  const handleIntervalChange = event => {
    setInterval(event.target.value);
    setShouldFetchData(true);
  }

  const handleDateDebutChange = event => {
    setDateDebut(event.target.value);
    setShouldFetchData(true);
  }

  const handleDateFinChange = event => {
    setDateFin(event.target.value);
    setShouldFetchData(true);
  }

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

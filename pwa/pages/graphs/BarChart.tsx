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
        setLoading(true);
        const newData = await fetchDataFromAPI(interval, dateDebut, dateFin);
        setData(newData);
        setUpdated(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (shouldFetchData) {
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
    console.log("data", data);
    if (!container) return;

    d3.select(container).select("svg").remove();

    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var svg = d3.select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var max = Math.max(...data.map(o => o.nombreVente)) * 1.2;
    var y = d3.scaleLinear().domain([0, max]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(data.map(d => d.date));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Data
    var bars = svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.date);
      })
      .attr("width", x.bandwidth())
      .attr("y", height)  // Initial y position at the bottom
      .attr("height", 0)  // Initial height at 0
      .attr("fill", "#69b3a2");

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
    <div className="BarChart" ref={ref}>
      <p>
        <label>Choisissez un intervalle </label>
        <select name="sort" id="intervalle" onChange={handleIntervalChange}>
          <option value="jour">Jour</option>
          <option value="mois">Mois</option>
          <option value="annee">Année</option>
        </select>
      </p>

      <p>
        <label>Date de début </label>
        <input type="date" id="DateStart" defaultValue="2019-01-01" onChange={handleDateDebutChange}/>
      </p>

      <p>
        <label>Date de fin </label>
        <input type="date" id="DateEnd" defaultValue="2019-01-07" onChange={handleDateFinChange}/>
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

export default BarChart;

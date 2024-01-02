import React from "react";
import Head from "next/head";
import LineChartComponent from "./graphs/LineChart";

export default function Views() {
  return (
    <div>
      <Head>
        <title>Graphiques</title>
      </Head>
      <section className="home-section">
        <div className="home-content">
          <span className="text">Graphiques</span>
        </div>

        {/* Charts components */}

        {/* Line Chart */}
        <LineChartComponent />

      </section>
    </div>
  );
}

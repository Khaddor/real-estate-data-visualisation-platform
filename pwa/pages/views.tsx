import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import LineChartComponent from './graphs/LineChart';
import BarChartComponent from './graphs/BarChart';
import PieChart from './graphs/PieChart';
import Footer from "../components/Footer";

const Views = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChart, setActiveChart] = useState('line-chart');

  return (
    <div>
      <NavBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setActiveChart={setActiveChart}
      />

      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          className="card bg-base-100 shadow-xl p-6"
        >
          <div className="card-body">
            {/* Place the chart components here */}
            {activeChart === 'line-chart' && <LineChartComponent />}
            {activeChart === 'bar-chart' && <BarChartComponent />}
            {activeChart === 'pie-chart' && <PieChart />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Views;

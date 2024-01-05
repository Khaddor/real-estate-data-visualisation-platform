// Views.js
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import LineChartComponent from './graphs/LineChart';
import BarChartComponent from './graphs/BarChart';
import PieChart from './graphs/PieChart';

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
    {activeChart === 'line-chart' && <LineChartComponent/>}
    {activeChart === 'bar-chart' && <BarChartComponent/>}
    {activeChart === 'pie-chart' && <PieChart/>}
  </section>
</div>
);
};

export default Views;

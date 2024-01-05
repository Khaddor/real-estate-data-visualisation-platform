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
      <div className="bg-white">
      <NavBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setActiveChart={setActiveChart}
      />
      </div>
      <section>
        {activeChart === 'line-chart' && <LineChartComponent />}
        {activeChart === 'bar-chart' && <BarChartComponent />}
        {activeChart === 'pie-chart' && <PieChart />}
      </section>
    </div>
  );
};

export default Views;

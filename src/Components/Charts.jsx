import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Charts = ({ recipes }) => {
  const prepTimes = recipes.map(r => r.readyInMinutes);
  const titles = recipes.map(r => r.title);
  const typeCounts = {};

  recipes.forEach((r) => {
    r.dishTypes?.forEach((type) => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });

  const barData = {
    labels: titles,
    datasets: [
      {
        label: 'Prep Time (min)',
        data: prepTimes,
        backgroundColor: '#ffb347',
      },
    ],
  };

  const pieData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: 'Dish Type Count',
        data: Object.values(typeCounts),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#3ecf8e'],
      },
    ],
  };

  return (
    <div className="charts-container">
      <div className="chart-section">
        <h3>Recipe Prep Times</h3>
        <Bar data={barData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="chart-section">
        <h3>Dish Type Distribution</h3>
        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default Charts;

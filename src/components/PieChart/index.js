// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Hoàn thành', 'Đang làm', 'Bị trì hoãn'],
    datasets: [
      {
        data: [data?.completed, data?.inProgress, data?.delayed],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;

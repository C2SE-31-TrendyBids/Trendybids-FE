import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart } from 'chart.js'; // Import CategoryScale
import { LinearScale } from 'chart.js'; // Or any other custom scale
import { BarController, BarElement } from 'chart.js';
Chart.register(BarController, BarElement);
Chart.register(LinearScale);
Chart.register(CategoryScale);

const ChartBar = () => {
  const data = {
    labels: ['Mon', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Sun '],
    datasets: [
      {
        label: 'Auction Sessions',
        data: [25, 20, 15, 10, 5, 0, 20],
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
          },
          minBarLength: 30,
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            
          },
        },
      ],
    },
  };

  return (
    <div className=" " >
      <Bar data={data} options={options} style={{ height: "450px", width: "100%" }} />
    </div>
  );
};

export default ChartBar;
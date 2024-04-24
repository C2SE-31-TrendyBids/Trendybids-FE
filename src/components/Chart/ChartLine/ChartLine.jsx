import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart } from 'chart.js'; // Import CategoryScale
import { LinearScale } from 'chart.js'; // Or any other custom scale
import { LineController, LineElement, PointElement } from 'chart.js';

Chart.register(LineController, LineElement, PointElement); // Register Line chart components
Chart.register(LinearScale);
Chart.register(CategoryScale);

const ChartLine = () => {
  const data = {
    labels: ['Mon', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat ', 'Sun '],
    datasets: [
      {
        label: 'Auction Sessions',
        data: [25, 10, 15, 10, 5, 0, 20],
        backgroundColor: 'rgba(0, 71, 255, 0.2)', // Set semi-transparent blue for fill
        borderColor: '#007bff', // Keep blue for line color
        pointRadius: 5, // Adjust point size as desired
        pointHoverRadius: 7, // Adjust hover point size as desired
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
    <div className=" ">
      <Line data={data} options={options} style={{ height: "450px", width: "100%" }} />
    </div>
  );
};

export default ChartLine;

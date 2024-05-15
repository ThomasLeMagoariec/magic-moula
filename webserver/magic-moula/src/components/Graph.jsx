import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Magic Moula',
    },
  },
};

const labels = ['January','January','January','January', 'February', 'March', 'April', 'May', 'June', 'July'];

export function Graph(props) {
  const time = props["time"];
  for (let i = 0; i < 10; i++) {
    if (parseInt(time.slice(-2))-i < 0) {
      labels[i] = (parseInt(time.slice(0,2))-1)+time.slice(2,3)+String(parseInt(time.slice(-2))-i+60).padStart(2, '0');
    } else {
      labels[i] = time.slice(0,3)+String(parseInt(time.slice(-2))-i).padStart(2, '0');
    }
  }
  const slicehistory = props["history"].slice(-10);
  labels.reverse();
  const data = {
    labels,
    datasets: [
      {
        data: slicehistory,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}

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
import { Line } from 'react-chartjs-2'

interface GraphLabels{
  quantities: number[],
  profits: any[],
  cartLength: number
}


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
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },

  }
  


export default function LineGraph(props:GraphLabels){

    const labels = []

    for(let i = 1; i< props.cartLength; i++){
      labels.push(`Purchase ${i}`)
    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Quantities Sold',
            data: props.quantities,
            borderColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Total Profit',
            data: props.profits,
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      };

        return <Line data={data} options ={options}/>;
}
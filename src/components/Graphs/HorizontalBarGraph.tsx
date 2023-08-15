import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


interface GraphLabels{
    profits: any[],
    quantities: any[],
    cartLength: number,
    label: string
  }
  

export default function HorizontalBarGraph(props:GraphLabels){


    const labels = []

    for(let i = 1; i< props.cartLength; i++){
      labels.push(`Purchase ${i}`)
    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: "Quantities",
            data: props.quantities,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: "Profits",
            data: props.profits,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return(
        <Bar options = {options} data={data}/>
    )
}
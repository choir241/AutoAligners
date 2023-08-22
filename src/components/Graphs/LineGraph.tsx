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
import PaginatedButtons from "./PaginatedButtons"

interface GraphLabels {
  quantities: number[],
  profits: any[]
  cartLength: number,
  currentPage: number,
  setCurrentPage: (e: number) => void,
  rowsPerPage: number,
  startIndex: number,
  endIndex: number
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
      }
    },

  }
  


export default function LineGraph(props:GraphLabels){

    const labels = []

    for(let i = 1; i<= props.rowsPerPage; i++){
      labels.push(`Purchase ${i}`)
    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Quantities Sold',
            data: props.quantities.slice(props.startIndex, props.endIndex),
            borderColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Total Profit',
            data: props.profits.slice(props.startIndex, props.endIndex),
            borderColor: 'rgb(255, 99, 132)',
          },
        ],
      };

        return (
          <section>
            <PaginatedButtons cartLength = {props.cartLength} setCurrentPage = {(e:number)=>props.setCurrentPage(e)} rowsPerPage={props.rowsPerPage}/>
            <Line data={data} options ={options}/>
            <PaginatedButtons cartLength = {props.cartLength} setCurrentPage = {(e:number)=>props.setCurrentPage(e)} rowsPerPage={props.rowsPerPage}/>
          </section>
              )
}
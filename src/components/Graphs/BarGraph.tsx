
import {Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  
interface GraphLabels{
  quantities: number[],
  profits: any[],
  cartLength: number
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
  


export default function BarGraph(props:GraphLabels){

    const labels = []

    for(let i = 0; i< props.cartLength; i++){
      labels.push(`Label ${i}`)
    }

    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Quantities Sold',
            data: props.quantities,
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Total Profit',
            data: props.profits,
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ],
      };

        return <Bar data={data} />;
}
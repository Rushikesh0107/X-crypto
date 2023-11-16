import React from 'react'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const Chart = ({arr = [], currency, days}) => {

    const prices = [];
    const dates = [];

    for (let index = 0; index < arr.length; index++) {
        if(days === "24h") dates.push(new Date(arr[index][0]).toLocaleTimeString());
        else dates.push(new Date(arr[index][0]).toLocaleDateString());
        prices.push(arr[index][1])
        
    }

    const data = {  
        labels: dates,
        datasets: [{
            label: `Price (in ${currency.toUpperCase()})`,
            data: prices,
            borderColor: "#f3ba2f",
            backgroundColor: "#f3ba2f",
        }]
    }

  return (
    <Line 
    options={{
        responsive: true,
    }}

    data={data} 
    />
  )
}

export default Chart
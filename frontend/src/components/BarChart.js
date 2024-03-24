import React, {useEffect, useRef} from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BarChart = ({data}) => {

    const chartRef = useRef(null);

    useEffect(() => {
      return () => {  if (chartRef.current) {
            chartRef.current.chartInstance.destroy();
        }
    }
    }, []);

    const chartData = {
        labels: ['0-100','101-200','201-300','301-400','401-500','501-600','601-700','701-800','801-900','901 above'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: data 
            }
        ]
    };



    const chartOptions = {
       
        scales: {
            y: {
                beginAtZero: true 
            },
            x: {
                offset: true, 
                grid: {
                    display: false 
                }
            }
        }
    };

    return (
        <div className='barchart-dash'>
            <h2>Bar Chart</h2>
            <Bar
                ref={chartRef}
                data={chartData}
                options={chartOptions}
            />
        </div>
    );
};

export default BarChart;
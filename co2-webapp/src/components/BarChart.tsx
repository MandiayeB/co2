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
import { EmissionDTO } from '../models/EmissionDTO';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
    emissions: EmissionDTO[],
    country1: string,
    country2: string,
    date: string
}

interface BarChartState { }

class BarChart extends React.Component<BarChartProps, BarChartState> {
    render() {
        return (
            <Bar 
                options={{
                    responsive: true
                }} 
                data={{
                    labels: [this.props.date],
                    datasets: this.props.emissions.filter(emission => {
                        if (emission.place === this.props.country1 || emission.place === this.props.country2) {
                            return emission;
                        } else {
                            return null;
                        }
                    }).map((emission, i) => {
                        return {
                            label: emission.place,
                            data: [emission['Emission de CO2']],
                            backgroundColor: i ? '#6c33f1' : `#44ddc3`
                        }
                    }),
                }} 
            />
        );
    }
}

export default BarChart;
import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const stats = require('stats-lite');

class SeasonalDecompositionChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            observed: [],
            trend: [],
            seasonal: [],
            residual: []
        };
    }

    componentDidMount() {
        // Fetch data or read from a file
        this.fetchData();
    }

    fetchData() {
        // Simulating data fetch
        // Replace this with your actual data fetching logic
        const csvData = `Date,Open
        2023-01-01,100
        2023-01-02,120
        2023-01-03,150
        2023-01-04,180
        2023-01-05,200
        2023-01-06,220
        2023-01-07,240`;

        // Parse the CSV data
        const rows = csvData.trim().split('\n');
        const data = rows.slice(1).map(row => parseFloat(row.split(',')[1]));

        // Perform seasonal decomposition
        const { observed, trend, seasonal, residual } = this.seasonalDecompose(data, 2); // Change the period as needed

        // Update state with decomposition results
        this.setState({ data, observed, trend, seasonal, residual });
    }

    seasonalDecompose(data, period) {
        const observed = data;
        const trend = this.calculateTrend(data, period);
        const seasonal = observed.map((value, index) => value - trend[index % period]);
        const residual = observed.map((value, index) => value - trend[index % period] - seasonal[index]);
        return { observed, trend, seasonal, residual };
    }

    calculateTrend(data, period) {
        const trend = [];
        for (let i = 0; i < data.length; i++) {
            const start = Math.max(0, i - period + 1);
            const end = i;
            const sum = data.slice(start, end + 1).reduce((acc, val) => acc + val, 0);
            trend.push(sum / (end - start + 1));
        }
        return trend;
    }

    render() {
        const { observed, trend, seasonal, residual } = this.state;
        const chartData = observed.map((value, index) => ({
            name: `Day ${index + 1}`,
            Observed: value,
            Trend: trend[index],
            Seasonal: seasonal[index],
            Residual: residual[index]
        }));

        return (
            <div>
                <h1>Seasonal Decomposition</h1>
                <LineChart width={800} height={400} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Observed" name="Observed" stroke="blue" />
                    <Line type="monotone" dataKey="Trend" name="Trend" stroke="green" />
                    <Line type="monotone" dataKey="Seasonal" name="Seasonal" stroke="red" />
                    <Line type="monotone" dataKey="Residual" name="Residual" stroke="orange" />
                </LineChart>
            </div>
        );
    }
}

export default SeasonalDecompositionChart;

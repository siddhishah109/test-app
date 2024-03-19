import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class MovingAverageTrendChart extends React.Component {
    calculateMovingAverage = (data, windowSize) => {
        const movingAverageData = [];
        
        for (let i = 0; i < data.length; i++) {
            let sum = data[i].y;
            let count = 1;

            // Include previous points
            for (let j = 1; j <= windowSize && i - j >= 0; j++) {
                sum += data[i - j].y;
                count++;
            }

            // Include next points
            for (let j = 1; j <= windowSize && i + j < data.length; j++) {
                sum += data[i + j].y;
                count++;
            }

            // Calculate moving average
            movingAverageData.push({
                x: data[i].x,
                y: sum / count
            });
        }
        console.log("Moving Average Data:", movingAverageData)
        return movingAverageData;
    };

    render() {
        const data = [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
            // Add more data points as needed
        ];

        // Adjust windowSize as per your requirement
        const windowSize = 3 -1; // 3-point moving average

        const movingAverageData = this.calculateMovingAverage(data, windowSize);

        return (
            <LineChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" tickCount={data.length} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
                <Line type="monotone" data={movingAverageData} dataKey="y" stroke="#82ca9d" dot={false} />
            </LineChart>
        );
    }
}

export default MovingAverageTrendChart;



// // For a 1-point moving average:

// // At index 0: (2)
// // At index 1: (3)
// // At index 2: (5)
// // At index 3: (4)
// // At index 4: (6)
// // For a 2-point moving average:

// // At index 0: (2 + 3) / 2 = 2.5
// // At index 1: (2 + 3 + 5) / 3 = 3.3333
// // At index 2: (3 + 5 + 4) / 3 = 4
// // At index 3: (5 + 4 + 6) / 3 = 5
// // At index 4: (4 + 6) / 2 = 5
// // For a 3-point moving average:

// // At index 0: (2 + 3 + 5) / 3 = 3.3333
// // At index 1: (2 + 3 + 5 + 4) / 4 = 3.5
// // At index 2: (2 + 3 + 5 + 4 + 6) / 5 = 4
// // At index 3: (3 + 5 + 4 + 6) / 4 = 4.5
// // At index 4: (5 + 4 + 6) / 3 = 5

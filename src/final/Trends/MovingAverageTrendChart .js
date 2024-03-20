import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const MovingAverageTrendChart = ({ 
    data = [], 
    windowSize = 3, 
    width = 500, 
    height = 300, 
    originalLineColor = '#8884d8', 
    movingAverageLineColor = '#82ca9d', 
    originalLineName = 'Original',
    movingAverageLineName = 'Moving Average',
    xDataKey = 'x', 
    dataKey = 'y', 
    xLabel='',
    yLabel='',
    xAxisAngle=0,
    xAxisDx=0,
    xAxisDy=0,
    yAxisAngle=-90,
    yAxisDx=0,
    yAxisDy=0,
    showCartesianGrid = false,
    showXAxis = true,
    showYAxis = true,
    showTooltip = true,
    showLegend = true,
    originalLineProps = {},
    movingAverageLineProps = {},
    xAxisProps = {}, 
    yAxisProps = {}, 
    tooltipProps = {}, 
    legendProps = {},
    lineChartProps = {},
    dots=false
}) => {
    const calculateMovingAverage = (data, windowSize) => {
        const movingAverageData = [];
        
        for (let i = 0; i < data.length; i++) {
            let sum = data[i].y;
            let count = 1;

            for (let j = 1; j <= windowSize && i - j >= 0; j++) {
                sum += data[i - j].y;
                count++;
            }

            for (let j = 1; j <= windowSize && i + j < data.length; j++) {
                sum += data[i + j].y;
                count++;
            }

            movingAverageData.push({
                x: data[i].x,
                y: sum / count
            });
        }
        return movingAverageData;
    };

    const movingAverageData = calculateMovingAverage(data, windowSize - 1);

    return (
        <LineChart width={width} height={height} data={data} {...lineChartProps}>
            {showCartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey={xDataKey} label={{value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy}} {...xAxisProps} />} 
            {showYAxis && <YAxis   label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy}} {...yAxisProps} />} 
            {showTooltip && <Tooltip {...tooltipProps} />}
            {showLegend && <Legend {...legendProps} />} 
            <Line type="monotone" dataKey={dataKey} name={originalLineName} stroke={originalLineColor} dot={dots} {...originalLineProps} />
            <Line type="monotone" data={movingAverageData} dataKey={dataKey} name={movingAverageLineName} stroke={movingAverageLineColor} dot={dots} {...movingAverageLineProps} />
        </LineChart>
    );
}

export default MovingAverageTrendChart;

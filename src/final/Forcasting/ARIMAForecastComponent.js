import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ARIMAForecastComponent = ({
    data,
    width = 600,
    height = 300,
    xDataKey = 'x',
    dataKey = 'y',
    xLabel = '',
    yLabel = '',
    xAxisAngle = 0,
    xAxisDx = 0,
    xAxisDy = 0,
    yAxisAngle = -90,
    yAxisDx = 0,
    yAxisDy = 0,
    originalLineColor = '#8884d8',
    forecastLineColor = '#82ca9d',
    showYAxis = true,
    showTooltip = true,
    showLegend = true,
    showCartesianGrid = false,
    showXAxis = true,
    yAxisProps = {},
    tooltipProps = {},
    legendProps = {},
    lineChartProps = {},
    cartesianGridProps = {},
    xAxisProps = {},
    originalLineProps = {},
    forecastLineProps = {},
    showOriginalLine = true,
    originalLineName = 'Original',
    forecastLineName = 'ARIMA Forecast',
    dots = false,
    order = [1, 1, 1], 
    steps = 5, 
}) => {
    const [originalData, setOriginalData] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const fetchData = async () => {
                try {
                    const populationData = data.map(entry => entry[dataKey]);

                    const response = await axios.post('http://siddhishah.pythonanywhere.com/forecast/arima', {
                        data: populationData,
                        params: {
                            order: order,
                            steps: steps
                        }
                    });
                    console.log(response);
                    setOriginalData(data.map(entry => ({ [xDataKey]: entry[xDataKey], [originalLineName]: entry[dataKey] })));
                    setForecast(response.data.forecast.map((value, index) => ({ [xDataKey]: 'f' + (index + 1), [forecastLineName]: value })));
                    setLoaded(true);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [data, dataKey, xDataKey, originalLineName, forecastLineName, order, steps, loaded]);

    const chartData = [...originalData, ...forecast];

    return (
        <div>
            <LineChart width={width} height={height} data={chartData} {...lineChartProps}>
                {showCartesianGrid && <CartesianGrid {...cartesianGridProps} />}
                {showXAxis && <XAxis dataKey={xDataKey} label={{ value: xLabel, angle: xAxisAngle, dx: xAxisDx, dy: xAxisDy }} {...xAxisProps} />}
                {showYAxis && <YAxis label={{ value: yLabel, angle: yAxisAngle, dx: yAxisDx, dy: yAxisDy }} {...yAxisProps} />}
                {showTooltip && <Tooltip {...tooltipProps} />}
                {showLegend && <Legend {...legendProps} />}
                {showOriginalLine && <Line type="monotone" dataKey={originalLineName} stroke={originalLineColor} dot={dots} {...originalLineProps} />}
                <Line type="monotone" dataKey={forecastLineName} stroke={forecastLineColor} dot={dots} {...forecastLineProps} />
            </LineChart>
        </div>
    );
};

export default ARIMAForecastComponent;

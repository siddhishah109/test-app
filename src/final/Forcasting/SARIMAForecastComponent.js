import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SARIMAForecastComponent = ({
    data,
    width = 500,
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
    originalLineColor = '#1e1b75',
    forecastLineColor = '#992e3e',
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
    forecastLineName = 'Linear Trend',
    dots = false,
    order = [1, 1, 1], // Default order
    steps = 5, // Default steps
    seasonal_order = [0, 1, 1, 12], // Default seasonal_order
}) => {
    const [originalData, setOriginalData] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const populationData = data.map(entry => entry[dataKey]);

                const response = await axios.post('http://siddhishah.pythonanywhere.com/forecast/sarima', {
                    data: populationData,
                    params: {
                        order: order,
                        seasonal_order: seasonal_order,
                        steps: steps
                    }
                });
                console.log(response);
                setOriginalData(data.map(entry => ({ [xDataKey]: entry[xDataKey], [originalLineName]: entry[dataKey] })));
                setForecast(response.data.forecast.map((value, index) => ({ [xDataKey]: 'f' + (index + 1), [forecastLineName]: value })));
                setLoading(false); // Marking loading as false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Marking loading as false even if there's an error
            }
        };

        if (loading) {
            fetchData(); // Fetch data only if loading is true
        }
    }, [data, dataKey, xDataKey, originalLineName, forecastLineName, order, steps, seasonal_order, loading]);

    if (loading) {
        return <div>Loading...</div>; // Render loading indicator if data is being fetched
    }

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

export default SARIMAForecastComponent;

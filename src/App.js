import './App.css';
import OutlierIQRScatterChart from './final/outlier/OutlierIQRScatterChart ';
import ScatterPlot from './component/ScatterPlot';
import OutlierZScoreScatterChart from './final/outlier/OutlierZScoreScatterChart ';
import OutlierKNNScatterChart from './final/outlier/OutlierKNNScatterChart';
import TrendGraph from './component/TrendGraph';
import LinearTrendChart from './final/Trends/LinearTrendChart';
import MovingAverageTrendChart from './final/Trends/MovingAverageTrendChart ';
import SeasonalDecompositionChart from './component/SeasonalDecompositionChart ';
import ExponentialSmoothingChart from './final/Trends/ExponentialSmoothingChart ';
import ARIMAForecastComponent from './final/Forcasting/ARIMAForecastComponent';
import SARIMAForecastComponent from './final/Forcasting/SARIMAForecastComponent';
import ACFPlot from './final/TS model/ACFPlot';
import PACFPlot from './final/TS model/PACFPlot';
import AutocorrelationCoeff from './final/TS model/AutocorrelationCoeff';




function App() {
  const data = [
    { time: 0, population: 10 },
    { time: 1, population: 20 },
    { time: 2, population: 40 },
    { time: 3, population: 80 },
    { time: 4, population: 160 },
    // Add more data points as needed
];
const datas = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 10 },
  { x: 5, y: 6 }
];
const userProvidedData = [
  { time: "0ns", population: 10 },
  { time: "e1", population: 20 },
  { time: ' 2es', population: 40 },
  { time: '3e', population: 80 },
  { time: '4s', population: 160 }
];

const customData = [1, 2, 3, 4, 5]; // Custom data for the ACF plot

  const customBarFill = 'green';
  return (
<div className="App">
  <h2>Linear trend</h2>
<LinearTrendChart
        data={datas}
        dataKey="y"
        // lineColor="#1e1b75"
        // trendLineColor="#992e3e"
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
        tooltipProps={{ formatter: (value) => `$${value}` }}
        showOriginalLine={true}
        originalLineProps={{ strokeWidth: 1.5}}
      />


<h2>Moving Average Trend</h2>
<MovingAverageTrendChart
        data={datas}
        windowSize={3} 
        dataKey="y"
        // originalLineColor="#8884d8"
        // movingAverageLineColor="#82ca9d"
        showXAxis={true}
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
      />
<h2>Exponential Smoothing Trend</h2>

<ExponentialSmoothingChart data={data} alpha={0.3} xDataKey='time' dataKey='population'/>
<h2>Outlier by z-score</h2>

<OutlierZScoreScatterChart
  data={datas}
  keyX="x"
  keyY="y"
  threshold={1.3}
  // tooltipProps={{ cursor: 'pointer' }}
 
/>

<h2>Outlier by KNN</h2>
<OutlierKNNScatterChart
  data={datas}
  keyX="x"
  keyY="y"
  kNearest={3}
  threshold={5}
/>

<h2>Outlier by IQR</h2>
<OutlierIQRScatterChart
  data={datas}
  keyX="x"
  keyY="y"
  kFactor={0.4}
  tooltipProps={{ cursor: 'pointer' }}
/>
<h2>SARIMA Forcasting</h2>

<SARIMAForecastComponent
                data={userProvidedData}
                originalLineName="Original Data"
                forecastLineName="Forecast"
                xDataKey="time"
                dataKey="population"
        
            />

<h2>ARIMA Forcasting</h2>
  <ARIMAForecastComponent
                data={userProvidedData}
      
                xDataKey='time'
                dataKey='population'
             
      
        
            />
<h2>ACF plot</h2>
<ACFPlot
        data={customData}
      />
<h2>PACF Plot</h2>
      <PACFPlot data={customData}
    
        lag={2}/>
<h2>Autocorrelation Coeff</h2>
        <AutocorrelationCoeff data={customData}  lag={4}/>
</div>
  );
}
 
export default App;
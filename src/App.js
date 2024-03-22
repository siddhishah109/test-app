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
{/* <MovingAverageTrendChart
        data={data}
        windowSize={3} 
        originalLineColor="#8884d8"
        movingAverageLineColor="#82ca9d"
        showXAxis={true}
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
      />


<LinearTrendChart
        data={data}
        dataKey="y"
        lineColor="#8884d8"
        trendLineColor="#82ca9d"
        showYAxis={true}
        showTooltip={true}
        showLegend={true}
        tooltipProps={{ formatter: (value) => `$${value}` }}
        showOriginalLine={true}
        lineProps={{ strokeWidth: 2 }}
      />


<OutlierZScoreScatterChart
  data={data}
  keyX="x"
  keyY="y"
  threshold={1.3}
  // tooltipProps={{ cursor: 'pointer' }}
 
/>

<OutlierKNNScatterChart
  data={data}
  keyX="x"
  keyY="y"
  kNearest={3}
  threshold={5}
/>
<OutlierIQRScatterChart
  data={data}
  keyX="x"
  keyY="y"
  kFactor={0.4}
  tooltipProps={{ cursor: 'pointer' }}
/> */}

<ExponentialSmoothingChart data={data} alpha={0.3} xDataKey='time' dataKey='population'/>

<SARIMAForecastComponent
                data={userProvidedData}
                originalLineName="Original Data"
                forecastLineName="Forecast"
                xDataKey="time"
                dataKey="population"
          
            />
  <ARIMAForecastComponent
                data={userProvidedData}
      
                xDataKey='time'
                dataKey='population'
             
      
        
            />

<ACFPlot
        data={customData}
      />

      <PACFPlot data={customData}
    
        lag={2}/>

        <AutocorrelationCoeff data={customData}  lag={4}/>
</div>
  );
}
 
export default App;
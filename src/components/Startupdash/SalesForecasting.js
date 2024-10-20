import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, Filler } from 'chart.js';
import './SalesForecasting.css';

// Register Filler plugin
Chart.register(Filler);

const SalesForecasting = () => {
  const [salesData, setSalesData] = useState([]);

  // Function to fetch sales data from the backend
  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/business_overview');
      const data = await response.json();

      // Assuming your business overview data has revenue and profit, adjust accordingly
      const transformedData = data.map((entry, index) => ({
        month: `Month ${index + 1}`, // Placeholder, modify as needed
        actual: parseFloat(entry.profit || 0).toFixed(2),  // Ensure it's a number
      }));

      // Limit to last 12 months
      const last12MonthsData = transformedData.slice(0, 12);
      
      // Calculate simple moving average for forecasting (e.g., using last 3 months' average)
      const forecastData = last12MonthsData.map((entry, index) => {
        if (index < 3) return parseFloat(entry.actual);  // No forecast for first 3 months, just use actual
        const last3Months = last12MonthsData.slice(index - 3, index).map(e => parseFloat(e.actual));
        const forecast = last3Months.reduce((a, b) => a + b, 0) / 3; // Average of last 3 months
        return parseFloat(forecast).toFixed(2);  // Round to 2 decimal places
      });

      // Combine forecast and actual data
      const finalData = last12MonthsData.map((entry, index) => ({
        month: entry.month,
        forecast: forecastData[index],
        actual: entry.actual,
      }));

      setSalesData(finalData);
    } catch (error) {
      console.error('Error fetching sales data:', error.message);
    }
  };

  useEffect(() => {
    fetchSalesData();
    const interval = setInterval(fetchSalesData, 60000); // Fetch every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Calculate month-by-month variance and proper key metrics
  const varianceData = salesData.map((data) => (parseFloat(data.forecast) - parseFloat(data.actual)).toFixed(2));
  const totalForecast = salesData.reduce((acc, data) => acc + parseFloat(data.forecast), 0).toFixed(2);
  const totalActual = salesData.reduce((acc, data) => acc + parseFloat(data.actual), 0).toFixed(2);
  const totalVariance = varianceData.reduce((acc, v) => acc + parseFloat(v), 0).toFixed(2);
  const avgMonthlyGrowth = salesData.length > 0 
    ? (totalVariance / salesData.length).toFixed(2)
    : 0;

  const chartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: 'Forecast',
        data: salesData.map((data) => data.forecast),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Actual Sales',
        data: salesData.map((data) => data.actual),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="sales-forecasting">
      <h2>Sales Forecasting Dashboard</h2>

      <div className="forecast-container">
        <div className="chart-section">
          <h3>Monthly Sales Forecast vs Actual</h3>
          <Line data={chartData} />
        </div>

        <div className="metrics-section">
          <h3>Key Metrics</h3>
          <ul className="metrics-list">
            <li>Total Forecast: ${parseFloat(totalForecast).toLocaleString()}</li>
            <li>Total Actual: ${parseFloat(totalActual).toLocaleString()}</li>
            <li>Variance: ${parseFloat(totalVariance).toLocaleString()}</li>
            <li>Average Monthly Growth: {avgMonthlyGrowth}%</li>
          </ul>
        </div>
      </div>

      {/* Sales table and summary sections remain unchanged */}
    </div>
  );
};

export default SalesForecasting;
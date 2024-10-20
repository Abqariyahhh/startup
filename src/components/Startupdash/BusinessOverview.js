import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './BusinessOverview.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const BusinessOverview = () => {
  // Consolidated form data state
  const [formData, setFormData] = useState({
    revenue: '',
    customers: '',
    profit: '',
    burnRate: ''
  });

  const [message, setMessage] = useState(null);

  // State for analyzed data to be shown in charts
  const [analyzedData, setAnalyzedData] = useState({
    revenueData: [],
    customersData: [],
  });
  useEffect(() => {
    console.log('Analyzed Data:', analyzedData);
  }, [analyzedData]);
  

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Fetch data on mount and at regular intervals
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/business_overview');
      const data = await response.json();
      console.log('Fetched Data:', data); // Log fetched data
      setFormData({
        revenue: data.revenue || '',
        customers: data.customers || '',
        profit: data.profit || '',
        burnRate: data.burnRate || ''
      });
      setAnalyzedData({
        revenueData: data.revenueData || [],
        customersData: data.customersData || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const storeData = async () => {
    const { revenue, customers, profit, burnRate } = formData;
  
    // Validation
    if (revenue <= 0 || customers <= 0 || profit < 0 || burnRate < 0) {
      setMessage('Please fill in valid values');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/business_overview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          revenue: parseFloat(revenue) || 0,
          customers: parseInt(customers) || 0,
          profit: parseFloat(profit) || 0,
          burnRate: parseFloat(burnRate) || 0,
        }),
      });
  
      if (response.ok) {
        setMessage('Data stored successfully!');
        await fetchData(); // Refresh data
  
        // Clear input values after successful submission
        setFormData({
          revenue: '',
          customers: '',
          profit: '',
          burnRate: ''
        });
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      setMessage('Error saving data');
      console.error('Error saving data:', error);
    }
  
    setTimeout(() => setMessage(null), 3000);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Ensure proper number conversion
    const newValue = value === '' 
      ? '' 
      : name === 'customers'
      ? parseInt(value, 10) || '' // For customers, parse as an integer
      : parseFloat(value) || '';   // For revenue, profit, and burnRate, ensure it stores as a number
  
    // Update formData
    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: newValue };
      console.log('Updated Form Data:', updatedData); // Log updated form data
      return updatedData;
    });
  };

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:5000/business_overview/latest'); // Ensure this endpoint returns the latest entry
      if (!response.ok) {
        throw new Error(Error `${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Assuming data structure is like: { revenue: X, customers: Y }
      if (data) {
        // Update analyzedData with only the latest entry
        setAnalyzedData({
          revenueData: [data.revenue], // Use the latest revenue
          customersData: [data.customers], // Use the latest customers
        });
        setMessage("Data analyzed successfully!");
      } else {
        setMessage("No data available to analyze.");
      }
    } catch (error) {
      console.error("Error fetching analyzed data:", error);
      setMessage(`Failed to analyze data: ${error.message}`);
    }
  
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };
  
  
  

  return (
    <div className="business-overview-container">
      <h2 className="bo-title">Business Overview</h2>
      {message && <p className="message">{message}</p>}

      <div className="input-form">
        <h2>Enter Real-Time Data</h2>
        <form onSubmit={(e) => { e.preventDefault(); storeData(); }}>
  <div className="input-row">
    <label>
      Total Revenue:
      <input
        type="number"
        name="revenue"
        value={formData.revenue}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Customer Acquisition:
      <input
        type="number"
        name="customers"
        value={formData.customers}
        onChange={handleInputChange}
      />
    </label>
  </div>
  <div className="input-row">
    <label>
      Net Profit:
      <input
        type="number"
        name="profit"
        value={formData.profit}
        onChange={handleInputChange}
      />
    </label>
    <label>
      Burn Rate:
      <input
        type="number"
        name="burnRate"
        value={formData.burnRate}
        onChange={handleInputChange}
      />
    </label>
  </div>
  <button type="submit">Submit Data</button>
</form>

      </div>

      <div className="analyze-button-container">
        <button className="analyze-button" onClick={handleAnalyze}>Analyze</button>
      </div>

      <div className="stats-section">
  <div className="stat-card">
    <h2>Total Revenue</h2>
    <p>${formData.revenue || 'Enter value'}</p>
  </div>
  <div className="stat-card">
    <h2>Customer Acquisition</h2>
    <p>{formData.customers ? `${formData.customers} New Customers `: 'Enter value'}</p>
  </div>
  <div className="stat-card">
    <h2>Net Profit</h2>
    <p>${formData.profit || 'Enter value'}</p>
  </div>
  <div className="stat-card">
    <h2>Burn Rate</h2>
    <p>${formData.burnRate ? `${formData.burnRate}/month` : 'Enter value'}</p>
  </div>
</div>


      <div className="charts-section">
        <div className="chart-card">
          <h2>Revenue Growth</h2>
          <Line
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: analyzedData.revenueData, // Make sure this references your state
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 2,
      },
    ],
  }}
  options={chartOptions}
/>

        </div>
        <div className="chart-card">
          <h2>Customer Acquisition</h2>
          <Bar data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                label: 'New Customers',
                data: analyzedData.customersData,
                backgroundColor: '#2196f3',
                borderWidth: 1,
              },
            ],
          }} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
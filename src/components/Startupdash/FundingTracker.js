import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2'; // Imported Bar chart for the graph

import './FundingTracker.css';

const FundingTracker = () => {
    const [amountRaised, setAmountRaised] = useState('');
    const [investors, setInvestors] = useState('');
    const [milestone, setMilestone] = useState('');
    const [fundingData, setFundingData] = useState([]);

    const [barChartData, setBarChartData] = useState({
        labels: [], // Label for each date entry
        datasets: [{
            label: 'Funding Over Time',
            data: [],
            backgroundColor: '#36a2eb',
            borderColor: '#4caf50',
        }]
    });

    const [pieChartData, setPieChartData] = useState({
        labels: ['Entrepreneur', 'Investors'],
        datasets: [{
            data: [0, 0], // Initialize with zero data
            backgroundColor: ['#ff6384', '#36a2eb'],
        }],
    });
    

    useEffect(() => {
        const fetchFundingData = async () => {
            try {
                const response = await fetch('http://localhost:5000/funding'); // Adjust the endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFundingData(data);
                updateChartsFromFetchedData(data); // Update charts with fetched data
            } catch (error) {
                console.error('Error fetching funding data:', error);
            }
        };
    
        fetchFundingData(); // Call the function to fetch data
    }, []);
    
    const updateChartsFromFetchedData = (data) => {
        const labels = data.map(entry => entry.date);
        const amounts = data.map(entry => entry.amount);
        setBarChartData({
            labels,
            datasets: [{
                label: 'Funding Over Time',
                data: amounts,
                backgroundColor: '#36a2eb',
                borderColor: '#4caf50',
            }],
        });
    };

    const updatePieChart = (newFunding) => {
        setPieChartData(prev => {
            const entrepreneurAmount = newFunding.amount; // Update this to reflect your logic
            const investorAmount = parseInt(investors); // Update this as needed
            return {
                labels: ['Entrepreneur', 'Investors'],
                datasets: [{
                    data: [entrepreneurAmount, investorAmount],
                    backgroundColor: ['#ff6384', '#36a2eb'],
                }],
            };
        });
    };
    
    

    const addFundingData = async () => {
        if (amountRaised <= 0 || investors <= 0) {
            alert('Please enter valid values for amount raised and number of investors.');
            return;
        }
        
        const newFunding = {
            date: new Date().toLocaleDateString(),
            amount: parseFloat(amountRaised),
            investors: parseInt(investors),
            milestone,
        };
    
        try {
            const response = await fetch('http://localhost:5000/funding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFunding),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            setFundingData(prev => [...prev, newFunding]);
            updateCharts(newFunding);
            updatePieChart(newFunding);
            setAmountRaised('');
            setInvestors('');
            setMilestone('');
        } catch (error) {
            console.error('Error adding funding data:', error);
            alert('Failed to add funding data. Please try again.');
        }
    };
    
    
    const updateCharts = (newFunding) => {
        setBarChartData(prev => {
            const newLabels = [...prev.labels, newFunding.date];
            const newData = [...prev.datasets[0].data, newFunding.amount];
            return {
                labels: newLabels,
                datasets: [{
                    ...prev.datasets[0],
                    data: newData,
                }]
            };
        });
    };

    return (
        <div className="funding-tracker-container">
            <h1>Funding Tracker</h1>
            
            {/* Input Form for Adding Data */}
            <div className="input-form">
                <h2>Enter Funding Details</h2>
                <div className="input-row">
                    <label>
                        Amount Raised ($):
                        <input
                            type="number"
                            value={amountRaised}
                            onChange={(e) => setAmountRaised(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Number of Investors:
                        <input
                            type="number"
                            value={investors}
                            onChange={(e) => setInvestors(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Milestone Achieved:
                        <input
                            type="text"
                            value={milestone}
                            onChange={(e) => setMilestone(e.target.value)}
                        />
                    </label>
                </div>
                <button className="add-funding-button" onClick={addFundingData}>Add Funding</button>
            </div>

            {/* Charts Section */}
            <div className="charts-header">
                <div className="chart-box1">
                    <h2>Funding Over Time</h2>
                </div>
                <div className="chart-box2">
                    <h2>Stakeholders</h2>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-container">
                    {/* Bar Chart */}
                    <div className="chart-box">
                        <Bar data={barChartData} />
                    </div>

                    {/* Pie Chart */}
                    <div className="chart-box">
                        <Pie data={pieChartData} />
                    </div>
                </div>
            </div>

            {/* Funding Records Table */}
            <div className="funding-table">
                <h2>Funding Records</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount Raised ($)</th>
                            <th>Investors</th>
                            <th>Milestone Achieved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundingData.map((fund, index) => (
                            <tr key={index}>
                                <td>{fund.date}</td>
                                <td>${fund.amount}</td>
                                <td>{fund.investors}</td>
                                <td>{fund.milestone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="suggestions-section">
                <h2>Funding Strategies</h2>
                <ul>
                    <li>Identify potential angel investors in your industry.</li>
                    <li>Utilize crowdfunding platforms for wider reach.</li>
                    <li>Network with other startups for collaborative funding opportunities.</li>
                    <li>Attend pitch events to showcase your startup to investors.</li>
                    <li>Leverage social media campaigns to attract attention and investors.</li>
                </ul>
            </div>
        </div>
    );
};

export default FundingTracker;
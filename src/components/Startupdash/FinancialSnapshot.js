import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './FinancialSnapshot.css';
// Register necessary components
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);



const FinancialSnapshot = () => {
    const [financialData, setFinancialData] = useState({ revenue: 0, expenses: 0, netProfit: 0 });

    const [loading, setLoading] = useState(true);
    const [totalExpenseInput, setTotalExpenseInput] = useState(0); // State for user input

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch the latest revenue data
            const revenueResponse = await fetch('http://localhost:5000/business_overview/latest');
            const revenueData = await revenueResponse.json();
            console.log('Latest Revenue Data:', revenueData); // Log to check the structure
    
            // Fetch expenses data
            const expensesResponse = await fetch('http://localhost:5000/financial_snapshot');
            const expensesData = await expensesResponse.json();
            console.log('Expenses Data:', expensesData); // Log to check the structure
    
            // Set financial data with the latest revenue and expenses
            setFinancialData({
                revenue: revenueData.revenue || 0, // Adjust based on actual response structure
                expenses: expensesData.total_expenses || 0, // Adjust based on actual response structure
                netProfit: (revenueData.revenue || 0) - (expensesData.total_expenses || 0),
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, []);

    const handleSaveExpenses = async () => {
        // Log the total expense input value
        console.log('Total Expense Input:', totalExpenseInput);
        
        // Input validation check
        if (isNaN(totalExpenseInput) || totalExpenseInput <= 0) {
            console.error('Total expenses must be a valid number greater than zero.');
            return; // Prevents the fetch request if input is invalid
        }
    
        try {
            const response = await fetch('http://localhost:5000/financial_snapshot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalExpenses: totalExpenseInput }), // Send input data
            });
    
            if (response.ok) {
                setTotalExpenseInput(0); // Reset input after saving
                fetchData(); // Re-fetch data to reflect new expenses
            } else {
                const errorResponse = await response.json();
                console.error('Failed to save expenses:', errorResponse.error); // Log specific error
            }
        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    };
    

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Revenue',
                data: [financialData.revenue, financialData.revenue, financialData.revenue, financialData.revenue, financialData.revenue], // Sample data
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Expenses',
                data: [financialData.expenses, financialData.expenses, financialData.expenses, financialData.expenses, financialData.expenses], // Sample data
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const pieChartData = {
        labels: ['Marketing', 'Operations', 'Development', 'Other'],
        datasets: [
            {
                data: [3000, 10000, 5000, 2000],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div className="financial-snapshot">
            <h2 className="snapshot-title">Financial Snapshot</h2>

            <div className="expense-input">
    <h3>Enter Total Expenses</h3>
    <input
        type="number"
        value={totalExpenseInput}
        onChange={(e) => setTotalExpenseInput(Number(e.target.value))}
        placeholder="Enter total expenses"
    />
    <button onClick={handleSaveExpenses}>Save Expenses</button> {/* Add Save button */}
</div>

<div className="summary">
    <div className="summary-item">
        <h3>Total Revenue</h3>
        <p>${financialData.revenue?.toLocaleString() || 0}</p>
    </div>
    <div className="summary-item">
        <h3>Total Expenses</h3>
        <p>${financialData.expenses?.toLocaleString() || 0}</p>
    </div>
    <div className="summary-item">
        <h3>Net Profit</h3>
        <p>${financialData.netProfit?.toLocaleString() || 0}</p>
    </div>
</div>


<div className="charts">
                <div className="chart">
                    <h3>Revenue & Expenses Over Time</h3>
                    {!loading ? (
                        <Line data={lineChartData} />
                    ) : (
                        <div className="chart-placeholder">Loading...</div>
                    )}
                </div>
                <div className="chart">
                    <h3>Expense Distribution</h3>
                    {!loading ? (
                        <Pie data={pieChartData} />
                    ) : (
                        <div className="chart-placeholder">Loading...</div>
                    )}
                </div>
            </div>

            <div className="recent-kpi-container">
                <div className="recent-transactions">
                    <h3>Recent Transactions</h3>
                    <ul>
                        <li>Income - $1,000 (Service) - 09/01/2024</li>
                        <li>Expense - $200 (Supplies) - 09/02/2024</li>
                        <li>Income - $500 (Consulting) - 09/03/2024</li>
                        <li>Expense - $150 (Marketing) - 09/04/2024</li>
                    </ul>
                </div>

                <div className="kpi">
                    <h3>Key Performance Indicators</h3>
                    <ul>
                        <li>Burn Rate: $5,000/month</li>
                        <li>Runway: 10 months</li>
                        <li>Profit Margin: 40%</li>
                    </ul>
                </div>
            </div>

           
                <button className="download-btn">Download Snapshot</button>
           
        </div>
    );
};

export default FinancialSnapshot;
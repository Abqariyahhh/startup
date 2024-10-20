import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';

import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

import './MarketingInsights.css';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MarketingInsights = () => {
    const [insightsData, setInsightsData] = useState({
        clicks: [],
        conversions: [],
        trends: [],
        customerRequirements: [],
        competitors: {},
        demographics: {},
        topProducts: [],
        sentiment: {},
        roi: { budget: 0, returns: 0 },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const clicks = [300, 400, 500, 600, 800]; 
            const conversions = [20, 30, 50, 80, 100];
            const trends = ['AI', 'Sustainability', 'Cloud Computing', 'E-commerce'];
            const customerRequirements = [
                { product: 'AI Chatbots', requirement: 'Automation' },
                { product: 'Cloud Solutions', requirement: 'Scalability' },
                { product: 'E-commerce Platforms', requirement: 'User Experience' },
                { product: 'Data Analytics Tools', requirement: 'Real-time Insights' },
                { product: 'Social Media Management', requirement: 'Engagement Tracking' },
                { product: 'Email Marketing Software', requirement: 'Campaign Optimization' },
                { product: 'CRM Systems', requirement: 'Lead Management' },
                { product: 'Web Development Services', requirement: 'Mobile Responsiveness' },
                { product: 'SEO Tools', requirement: 'Search Visibility' },
                { product: 'Cybersecurity Solutions', requirement: 'Data Protection' },
            ];
            const competitors = {
                "Your Startup": 35,
                "Competitor A": 45,
                "Competitor B": 20,
            };
            const demographics = {
                ageGroups: [20, 40, 30, 10], 
                locations: ['USA', 'Europe', 'Asia', 'Other'],
            };
            const topProducts = [
                { name: 'Product A', sales: 500 },
                { name: 'Product B', sales: 300 },
            ];
            const sentiment = {
                positive: 70,
                neutral: 20,
                negative: 10,
            };
            const roi = {
                budget: 50000,
                returns: 120000,
            };

            setInsightsData({
                clicks,
                conversions,
                trends,
                customerRequirements,
                competitors,
                demographics,
                topProducts,
                sentiment,
                roi,
            });
            setLoading(false);
        };
        fetchData();
    }, []);

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Clicks',
                data: insightsData.clicks,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            },
            {
                label: 'Conversions',
                data: insightsData.conversions,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    const competitorChartData = {
        labels: Object.keys(insightsData.competitors),
        datasets: [
            {
                label: 'Market Share',
                data: Object.values(insightsData.competitors),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const demographicsPieData = {
        labels: insightsData.demographics.locations,
        datasets: [
            {
                label: 'Customer Demographics by Region',
                data: insightsData.demographics.ageGroups,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const sentimentPieData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                label: 'Customer Sentiment',
                data: Object.values(insightsData.sentiment),
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
            },
        ],
    };

    const barChartData = {
        labels: ['Company X', 'Company Y', 'Company Z'],
        datasets: [
            {
                label: 'Market Share by Big Players',
                data: [40, 35, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="marketing-insights">
            <h2 className="insights-title">Marketing Insights</h2>

            {/* Summary Section */}
            <div className="summary">
                <div className="summary-item">
                    <h3>Total Clicks</h3>
                    <p>{insightsData.clicks.reduce((a, b) => a + b, 0)}</p>
                </div>
                <div className="summary-item">
                    <h3>Total Conversions</h3>
                    <p>{insightsData.conversions.reduce((a, b) => a + b, 0)}</p>
                </div>
                <div className="summary-item">
                    <h3>Trending Topics</h3>
                    <p>{insightsData.trends.join(', ')}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <div className="chart">
                    <h3>Clicks & Conversions Over Time</h3>
                    {!loading ? <Line data={lineChartData} /> : <div className="chart-placeholder">Loading...</div>}
                </div>
                <div className="chart">
                    <h3>Competitor Analysis</h3>
                    {!loading ? <Pie data={competitorChartData} /> : <div className="chart-placeholder">Loading...</div>}
                </div>
            </div>

            {/* Demographics and Sentiment Section */}
            <div className="charts-section">
                <div className="chart">
                    <h3>Customer Demographics by Region</h3>
                    {!loading ? <Pie data={demographicsPieData} /> : <div className="chart-placeholder">Loading...</div>}
                </div>
                <div className="chart">
                    <h3>Big Players Market Share</h3>
                    {!loading ? <Bar data={barChartData} /> : <div className="chart-placeholder">Loading...</div>}
                </div>
                <div className="chart">
                    <h3>Customer Sentiment</h3>
                    {!loading ? <Pie data={sentimentPieData} /> : <div className="chart-placeholder">Loading...</div>}
                </div>
            </div>

            {/* Customer Requirements Section */}
            <div className="customer-requirements">
                <h3>Customer Requirements</h3>
                <div className="requirements-list">
                    {insightsData.customerRequirements.map((item, index) => (
                        <div className="requirement-item" key={index}>
                            <strong>{item.product}</strong>
                            <span>{item.requirement}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Budget vs. ROI */}
            <div className="kpi-trends">
                <h3>Budget vs. ROI</h3>
                <p>Budget: ${insightsData.roi.budget}</p>
                <p>Returns: ${insightsData.roi.returns}</p>
                <p>ROI: {((insightsData.roi.returns / insightsData.roi.budget) * 100).toFixed(2)}%</p>
            </div>

            
                <button className="download-btn">Download Report</button>
            
        </div>
    );
};

export default MarketingInsights;
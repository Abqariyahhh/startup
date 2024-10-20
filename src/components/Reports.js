import React from 'react';
import './Reports.css';

const reportsData = [
  {
    title: "Investment Overview",
    description: "A comprehensive overview of your investment portfolio.",
    link: "#overview"
  },
  {
    title: "Financial Performance",
    description: "Detailed analysis of the financial performance of your investments.",
    link: "#performance"
  },
  {
    title: "Market Trends",
    description: "Insights and trends in the market affecting your investments.",
    link: "#trends"
  },
  {
    title: "Risk Assessment",
    description: "Evaluation of risks associated with your investment choices.",
    link: "#risk"
  },
];

const Reports = () => {
  return (
    <div className="reports-container">
      <header className="reports-header">
        <h1>Reports</h1>
        <p>Access detailed reports and analyses of your investments. Choose from a variety of reports to get insights into your investment portfolio.</p>
      </header>
      <section className="reports-grid">
        {reportsData.map((report, index) => (
          <a key={index} href={report.link} className="report-card">
            <h2 className="report-title">{report.title}</h2>
            <p className="report-description">{report.description}</p>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Reports;
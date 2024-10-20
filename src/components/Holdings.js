import React from 'react';
import './Holdings.css';

const holdingsData = [
  {
    name: "Tech Innovations",
    sector: "Technology",
    value: "$120,000",
    performance: "Up 15%",
  },
  {
    name: "Creative Minds",
    sector: "Marketing",
    value: "$85,000",
    performance: "Down 5%",
  },
  {
    name: "Growth Labs",
    sector: "Biotech",
    value: "$150,000",
    performance: "Up 10%",
  },
];

const Holdings = () => {
  return (
    <div className="holdings-container">
      <header className="holdings-header">
        <h1>Your Holdings</h1>
        <p>Review and manage your current holdings with detailed information and performance insights.</p>
      </header>
      <section className="holdings-list">
        {holdingsData.map((holding, index) => (
          <div key={index} className="holding-card">
            <h2 className="holding-name">{holding.name}</h2>
            <p className="holding-sector">Sector: {holding.sector}</p>
            <p className="holding-value">Value: {holding.value}</p>
            <p className={`holding-performance ${holding.performance.includes("Up") ? "up" : "down"}`}>
              Performance: {holding.performance}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Holdings;

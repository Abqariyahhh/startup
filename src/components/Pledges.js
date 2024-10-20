import React from 'react';
import './Pledges.css';

const pledgesData = [
  {
    startup: "EcoTech Innovations",
    amount: "$20,000",
    date: "2024-06-15",
    status: "Active",
  },
  {
    startup: "HealthFirst Solutions",
    amount: "$15,000",
    date: "2024-07-22",
    status: "Completed",
  },
  {
    startup: "EduSmart Technologies",
    amount: "$10,000",
    date: "2024-08-10",
    status: "Pending",
  },
];

const Pledges = () => {
  return (
    <div className="pledges-container">
      <header className="pledges-header">
        <h1>Your Pledges</h1>
        <p>View and manage the pledges you have made towards startups. Keep track of your investments and their statuses.</p>
      </header>
      <section className="pledges-list">
        {pledgesData.map((pledge, index) => (
          <div key={index} className="pledge-card">
            <h2 className="startup-name">{pledge.startup}</h2>
            <p className="pledge-amount">Amount: {pledge.amount}</p>
            <p className="pledge-date">Date: {pledge.date}</p>
            <p className={`pledge-status ${pledge.status.toLowerCase()}`}>Status: {pledge.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pledges;

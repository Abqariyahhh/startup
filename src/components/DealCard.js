import React from 'react';
import './DealCard.css';  // Add your CSS styling

function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <h2 className="deal-title">{deal.title}</h2>
      <p>{deal.description}</p>
      
      <h4>Current Clients:</h4>
      <div className="client-grid">
        {deal.clients.map((client, index) => (
          <img key={index} src={client.logo} alt={client.name} className="client-logo" />
        ))}
      </div>
      
      <div className="button-group">
        <button className="button-primary">Engage</button>
        <button className="button-secondary">Ignore</button>
      </div>
    </div>
  );
}

export default DealCard;
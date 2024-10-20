import React, { useState, useEffect } from 'react';
import './Opportunities.css';  // Link to the CSS file
import axios from 'axios'; 
import { io } from 'socket.io-client'; // Import Socket.io client

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const socket = io('http://localhost:5000'); // Connect to Socket.io backend

  useEffect(() => {
    // Fetch pitches
    const fetchPitches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pitches');
        setPitches(response.data); // Set the fetched pitches to state
      } catch (error) {
        console.error('Error fetching pitches:', error);
        setError('Error fetching pitches. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchPitches(); // Call the fetch function to get pitches

    // Placeholder for fetching opportunities dynamically later
    setOpportunities([]);

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Function to handle investment button click
  const handleInvestClick = async (pitchId, startupId) => {
    try {
      // Send a request to the backend to notify the startup about the investment
      const response = await axios.post('http://localhost:5000/invest', { pitchId, startupId });
      console.log('Investment made successfully!', response.data);

      // Emit a real-time notification to the startup via Socket.io
      

      
    } catch (error) {
      console.error('Error making investment:', error);
      alert('Failed to make investment. Please try again.');
    }
  };

  return (
    <div className="opportunities-page">
      <h1 className="page-title">Opportunities</h1>
      {opportunities.length === 0 ? (
        <p className="no-opportunities-message">No opportunities available at the moment. Check back later!</p>
      ) : (
        <div className="opportunities-list">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="opportunity-card">
              <h2>{opportunity.title}</h2>
              <p>{opportunity.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Section for displaying fetched pitches */}
      <div className="pitch-section">
        <h2>Latest Startup Pitches</h2>
        {loading ? ( // Show loading indicator
          <p>Loading pitches...</p>
        ) : error ? ( // Show error message
          <p>{error}</p>
        ) : pitches.length > 0 ? (
          <div className="pitch-items-container"> {/* New container for pitches */}
            {pitches.map((pitch) => (
              <div key={pitch.id} className="pitch-item">
                <h3>{pitch.title}</h3>
                <p>{pitch.description}</p>
                <p><strong>Requirement:</strong> {pitch.requirements}</p>
                <p><strong>Location:</strong> {pitch.location}</p>
                <p><strong>Investment Amount:</strong> {pitch.investment_amount}</p>
                <p><strong>Valuation:</strong> {pitch.valuation}</p>
                <p><strong>Investment Type:</strong> {pitch.investment_type}</p>
                
                {/* Investment button */}
                <button onClick={() => handleInvestClick(pitch.id, pitch.startupId)}>
                  Invest
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No pitches available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Opportunities;

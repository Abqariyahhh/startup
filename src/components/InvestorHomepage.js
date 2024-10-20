import React, { useState } from 'react';
import DealCard from './DealCard';
import axios from 'axios'; // Ensure Axios is imported to post data
import './InvestorHomepage.css'; // Ensure this is the correct path to your CSS

const InvestorHomepage = () => {
  // Define state to manage investor details
  const [investorDetails, setInvestorDetails] = useState({
    investor_name: '',
    expertise: '',
    interested_sectors: '',
    what_provide_to_entrepreneurs: '',
    type_of_company: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvestorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send the investor details to the server
      const response = await axios.post('http://localhost:5000/investors', investorDetails);
      
      // Check for success response
      if (response.status === 201) {
        alert('Investor details submitted successfully!'); // Success message

        // Reset the form after submission
        setInvestorDetails({
          investor_name: '',
          expertise: '',
          interested_sectors: '',
          what_provide_to_entrepreneurs: '',
          type_of_company: '',
        });
      } else {
        alert('Submission failed. Please try again.'); // Handle other statuses
      }
    } catch (error) {
      console.error('Error submitting investor details:', error);
      alert('Error submitting details. Please try again.'); // Error message
    }
  };

  return (
    <div className="homepage-container">
      <div className="main-content">
        <h1 className="welcome-heading">Welcome, Investor</h1>
        <p className="intro-text">Explore new opportunities and engage with promising startups.</p>

        {/* Existing DealCard */}
        <div className="deal-section">
          <DealCard 
            deal={{ 
              title: 'Exciting New Deal', 
              description: 'Invest in a high-growth startup.', 
              clients: [
                { logo: 'client1.png', name: 'Client 1' }, 
                { logo: 'client2.png', name: 'Client 2' }
              ]
            }} 
          />
        </div>

        {/* Investor Details Form */}
        <div className="investor-form">
          <h2>Submit Investor Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="investor_name"
              placeholder="Investor Name"
              value={investorDetails.investor_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="expertise"
              placeholder="Expertise"
              value={investorDetails.expertise}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="interested_sectors"
              placeholder="Interested Sectors"
              value={investorDetails.interested_sectors}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="what_provide_to_entrepreneurs"
              placeholder="What do you provide to entrepreneurs?"
              value={investorDetails.what_provide_to_entrepreneurs}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="type_of_company"
              placeholder="Type of Company"
              value={investorDetails.type_of_company}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Note: Removed the section to display existing investor details */}
      </div>
    </div>
  );
};

export default InvestorHomepage;

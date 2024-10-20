import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
      <header className="services-header">
        <h1>Our Services</h1>
        <p>We offer a range of services to help startups succeed, including investment opportunities, mentorship programs, and networking events.</p>
      </header>

      <section className="services-list">
        <div className="service-card">
          <img src="investment.jpg" alt="Investment Opportunities" className="service-image" />
          <div className="service-content">
            <h2>Investment Opportunities</h2>
            <p>We connect startups with investors who are interested in funding innovative ideas and businesses.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="mentorship.jpg" alt="Mentorship Programs" className="service-image" />
          <div className="service-content">
            <h2>Mentorship Programs</h2>
            <p>Our experienced mentors provide guidance and advice to help startups navigate challenges and grow their businesses.</p>
          </div>
        </div>
        <div className="service-card">
          <img src="networking.jpg" alt="Networking Events" className="service-image" />
          <div className="service-content">
            <h2>Networking Events</h2>
            <p>Join our events to meet industry leaders, fellow entrepreneurs, and potential partners who can help your startup thrive.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;

import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to TheFoundersHub</h1>
        <p className="hero-subtitle">Where innovation meets opportunity.</p>
        <Link to="/startupprofile">
          <button className="hero-button">Join us</button>
        </Link>
      </div>
      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits">
          <div className="benefit">
            <i className="fas fa-lightbulb"></i>
            <h3>Innovative Ideas</h3>
            <p>We bring cutting-edge solutions to the table.</p>
          </div>
          <div className="benefit">
            <i className="fas fa-people-carry"></i>
            <h3>Expert Team</h3>
            <p>Our team comprises industry leaders and experts.</p>
          </div>
          <div className="benefit">
            <i className="fas fa-rocket"></i>
            <h3>Accelerated Growth</h3>
            <p>We help startups reach their full potential quickly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

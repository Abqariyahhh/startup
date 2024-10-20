import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>About TheFoundersHub</h1>
          <p>Connecting entrepreneurs with the resources they need to build, grow, and thrive.</p>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At TheFoundersHub, we believe in the power of innovation and collaboration. Our mission is to provide startups
          with the tools, connections, and mentorship they need to transform their ideas into successful ventures.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We encourage creativity and groundbreaking ideas that push the boundaries of technology and business.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>We foster a vibrant ecosystem of entrepreneurs, mentors, and investors who support each other’s growth.</p>
          </div>
          <div className="value-card">
            <h3>Mentorship</h3>
            <p>Our experienced mentors guide startups through their challenges, helping them scale and succeed.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We are committed to transparency, trust, and ethical practices in everything we do.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" />
            <h3>John Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img src="team-member3.jpg" alt="Team Member 3" />
            <h3>Alice Johnson</h3>
            <p>Head of Operations</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
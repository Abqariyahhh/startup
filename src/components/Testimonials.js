import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: "Jane Doe",
    position: "CEO, Tech Innovations",
    message: "TheFoundersHub has been instrumental in our growth. The mentorship and networking opportunities have been invaluable.",
    image: "jane-doe.jpg",
  },
  {
    name: "John Smith",
    position: "Founder, Creative Minds",
    message: "A fantastic platform for startups! The connections and resources provided are top-notch.",
    image: "john-smith.jpg",
  },
  {
    name: "Alice Johnson",
    position: "Head of Operations, Growth Labs",
    message: "Exceptional support and guidance. TheFoundersHub is a must-have for any serious entrepreneur.",
    image: "alice-johnson.jpg",
  },
];

function Testimonials() {
  return (
    <div className="testimonials-container">
      <header className="testimonials-header">
        <h1>What Our Members Say</h1>
        <p>Discover how TheFoundersHub has helped entrepreneurs and startups thrive.</p>
      </header>
      <section className="testimonials-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-message">"{testimonial.message}"</p>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-position">{testimonial.position}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Testimonials;

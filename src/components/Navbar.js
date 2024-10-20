import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>TheFoundersHub</h1>
      <ul>
      <li><Link to="/">Home</Link></li>
        <li><a href="/about" rel="noopener noreferrer">About</a></li>
        <li><a href="/services"  rel="noopener noreferrer">Services</a></li>
        <li><a href="/testimonials"  rel="noopener noreferrer">Testimonials</a></li>
        <li><a href="/contact"  rel="noopener noreferrer">Contact</a></li>
        <li><a href="/signup" target="_blank"  rel="noopener noreferrer">Signup</a></li>
        <li><a href="/login" target="_blank"  rel="noopener noreferrer">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
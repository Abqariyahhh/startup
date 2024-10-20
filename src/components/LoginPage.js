import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
  const [gmailId, setGmailId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', { gmailId, password });
  
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
  
        const userProfile = response.data.profile; // Get user profile
        if (userProfile === 'investor') {
          navigate('/investor'); // Redirect to investor dashboard
        } else if (userProfile === 'entrepreneur') {
          navigate('/startupdashboard'); // Redirect to startup dashboard
        } else if (userProfile === 'job_seeker') {
          navigate('/job-seeker-dashboard'); // Redirect to job seeker dashboard
        } else {
          setMessage('Invalid user role'); // Handle unknown roles
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message || 'Invalid email or password.');
      } else {
        setMessage('Error: Unable to login. Please check your network or try again later.');
      }
      setError(true);
    }
  };

  return (
    <div class="login-page-body"> 
    <div class="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="gmailId">Gmail ID *</label>
          <input
            type="email"
            id="gmailId"
            value={gmailId}
            onChange={(e) => setGmailId(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
  
      {message && (
        <div className={`message ${error ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <div class="links">
        <a href="\signup">Forgot Password?</a>
      </div>
    </div>
  </div>
  
  );
};

export default LoginPage;


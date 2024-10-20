import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  background-color: #f9f9f9; /* Light gray background similar to services page */
  color: #333; /* Dark text color */
  padding: 90px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center; /* Centers the form horizontally */
  align-items: center; /* Centers the form vertically */
  flex-direction: column; /* Ensures the layout stays vertical */
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px; /* Adjusted margin for consistency */
  color: #004d40; /* Deep teal color */
  font-size: 2.5rem; /* Consistent with services header */
  font-weight: bold; /* Make title bold */
  text-transform: uppercase; /* Uppercase text for emphasis */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the inputs inside the form */
  width: 100%; /* Make form take full width of the container */
`;

const Input = styled.input`
  padding: 12px;
  margin: 15px 0; /* Adjusted margin for consistency */
  border: 1px solid #004d40; /* Deep teal border */
  border-radius: 8px; /* Rounded corners */
  width: 100%;
  max-width: 500px; /* Set max width */
  box-sizing: border-box;
  font-size: 1rem; /* Adjust font size for readability */
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #004d40; /* Deep teal on focus */
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  margin: 20px 0; /* Adjusted margin for consistency */
  border: 1px solid #004d40; /* Deep teal border */
  border-radius: 8px; /* Rounded corners */
  resize: none;
  width: 100%;
  max-width: 500px; /* Set max width */
  box-sizing: border-box;
  font-size: 1rem; /* Adjust font size for readability */
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #004d40; /* Deep teal on focus */
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  margin: 15px 0; /* Adjusted margin for consistency */
  border: 1px solid #004d40; /* Deep teal border */
  border-radius: 8px; /* Rounded corners */
  width: 100%;
  max-width: 500px; /* Set max width */
  box-sizing: border-box;
  font-size: 1rem; /* Adjust font size for readability */
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #004d40; /* Deep teal on focus */
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #004d40; /* Deep teal color */
  color: white;
  border: none;
  padding: 12px 25px; /* Increased padding for button */
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Added transform transition */
  border-radius: 8px; /* Rounded corners */
  margin-top: 20px; /* Spacing above button */

  &:hover {
    background-color: #003d33; /* Darker teal shade */
    transform: scale(1.05); /* Slightly scale up on hover */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0; /* Increased margin for consistency */
  font-size: 0.9rem;
`;

const ContactInfo = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a {
    margin: 0 15px; /* Increased margin between icons */
    color: #004d40; /* Deep teal color */
    font-size: 1.5rem;
    transition: color 0.3s, transform 0.2s; /* Added transform transition */

    &:hover {
      color: #003d33; /* Darker teal shade */
      transform: scale(1.1); /* Slightly scale up on hover */
    }
  }
`;

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const simulateEmailCheck = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes('example')) {
          resolve(false);
        } else {
          resolve(true);
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const emailExists = await simulateEmailCheck(email);

    if (!emailExists) {
      setError('This email does not exist. Please provide a valid email.');
      return;
    }

    setError('');
    alert("Form submitted successfully!");
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your Name"
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Select value={reason} onChange={handleReasonChange} required>
          <option value="">Select a reason for contacting us</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
          <option value="inquiry">General Inquiry</option>
          <option value="partnership">Partnership</option>
        </Select>

        <Textarea
          placeholder="Your Message"
          rows="6"
          required
        />
        <Button type="submit">Send Message</Button>
      </Form>

      <ContactInfo>
        <h3>Our Contact Information</h3>
        <p>Email: contact@yourwebsite.com</p>
        <p>Phone: +123 456 7890</p>

        <SocialLinks>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </SocialLinks>
      </ContactInfo>
    </ContactContainer>
  );
};

export default ContactUs;

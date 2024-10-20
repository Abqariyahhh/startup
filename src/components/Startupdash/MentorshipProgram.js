import React, { useState, useEffect } from 'react';
import './MentorshipProgram.css';
import { FaCalendarAlt } from 'react-icons/fa';

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState([]);
  const [mentorData, setMentorData] = useState({ name: '', expertise: '', email: '' });
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [newClass, setNewClass] = useState({ title: '', details: '', date: '', time: '' });
  const [classMessage, setClassMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/mentors')
      .then(response => response.json())
      .then(data => setMentors(data))
      .catch(err => console.error('Error fetching mentors:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/classes') // Replace with actual backend endpoint
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  useEffect(() => {
    // Fetch mentors
    fetch('http://localhost:5000/mentors')
      .then(response => response.json())
      .then(data => setMentors(data))
      .catch(err => console.error('Error fetching mentors:', err));
  
    // Fetch upcoming classes
    fetch('http://localhost:5000/classes')  // New endpoint for classes
      .then(response => response.json())
      .then(data => setClasses(data))  // Set the class data
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  const handleJoinClass = (classItem) => {
    setSelectedClass(classItem);
    // You can add more functionality here like sending a registration request
  };

  const handleClassInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleAddClass = () => {
    if (newClass.title && newClass.details && newClass.date && newClass.time) {
      fetch('http://localhost:5000/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          class_name: newClass.title,      // Updated to match your table structure
          class_details: newClass.details,  // Updated to match your table structure
          class_date: newClass.date,        // Ensure this matches the column name
          class_time: newClass.time, 
        }),
      })
      .then(response => response.json())
      .then(data => {
        setClasses((prevClasses) => [...prevClasses, data]);
        setClassMessage('Class added successfully!');
        setNewClass({ title: '', details: '', date: '', time: '' }); // Clear form
      })
      .catch(err => console.error('Error adding class:', err));
    } else {
      alert('Please fill in all fields');
    }
  };
  
  

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleRegister = () => {
    if (mentorData.name && mentorData.expertise && mentorData.email) {
      fetch('http://localhost:5000/mentors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorData),
      })
        .then(response => response.json())
        .then(data => {
          setMentors((prevMentors) => [...prevMentors, data]);
          setRegistrationMessage('Mentor registered successfully!');
          setMentorData({ name: '', expertise: '', email: '' });
        })
        .catch(err => console.error('Error registering mentor:', err));
    } else {
      alert("Please fill in all fields.");
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mentorship-container">
      <h1>Mentorship Program</h1>

      <div className="search-and-registration">
        <div className="find-mentors">
          <h2>Find Mentors</h2>
          <input
            type="text"
            placeholder="Search for mentors or investors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        <div className="register-mentor">
  <h2 className="login-heading">Register as Mentor</h2>


          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={mentorData.name}
              onChange={handleInputChange}
              className="input-box"
            />
            <input
              type="text"
              placeholder="Expertise"
              name="expertise"
              value={mentorData.expertise}
              onChange={handleInputChange}
              className="input-box"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={mentorData.email}
              onChange={handleInputChange}
              className="input-box"
            />
            <button onClick={handleRegister} className="register-btn">Register</button>
          </div>
          {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
        </div>
      </div>

      <div className="mentor-list">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <h3>{mentor.name}</h3>
              <p>{mentor.expertise}</p>
              <p>{mentor.email}</p>
            </div>
          ))
        ) : (
          <p>No mentors found.</p>
        )}
      </div>

      <div className="upcoming-classes">
        <h2><FaCalendarAlt /> Upcoming Classes</h2>
        <div className="classes-grid">
  {classes.length > 0 ? (
    classes.map((classItem, index) => (
      <div key={index} className="class-item">
        <h3>{classItem.class_name}</h3>  {/* Changed from title to class_name */}
        <p>{classItem.class_details}</p>  {/* Changed from details to class_details */}
        <p><strong>Date:</strong> {classItem.class_date}</p>  {/* Added date */}
        <p><strong>Time:</strong> {classItem.class_time}</p>  {/* Added time */}
        <button className="join-btn" onClick={() => handleJoinClass(classItem)}>Join</button>
      </div>
            ))
          ) : (
            <p>No upcoming classes.</p>
          )}
        </div>
        <div className="add-class-form">
    <h2>Add a New Class</h2>
    <input
      type="text"
      name="title"
      placeholder="Class Title"
      value={newClass.title}
      onChange={handleClassInputChange}
    />
    <input
      type="text"
      name="details"
      placeholder="Class Details"
      value={newClass.details}
      onChange={handleClassInputChange}
    />
    <input
      type="date"
      name="date"
      value={newClass.date}
      onChange={handleClassInputChange}
    />
    <input
      type="time"
      name="time"
      value={newClass.time}
      onChange={handleClassInputChange}
    />
    <button onClick={handleAddClass}>Add Class</button>
    {classMessage && <p>{classMessage}</p>}
  </div>

        {selectedClass && (
          <div className="class-details">
            <h3>Details for {selectedClass.title}</h3>
            <p>{selectedClass.details}</p>
            <p><strong>Date:</strong> {selectedClass.date}</p>
            <p><strong>Time:</strong> {selectedClass.time}</p>
            <button onClick={() => setSelectedClass(null)}>Close</button>
          </div>
          

          
        )}
      </div>
    </div>
  );
};


export default Mentorship;
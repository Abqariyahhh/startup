import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client'; // Import Socket.io client
import axios from 'axios'; // Import Axios
import './TeamCollaboration.css';

const TeamCollaboration = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [startupId] = useState(1); // Example startup_id
  const [collabTitle, setCollabTitle] = useState('');
  const [collabDescription, setCollabDescription] = useState('');
  const [jobPostings, setJobPostings] = useState([]);
  const [collabRequests, setCollabRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Pitching investors state
  const [pitchTitle, setPitchTitle] = useState('');
  const [pitchDescription, setPitchDescription] = useState('');
  const [pitchRequirements, setPitchRequirements] = useState('');
  const [pitchLocation, setPitchLocation] = useState('');
  const [pitchInvestment_Amount, setPitchInvestment_Amount] = useState('');
  const [valuation, setValuation] = useState('');
  const [pitchInvestment_Type, setPitchInvestment_Type] = useState('');
  const [pitchPostings, setPitchPostings] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Initialize socket connection

    // Listen for new job postings
    const handleJobPosted = (newJob) => {
      setJobPostings((prevPostings) => [...prevPostings, newJob]);
    };

    // Listen for new pitch postings
    const handlePitchPosted = (newPitch) => {
      setPitchPostings((prevPostings) => [...prevPostings, newPitch]);
    };

    socket.on('jobPosted', handleJobPosted);
    socket.on('pitchPosted', handlePitchPosted);

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off('jobPosted', handleJobPosted);
      socket.off('pitchPosted', handlePitchPosted);
      socket.disconnect(); // Disconnect socket on unmount
    };
  }, []); // Empty dependency array ensures effect runs only on mount/unmount

  // Handle job submission
  const handleJobSubmit = async () => {
    if (jobTitle && jobDescription && jobRequirements && jobLocation) {
      const newJob = { 
        title: jobTitle, 
        description: jobDescription, 
        requirements: jobRequirements, 
        location: jobLocation, 
        startup_id: startupId,
        comments: [] // Initialize comments array
      };

      try {
        const response = await axios.post('http://localhost:5000/jobs', newJob);
        setJobPostings((prevPostings) => [...prevPostings, response.data]);
        setJobTitle(''); setJobDescription(''); setJobRequirements(''); setJobLocation(''); // Clear inputs
      } catch (error) {
        console.error('Error posting job:', error);
      }
    } else {
      alert('Please fill in all fields for the job posting.');
    }
  };

  // Handle collaboration request submission
  const handleCollabSubmit = () => {
    if (collabTitle && collabDescription) {
      const newCollab = { 
        title: collabTitle, 
        description: collabDescription, 
        comments: [] // Initialize comments array
      };
      setCollabRequests((prevRequests) => [...prevRequests, newCollab]);
      setCollabTitle(''); setCollabDescription(''); // Clear inputs
    } else {
      alert('Please fill in all fields for the collaboration request.');
    }
  };

  // Handle pitch submission
  const handlePitchSubmit = async () => {
    if (pitchTitle && pitchDescription && pitchRequirements && pitchLocation && pitchInvestment_Amount && valuation && pitchInvestment_Type) {
      const newPitch = { 
        title: pitchTitle, 
        description: pitchDescription, 
        requirements: pitchRequirements, 
        location: pitchLocation, 
        valuation, 
        investment_amount: pitchInvestment_Amount, 
        
        investment_type: pitchInvestment_Type, 
        startup_id: startupId,
        comments: [] // Initialize comments array
      };

      try {
        const response = await axios.post('http://localhost:5000/pitches', newPitch);
        console.log('Pitch posted:', response.data); // Log the response data for debugging
        setPitchPostings((prevPostings) => [...prevPostings, response.data]);
        setPitchTitle(''); setPitchDescription(''); setPitchRequirements(''); setPitchLocation('');
        setPitchInvestment_Amount(''); setValuation(''); setPitchInvestment_Type(''); // Clear inputs
      } catch (error) {
        console.error('Error posting pitch:', error);
      }
    } else {
      alert('Please fill in all fields for the pitch.');
    }
  };

  // Handle adding comments to jobs, collaborations, or pitches
  const handleCommentSubmit = (index, comment, type) => {
    const updatedPostings = 
      type === 'job' ? [...jobPostings] : 
      type === 'collab' ? [...collabRequests] : [...pitchPostings];

    updatedPostings[index].comments.push(comment);
    
    // Update the respective state based on the type
    if (type === 'job') {
      setJobPostings(updatedPostings);
    } else if (type === 'collab') {
      setCollabRequests(updatedPostings);
    } else {
      setPitchPostings(updatedPostings);
    }
  };

  return (
    <div className="collaboration-container">
      <h2 className="collab-title">Team Collaboration</h2>

      {/* Search Bar */}
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="content-wrapper">
        {/* Job Posting Section */}
        <div className="section-container">
          <h3>Job Posting</h3>
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <textarea
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Job Requirements"
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
          />
          <input
            type="text"
            placeholder="Job Location"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          />
          <button onClick={handleJobSubmit}>Post Job</button>
          <div>
            {/* Job Postings */}
            {jobPostings
  .filter(job => job && job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) // Add checks for undefined job and job.title
  .map((job, index) => (
    <div key={index}>
      <h4>{job.title}</h4>
      <p>{job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements}</p>
      <p><strong>Location:</strong> {job.location}</p>
      {/* Comments Section */}
      <div>
        <textarea placeholder="Add a comment..." onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            handleCommentSubmit(index, e.target.value, 'job');
            e.target.value = '';
          }
        }} />
        <div>
          {job.comments && job.comments.map((comment, i) => (
            <p key={i}>- {comment}</p>
          ))}
        </div>
      </div>
    </div>
  ))}

          </div>
        </div>

        {/* Collaboration Request Section */}
        <div className="section-container">
          <h3>Collaboration Request</h3>
          <input
            type="text"
            placeholder="Collaboration Title"
            value={collabTitle}
            onChange={(e) => setCollabTitle(e.target.value)}
          />
          <textarea
            placeholder="Collaboration Description"
            value={collabDescription}
            onChange={(e) => setCollabDescription(e.target.value)}
          />
          <button onClick={handleCollabSubmit}>Send Request</button>
          <div>
            {collabRequests
              .filter(collab => collab.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((collab, index) => (
                <div key={index}>
                  <h4>{collab.title}</h4>
                  <p>{collab.description}</p>
                  {/* Comments Section */}
                  <div>
                    <textarea placeholder="Add a comment..." onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        handleCommentSubmit(index, e.target.value, 'collab');
                        e.target.value = '';
                      }
                    }} />
                    <div>
                      {collab.comments && collab.comments.map((comment, i) => (
                        <p key={i}>- {comment}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Pitch to Investors Section */}
        <div className="section-container">
          <h3>Pitch to Investors</h3>
          <input
            type="text"
            placeholder="Pitch Title"
            value={pitchTitle}
            onChange={(e) => setPitchTitle(e.target.value)}
          />
          <textarea
            placeholder="Pitch Description"
            value={pitchDescription}
            onChange={(e) => setPitchDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pitch Requirement"
            value={pitchRequirements}
            onChange={(e) => setPitchRequirements(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pitch Location"
            value={pitchLocation}
            onChange={(e) => setPitchLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Investment Amount"
            value={pitchInvestment_Amount}
            onChange={(e) => setPitchInvestment_Amount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valuation"
            value={valuation}
            onChange={(e) => setValuation(e.target.value)}
          />
           <select 
            value={pitchInvestment_Type} 
            onChange={(e) => setPitchInvestment_Type(e.target.value)}
          >
            <option value="">Select Investment Type</option>
            <option value="debt">Debt</option>
            <option value="equity">Equity</option>
          </select>
          <button onClick={handlePitchSubmit}>Submit Pitch</button>
          <div>
            {pitchPostings
              .filter(pitch => pitch.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((pitch, index) => (
                <div key={index}>
                  <h4>{pitch.title}</h4>
                  <p>{pitch.description}</p>
                  <p><strong>Requirement:</strong> {pitch.requirement}</p>
                  <p><strong>Location:</strong> {pitch.location}</p>
                  
                  <p><strong>Valuation:</strong> {pitch.valuation}</p>
                  <p><strong>Investment Amount:</strong> {pitch.investment_amt}</p>
                  <p><strong>Investment Type:</strong> {pitch.investment_type}</p>
                  {/* Comments Section */}
                  <div>
                    <textarea placeholder="Add a comment..." onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        handleCommentSubmit(index, e.target.value, 'pitch');
                        e.target.value = '';
                      }
                    }} />
                    <div>
                      {pitch.comments && pitch.comments.map((comment, i) => (
                        <p key={i}>- {comment}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;

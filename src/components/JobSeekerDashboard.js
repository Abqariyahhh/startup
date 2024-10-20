import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'; // Import Socket.io client
import './JobSeekerDashboard.css';

const JobSeekerDashboard = () => {
    const [jobListings, setJobListings] = useState([]); // Define state for job listings
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [selectedJob, setSelectedJob] = useState(null); // State for selected job
    const [email, setEmail] = useState(''); // State for email input
    const [resume, setResume] = useState(null); // State for resume file

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ['websocket'], // Forces WebSocket transport
        });
        
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/jobs');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jobs = await response.json(); // Parse JSON
                setJobListings(jobs); // Update state with fetched job listings
            } catch (error) {
                console.error('Error fetching jobs:', error); // Log any errors
            }
        };

        fetchJobs(); // Fetch jobs when component mounts

        // Listen for new job postings
        socket.on('jobPosted', (newJob) => {
            setJobListings((prevListings) => {
                const exists = prevListings.some(job => job.title === newJob.title); // Avoid duplicates
                if (!exists) {
                    return [...prevListings, newJob];
                }
                return prevListings;
            });
        });

        // Clean up socket events and connection when component unmounts
        return () => {
            socket.off('jobPosted');
            socket.disconnect();
        };
    }, []);

    // Handle the Apply button click to open the modal
    const handleApplyClick = (job) => {
        setSelectedJob(job); // Set the selected job
        setShowModal(true); // Show the modal
    };

    // Handle closing the modal
    const closeModal = () => {
        setShowModal(false);
        setEmail('');
        setResume(null);
    };

    // Handle form submission (send email and resume data)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Send the application data to the server or API
        console.log('Applying for job:', selectedJob);
        console.log('Email:', email);
        console.log('Resume:', resume);
        // Reset the form and close the modal
        closeModal();
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Explore your Career Opportunities</h1>

            <div className="dashboard-section">
                <h2 className="section-title">Available Job Listings</h2>
                {jobListings.length === 0 ? (
                    <p>No job listings available at the moment.</p>
                ) : (
                    <ul className="job-listings">
                        {jobListings.map((job, index) => (
                            <li key={index} className="job-listing">
                                <h3>{job.title}</h3>
                                <p>Company: {job.company_name}</p>
                                <p>Description: {job.description}</p>
                                <p>Location: {job.location}</p>
                                <p>Requirements: {job.requirements}</p>
                                <button className="apply-btn" onClick={() => handleApplyClick(job)}>Apply Now</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal for applying to a job */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <h2>Apply for {selectedJob.title}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Upload Resume:
                                <input
                                    type="file"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    required
                                />
                            </label>
                            <button type="submit" className="submit-btn">Submit Application</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSeekerDashboard;

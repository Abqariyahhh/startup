import React, { useState, useEffect } from 'react';
import './StartupHome.css'; // Ensure the CSS styles are defined here
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed: npm install axios

const StartupHomePage = () => {
    // States for different sections
    const [recentInvestors, setRecentInvestors] = useState([]);
    const [upcomingSeminars, setUpcomingSeminars] = useState([]);
    const [latestAds, setLatestAds] = useState([]);
    const [showAdModal, setShowAdModal] = useState(false);
    const [adTitle, setAdTitle] = useState('');
    const [adDescription, setAdDescription] = useState('');
    const [adImage, setAdImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch data when component mounts
    useEffect(() => {
        fetchRecentInvestors();
        fetchUpcomingSeminars(); // Uncommenting to fetch upcoming seminars
        fetchLatestAdvertisements(); // Uncommenting to fetch latest ads
    }, []);

    // Fetch Recent Investors from the database
    const fetchRecentInvestors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/investors'); // Adjust the URL if necessary
            console.log('Fetched investors:', response.data); // Log the response data
            setRecentInvestors(response.data); // Assuming response.data is an array of investors
        } catch (err) {
            console.error('Error fetching investors:', err);
        }
    };

    // Fetch Upcoming Seminars
    const fetchUpcomingSeminars = async () => {
        try {
            const response = await axios.get('http://localhost:5000/seminars'); // Adjust the URL if necessary
            setUpcomingSeminars(response.data);
        } catch (err) {
            console.error('Error fetching seminars:', err);
        }
    };

    // Fetch Latest Advertisements
    const fetchLatestAdvertisements = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/advertisements'); // Adjust the URL if necessary
            setLatestAds(response.data);
        } catch (err) {
            console.error('Error fetching advertisements:', err);
        }
    };

    // Handle Advertisement Submission
    const handleAdSubmit = async (e) => {
        e.preventDefault();
        if (!adTitle || !adDescription || !adImage) {
            setError('Please fill in all fields and upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('title', adTitle);
        formData.append('description', adDescription);
        formData.append('image', adImage);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/advertisements', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLatestAds((prevAds) => [...prevAds, response.data]);
            setShowAdModal(false);
            setAdTitle('');
            setAdDescription('');
            setAdImage(null);
            setError('');
        } catch (err) {
            console.error('Error submitting advertisement:', err);
            setError('Failed to submit advertisement.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="startup-homepage-container">
            <h1 className="homepage-title">Startup Dashboard</h1>

            {/* Recent Activities Section */}
            <div className="activities-section">
                {/* Pitch Investors */}
                <div className="activity-card">
                    <h2>Pitch Investors</h2>
                    <p>Connect with potential investors and showcase your startup.</p>
                    <Link to="/teamcollaboration">
                        <button className="pitch-btn">Pitch now</button>
                    </Link>
                </div>

                {/* Upcoming Seminars */}
                <div className="activity-card">
                    <h2>Upcoming Seminars</h2>
                    {upcomingSeminars.length === 0 ? (
                        <p>No upcoming seminars.</p>
                    ) : (
                        <ul className="seminars-list">
                            {upcomingSeminars.map((seminar, index) => (
                                <li key={index}>
                                    <strong>{seminar.title}</strong>
                                    <p>{seminar.date} - {seminar.location}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Latest Advertisements */}
                <div className="activity-card">
                    <h2>Latest Advertisements</h2>
                    <button className="add-ad-btn" onClick={() => setShowAdModal(true)}>
                        Add Advertisement
                    </button>
                    {latestAds.length === 0 ? (
                        <p>No advertisements available.</p>
                    ) : (
                        <div className="ads-container">
                            {latestAds.map((ad, index) => (
                                <div key={index} className="ad-card">
                                    <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
                                    <h3>{ad.title}</h3>
                                    <p>{ad.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Investors */}
                <div className="activity-card">
                    <h2>Recent Investors</h2>
                    {recentInvestors.length === 0 ? (
                        <p>No recent investors.</p>
                    ) : (
                        <ul className="investors-list">
                            {recentInvestors.map((investor, index) => (
                                <li key={index}>
                                    <strong>{investor.investor_name}</strong>
                                    <p>Expertise: {investor.expertise}</p>
                                    <p>Interested Sectors: {investor.interested_sectors}</p>
                                    <p>What they provide: {investor.provide_to_Entrepreneurs}</p>
                                    <p>Type of company: {investor.type_of_company}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Modal for Adding Advertisement */}
            {showAdModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setShowAdModal(false)}>&times;</span>
                        <h2>Add New Advertisement</h2>
                        <form onSubmit={handleAdSubmit} className="ad-form">
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={adTitle}
                                    onChange={(e) => setAdTitle(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    value={adDescription}
                                    onChange={(e) => setAdDescription(e.target.value)}
                                    required
                                ></textarea>
                            </label>
                            <label>
                                Upload Image:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAdImage(e.target.files[0])}
                                    required
                                />
                            </label>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit" className="submit-ad-btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Advertisement'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartupHomePage;

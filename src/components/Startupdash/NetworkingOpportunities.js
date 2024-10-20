import React, { useState, useEffect } from 'react';
import './NetworkingOpportunities.css';

const NetworkOpportunities = () => {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const events = [
        { id: 1, title: 'Tech Networking Night', date: '2024-09-30', location: 'Virtual', image: 'https://via.placeholder.com/300x150' },
        { id: 2, title: 'Marketing Meetup', date: '2024-10-05', location: 'New York, NY', image: 'https://via.placeholder.com/300x150' },
        { id: 3, title: 'Startup Pitch Day', date: '2024-10-10', location: 'San Francisco, CA', image: 'https://via.placeholder.com/300x150' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 3000); // Change event every 3 seconds

        return () => clearInterval(interval);
    }, [events.length]);

    return (
        <div className="network-opportunities">
            <h2>Network Opportunities</h2>

            {/* Upcoming Networking Events Section */}
            <div className="section">
                <h3>Upcoming Networking Events</h3>
                <div className="event-display">
                    <img src={events[currentEventIndex].image} alt="Event" className="event-image" />
                    <div className="event-item">
                        <strong>{events[currentEventIndex].title}</strong> - {events[currentEventIndex].date} ({events[currentEventIndex].location})
                    </div>
                </div>
            </div>

            {/* Industry Groups and Discussion Forums in the same line */}
            <div className="section content-wrapper">
                <div className="half-section">
                    <h3>Industry Groups</h3>
                    <ul>
                        <li><strong>Web Developers:</strong> A group for web developers to share resources and collaborate.</li>
                        <li><strong>Digital Marketing Pros:</strong> Connect and share insights about digital marketing strategies.</li>
                    </ul>
                </div>
                <div className="half-section">
                    <h3>Discussion Forums</h3>
                    <ul>
                        <li><strong>Best Tools for Remote Work?</strong>: What tools do you find essential for remote work?</li>
                        <li><strong>Latest Trends in AI:</strong>: What trends are you noticing in the AI space?</li>
                    </ul>
                </div>
            </div>

            {/* Success Stories in a grid */}
            <div className="section">
                <h3>Success Stories</h3>
                <div className="success-stories-grid">
                    <div className="story-item">
                        <img src="https://via.placeholder.com/150" alt="John Doe" />
                        <p><strong>John Doe:</strong> Connected with a mentor and landed my dream job!</p>
                    </div>
                    <div className="story-item">
                        <img src="https://via.placeholder.com/150" alt="Jane Smith" />
                        <p><strong>Jane Smith:</strong> Joined a group that helped me improve my coding skills.</p>
                    </div>
                    <div className="story-item">
                        <img src="https://via.placeholder.com/150" alt="Mark Taylor" />
                        <p><strong>Mark Taylor:</strong> Networking at events opened up new business opportunities.</p>
                    </div>
                    <div className="story-item">
                        <img src="https://via.placeholder.com/150" alt="Emma Johnson" />
                        <p><strong>Emma Johnson:</strong> Found the perfect co-founder through a networking event.</p>
                    </div>
                </div>
            </div>

            {/* Networking Tips */}
            <div className="section">
                <h3>Networking Tips</h3>
                <ul>
                    <li>Be genuine and authentic when reaching out.</li>
                    <li>Follow up after meeting someone new.</li>
                    <li>Join groups related to your industry or interests.</li>
                    <li>Attend events regularly to expand your network.</li>
                </ul>
            </div>
        </div>
    );
};

export default NetworkOpportunities;

import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const events = [
    {
      title: "Investor Pitch Day",
      date: "15 Sep 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Zoom",
      description: "Join us for a day of pitching with top investors in the tech industry."
    },
    {
      title: "Product Launch Webinar",
      date: "1 Oct 2024",
      time: "11:00 AM - 12:30 PM",
      location: "Webinar",
      description: "Unveiling our latest product features to boost your business growth."
    },
    {
      title: "Startup Networking Event",
      date: "10 Oct 2024",
      time: "6:00 PM - 9:00 PM",
      location: "WeWork, New York",
      description: "Meet like-minded startup founders and investors for collaboration."
    },
    {
      title: "Tech Conference 2024",
      date: "20 Oct 2024",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      description: "Explore the latest in tech with keynotes from industry leaders."
    }
  ];

  return (
    <div className="upcoming-events-section">
      <h2 className="upcoming-events-title">Upcoming Events</h2>
      <ul className="upcoming-events-list">
        {events.map((event, index) => (
          <li key={index} className="upcoming-event-item">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date-time">
              <span>{event.date}</span> | <span>{event.time}</span>
            </p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
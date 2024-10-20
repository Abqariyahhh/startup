import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Optional, for prop validation
import './Notifications.css';

const Notification = ({ className }) => {
  const [notifications, setNotifications] = useState([
    'New task assigned',
    'Funding update available',
    'Upcoming event: Product launch',
  ]);
  const [showNotifications, setShowNotifications] = useState(true);

  // Function to add a new notification (for demonstration)
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
  };

  if (!notifications.length || !showNotifications) return null;

  return (
    <div 
      className={`notification-popup ${className} ${showNotifications ? 'active' : ''}`} 
      aria-live="polite"
    >
      <button className="close-btn" onClick={() => setShowNotifications(false)}>
        X
      </button>
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">
          {notification}
        </div>
      ))}
      <button onClick={() => addNotification('New notification added!')}>Add Notification</button>
    </div>
  );
};

// Optional: Define PropTypes for type checking
Notification.propTypes = {
  className: PropTypes.string,
};

export default Notification;

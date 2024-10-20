import React, { useState } from 'react';
import axios from 'axios';

const ZoomIntegration = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    topic: '',
    startTime: '',
    duration: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const createMeeting = async () => {
    const { topic, startTime, duration } = meetingDetails;
    if (!topic || !startTime || !duration) {
      alert("Please fill in all fields.");
      return;
    }

    const apiKey = 'YOUR_ZOOM_API_KEY'; // Replace with your API Key
    const apiSecret = 'YOUR_ZOOM_API_SECRET'; // Replace with your API Secret

    const url = 'https://api.zoom.us/v2/users/me/meetings';
    const token = btoa(`${apiKey}:${apiSecret}`); // Basic Auth

    try {
      const response = await axios.post(url, {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: duration,
        timezone: 'UTC',
      }, {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Meeting Created:', response.data);
      alert('Meeting created successfully!');
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Error creating meeting.');
    }
  };

  return (
    <div>
      <h2>Create Zoom Meeting</h2>
      <input
        type="text"
        name="topic"
        placeholder="Meeting Topic"
        value={meetingDetails.topic}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="startTime"
        value={meetingDetails.startTime}
        onChange={handleChange}
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={meetingDetails.duration}
        onChange={handleChange}
      />
      <button onClick={createMeeting}>Create Meeting</button>
    </div>
  );
};

export default ZoomIntegration;

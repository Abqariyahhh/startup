import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarStartup.css'; // Optional: Include your sidebar styles

const Sidebar = () => {
    return (
        <div className="sidebar2">
            <h2>TheFoundershub</h2>
            <ul>
                <li>
                    <Link to="/business-overview">Business Overview</Link>
                </li>
                <li>
                    <Link to="/funding-tracker">Funding Tracker</Link>
                </li>
                {/* Add other sidebar links as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;

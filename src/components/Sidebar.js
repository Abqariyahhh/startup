import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import './Sidebar.css';  // Add your CSS styling

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Investor Dashboard</div>
      <ul className="sidebar-menu">
      <li><Link to="/investor" className="sidebar-item">Home</Link></li>
        <li><Link to="/investor/opportunities" className="sidebar-item">Opportunities</Link></li>
        <li><Link to="/investor/holdings" className="sidebar-item">Holdings</Link></li>
        <li><Link to="/investor/pledges" className="sidebar-item">Pledges</Link></li>
        <li><Link to="/investor/reports" className="sidebar-item">Reports</Link></li>
        <li><Link to="/investor/support" className="sidebar-item">Support</Link></li>
      </ul>
      <div className="sidebar-footer">© 2024 Your Company</div>
    </div>
  );
}

export default Sidebar;
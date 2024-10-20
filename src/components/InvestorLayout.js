import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './InvestorLayout.css';

const InvestorLayout = () => {
  return (
    <div className="investor-layout">
      <Sidebar /> {/* Sidebar present here */}
      <div className="main-content">
        <Outlet /> {/* Renders nested routes like InvestorHomepage */}
      </div>
    </div>
  );
};

export default InvestorLayout;

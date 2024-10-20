import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import JobSeekerDashboard from './components/JobSeekerDashboard'; // Job Seeker dashboard
import DashboardPage from './components/DashboardPage'; // Startup dashboard
import StartupProfile from './components/StartupProfile'; 


// Startup dashboard components
import BusinessOverview from './components/Startupdash/BusinessOverview';
import FundingTracker from './components/Startupdash/FundingTracker';
import ZoomIntegration from './components/Startupdash/ZoomIntegration';
import Mentorship from './components/Startupdash/MentorshipProgram';
import TeamCollaboration from './components/Startupdash/TeamCollaboration';
import FinancialSnapshot from './components/Startupdash/FinancialSnapshot';
import MarketingInsights from './components/Startupdash/MarketingInsights';
import NetworkOpportunities from './components/Startupdash/NetworkingOpportunities';
import NewsUpdates from './components/Startupdash/NewsUpdates';
import SalesForecasting from './components/Startupdash/SalesForecasting';
import StartupHome from './components/Startupdash/StartupHome';

// Investor dashboard components
import InvestorLayout from './components/InvestorLayout'; // Investor layout
import InvestorHomepage from './components/InvestorHomepage';
import Opportunities from './components/Opportunities';
import Holdings from './components/Holdings';
import Pledges from './components/Pledges';
import Reports from './components/Reports';
import Support from './components/Support';

// Context Provider (if still needed)

import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar present across all pages */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/startupprofile" element={<StartupProfile />} />


          {/* Job Seeker Dashboard Route */}
          <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />

          {/* Startup Dashboard Routes */}
          <Route path="/startupdashboard" element={<DashboardPage />} />
          <Route path="/startuphome" element={<StartupHome />} />
          <Route path="/business-overview" element={<BusinessOverview />} />
          <Route path="/funding-tracker" element={<FundingTracker />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/marketinginsights" element={<MarketingInsights />} />
          <Route path="/financialsnapshot" element={<FinancialSnapshot />} />
          <Route path="/teamcollaboration" element={<TeamCollaboration />} />
          <Route path="/networkingopportunities" element={<NetworkOpportunities />} />
          <Route path="/zoomintegration" element={<ZoomIntegration />} />
          <Route path="/newsupdate" element={<NewsUpdates />} />
          <Route path="/salesforecasting" element={<SalesForecasting />} />

          {/* Investor Dashboard Routes */}
          <Route path="/investor/*" element={<InvestorLayout />}>
            <Route index element={<InvestorHomepage />} /> {/* Default investor route */}
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="pledges" element={<Pledges />} />
            <Route path="reports" element={<Reports />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

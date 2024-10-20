import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faMoneyBill, faUsers, faChalkboardTeacher, faClipboardList, faLightbulb, faComments, faNewspaper, faCalendarAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import BusinessOverview from './Startupdash/BusinessOverview';
import FundingTracker from './Startupdash/FundingTracker';
import MentorshipProgram from './Startupdash/MentorshipProgram';
import TeamCollaboration from './Startupdash/TeamCollaboration';
import FinancialSnapshot from './Startupdash/FinancialSnapshot';
import MarketingInsights from './Startupdash/MarketingInsights';
import NetworkingOpportunities from './Startupdash/NetworkingOpportunities';
import NewsUpdates from './Startupdash/NewsUpdates';
import SalesForecasting from './Startupdash/SalesForecasting';
import UpcomingEvents from './Startupdash/UpcomingEvents';
import StartupHome from './Startupdash/StartupHome';
import './DashboardPage.css';

const DashboardPage = () => {
    const [activeSection, setActiveSection] = useState('StartupHome');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const sections = [
        { name: 'StartupHome', icon: faHome },
        { name: 'BusinessOverview', icon: faChartBar },
        { name: 'FundingTracker', icon: faMoneyBill },
        { name: 'MentorshipProgram', icon: faUsers },
        { name: 'TeamCollaboration', icon: faChalkboardTeacher },
        { name: 'FinancialSnapshot', icon: faClipboardList },
        { name: 'MarketingInsights', icon: faLightbulb },
        { name: 'NetworkingOpportunities', icon: faComments },
        { name: 'NewsUpdates', icon: faNewspaper },
        { name: 'SalesForecasting', icon: faChartBar },
        { name: 'UpcomingEvents', icon: faCalendarAlt },
    ];

    const filteredSections = sections.filter(section =>
        section.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'StartupHome':
                return <StartupHome />;
            case 'BusinessOverview':
                return <BusinessOverview />;
            case 'FundingTracker':
                return <FundingTracker />;
            case 'MentorshipProgram':
                return <MentorshipProgram />;
            case 'TeamCollaboration':
                return <TeamCollaboration />;
            case 'FinancialSnapshot':
                return <FinancialSnapshot />;
            case 'MarketingInsights':
                return <MarketingInsights />;
            case 'NetworkingOpportunities':
                return <NetworkingOpportunities />;
            case 'NewsUpdates':
                return <NewsUpdates />;
            case 'SalesForecasting':
                return <SalesForecasting />;
            case 'UpcomingEvents':
                return <UpcomingEvents />;
            default:
                return <StartupHome />;
        }
    };

    return (
        <div className="dashboard-homepage">
            <div className="dashboard-startup-sidebar">
                <div className="dashboard-startup-sidebar-brand">TheFoundershub</div>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        aria-label="Search sections"
                    />
                </div>
                <ul>
                    {filteredSections.map(section => (
                        <li
                            key={section.name}
                            className={activeSection === section.name ? 'active' : ''}
                            onClick={() => setActiveSection(section.name)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setActiveSection(section.name)}
                        >
                            <FontAwesomeIcon icon={section.icon} style={{ marginRight: '10px' }} />
                            {section.name.replace(/([A-Z])/g, ' $1').trim()}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="dashboard-main-content">
                {renderActiveSection()}
            </div>
        </div>
    );
};

export default DashboardPage;

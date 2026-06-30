import React, { useState, useMemo } from 'react';
import { ApplicationTable } from '../components/ApplicationTable';
import { Navbar } from '../components/Navbar';

export interface Application {
  id: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Test' | 'Offer' | 'Rejected';
  date: string;
  jobLink?: string;
  notes: string;
}

interface DashboardPageProps {
  userEmail: string;
  applications: Application[];
  onLogout: () => void;
  onNavigateToCreate: () => void;
  onNavigateToEdit: (id: string) => void;
  onDeleteApplication: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  userEmail,
  applications,
  onLogout,
  onNavigateToCreate,
  onNavigateToEdit,
  onDeleteApplication,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Application['status']>('All');
  const [timeFilter, setTimeFilter] = useState<'AllTime' | 'Today' | 'Last7Days' | 'Last30Days'>('AllTime');

  // KPI Calculations based on Screen 2 Mockup: Total, In Progress, Offers
  const stats = useMemo(() => {
    const total = applications.length;
    // In Progress = Applied + Interview + Test
    const inProgress = applications.filter((app) => 
      app.status === 'Applied' || app.status === 'Interview' || app.status === 'Test'
    ).length;
    // Offers = Offer
    const offers = applications.filter((app) => app.status === 'Offer').length;
    return { total, inProgress, offers };
  }, [applications]);

  // Search, Status, and Time Filter Logic
  const filteredApplications = useMemo(() => {
    const today = new Date();
    
    return applications.filter((app) => {
      // 1. Search filter (matches company or position)
      const matchesSearch =
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase());
      
      // 2. Status filter
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      
      // 3. Time filter
      let matchesTime = true;
      const appDate = new Date(app.date);
      const diffTime = Math.abs(today.getTime() - appDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (timeFilter === 'Today') {
        // Simple comparison of date strings
        const todayStr = today.toISOString().split('T')[0];
        matchesTime = app.date === todayStr;
      } else if (timeFilter === 'Last7Days') {
        matchesTime = diffDays <= 7;
      } else if (timeFilter === 'Last30Days') {
        matchesTime = diffDays <= 30;
      }

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [applications, search, statusFilter, timeFilter]);

  return (
    <div className="app-shell fade-in">
      <Navbar userEmail={userEmail} onLogout={onLogout} />

      {/* Main Dashboard Content */}
      <main className="container dashboard-main">
        {/* Dashboard Title & + New Application button */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <button onClick={onNavigateToCreate} className="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Application
          </button>
        </div>

        {/* 3 Metrics Cards Grid */}
        <div className="stats-grid-3">
          <div className="stat-card-3">
            <span className="stat-label-3">Total Applications</span>
            <span className="stat-value-3">{stats.total}</span>
          </div>
          <div className="stat-card-3">
            <span className="stat-label-3">In Progress</span>
            <span className="stat-value-3">{stats.inProgress}</span>
          </div>
          <div className="stat-card-3">
            <span className="stat-label-3">Offers</span>
            <span className="stat-value-3">{stats.offers}</span>
          </div>
        </div>

        {/* Applications List Title */}
        <h2 className="section-title">Applications</h2>

        {/* Search & Select filters row */}
        <div className="filters-bar-row">
          <div className="search-wrapper">
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search company..."
              className="form-control search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters-dropdown-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Test">Test</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              className="filter-select"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
            >
              <option value="AllTime">All Time</option>
              <option value="Today">Today</option>
              <option value="Last7Days">Last 7 Days</option>
              <option value="Last30Days">Last 30 Days</option>
            </select>
          </div>
        </div>

        <ApplicationTable
          applications={filteredApplications}
          onNavigateToEdit={onNavigateToEdit}
          onDeleteApplication={onDeleteApplication}
        />
      </main>
    </div>
  );
};

import React, { useState, useMemo } from 'react';

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

  const handleDelete = (e: React.MouseEvent, id: string, company: string, position: string) => {
    e.stopPropagation(); // Prevent row click edit navigation
    if (confirm(`Are you sure you want to delete your application for ${position} at ${company}?`)) {
      onDeleteApplication(id);
    }
  };

  const getStatusBadgeClass = (status: Application['status']) => {
    switch (status) {
      case 'Applied': return 'badge badge-applied';
      case 'Interview': return 'badge badge-interview';
      case 'Test': return 'badge badge-test';
      case 'Offer': return 'badge badge-offer';
      case 'Rejected': return 'badge badge-rejected';
      default: return 'badge';
    }
  };

  return (
    <div className="app-shell fade-in">
      {/* Navbar with Hamburger, Title, Avatar */}
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="navbar-left">
            <button className="menu-toggle-btn" title="Menu" onClick={onLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="navbar-brand-title">Job Application Tracker</span>
          </div>
          
          <div className="navbar-right">
            <div className="navbar-avatar-btn" title={`Logged in as ${userEmail}`} onClick={onLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

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

        {/* Table of Applications */}
        {filteredApplications.length === 0 ? (
          <div className="card empty-state">
            <div className="empty-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 13 2 2 4-4" />
              </svg>
            </div>
            <h3>No applications found</h3>
            <p>
              Try adjusting your search query, status filters, or time filters.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th className="actions-heading">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="clickable-row"
                    onClick={() => onNavigateToEdit(app.id)}
                  >
                    <td>
                      <span className="company-name">{app.company}</span>
                    </td>
                    <td>{app.position}</td>
                    <td>
                      <span className={getStatusBadgeClass(app.status)}>{app.status}</span>
                    </td>
                    <td>{app.date}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          onClick={(e) => handleDelete(e, app.id, app.company, app.position)}
                          className="icon-btn icon-btn-danger"
                          title="Delete Application"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

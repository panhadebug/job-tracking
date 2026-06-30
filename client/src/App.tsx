import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import type { Application } from './pages/DashboardPage';
import { CreateApplicationPage } from './pages/CreateApplicationPage';
import { EditApplicationPage } from './pages/EditApplicationPage';
import './App.css';

// Custom seed data precisely matching Screen 2 table rows
const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Frontend Developer',
    status: 'Applied',
    date: '2024-05-10',
    jobLink: 'https://careers.google.com',
    notes: 'Submitted resume and portfolio. Received auto-reply confirmation.',
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Full Stack Engineer',
    status: 'Interview',
    date: '2024-05-08',
    jobLink: 'https://careers.microsoft.com',
    notes: 'Cleared technical phone screening. Preparing for three rounds of live coding panels next week.',
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'SDE Intern',
    status: 'Test',
    date: '2024-05-06',
    jobLink: 'https://amazon.jobs',
    notes: 'Online assessment invitation received. 90 minutes to complete 2 coding challenges.',
  },
  {
    id: '4',
    company: 'Meta',
    position: 'React Developer',
    status: 'Offer',
    date: '2024-04-28',
    jobLink: 'https://metacareers.com',
    notes: 'All interview rounds done. Received official offer letter, review of details in progress.',
  },
  {
    id: '5',
    company: 'Apple',
    position: 'iOS Developer',
    status: 'Rejected',
    date: '2024-04-20',
    jobLink: 'https://apple.com/jobs',
    notes: 'Completed full-loop design interview. Domain alignment issue, rejected.',
  },
];

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'create' | 'edit'>('dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Initialize session and data on load
  useEffect(() => {
    const savedUser = localStorage.getItem('job_tracker_user');
    if (savedUser) {
      setUserEmail(savedUser);
    }

    const savedApps = localStorage.getItem('job_tracker_applications');
    if (savedApps) {
      try {
        const parsedApps = JSON.parse(savedApps) as any[];
        // Make sure existing data conforms to updated status names
        const sanitisedApps = parsedApps.map(app => {
          let status = app.status;
          if (status === 'Interviewing') status = 'Interview';
          if (status === 'Offered') status = 'Offer';
          return {
            id: app.id,
            company: app.company,
            position: app.position,
            status: ['Applied', 'Interview', 'Test', 'Offer', 'Rejected'].includes(status) ? status : 'Applied',
            date: app.date,
            jobLink: app.jobLink || '',
            notes: app.notes || ''
          } as Application;
        });
        setApplications(sanitisedApps);
      } catch (e) {
        setApplications(DEFAULT_APPLICATIONS);
      }
    } else {
      // Default placeholder mockup data
      setApplications(DEFAULT_APPLICATIONS);
      localStorage.setItem('job_tracker_applications', JSON.stringify(DEFAULT_APPLICATIONS));
    }
  }, []);

  // Save applications to localStorage whenever they change
  const saveToStorage = (updatedApps: Application[]) => {
    setApplications(updatedApps);
    localStorage.setItem('job_tracker_applications', JSON.stringify(updatedApps));
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('job_tracker_user', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('job_tracker_user');
    setCurrentPage('dashboard');
  };

  const handleAddApplication = (newApp: Omit<Application, 'id'>) => {
    const appWithId: Application = {
      ...newApp,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
    };
    const updated = [appWithId, ...applications];
    saveToStorage(updated);
    setCurrentPage('dashboard');
  };

  const handleEditApplication = (updatedApp: Application) => {
    const updated = applications.map((app) => (app.id === updatedApp.id ? updatedApp : app));
    saveToStorage(updated);
    setEditingId(null);
    setCurrentPage('dashboard');
  };

  const handleDeleteApplication = (id: string) => {
    const updated = applications.filter((app) => app.id !== id);
    saveToStorage(updated);
  };

  // Router layout
  if (!userEmail) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            userEmail={userEmail}
            applications={applications}
            onLogout={handleLogout}
            onNavigateToCreate={() => setCurrentPage('create')}
            onNavigateToEdit={(id) => {
              setEditingId(id);
              setCurrentPage('edit');
            }}
            onDeleteApplication={handleDeleteApplication}
          />
        );
      case 'create':
        return (
          <CreateApplicationPage
            onSave={handleAddApplication}
            onCancel={() => setCurrentPage('dashboard')}
          />
        );
      case 'edit':
        const appToEdit = applications.find((app) => app.id === editingId);
        if (!appToEdit) {
          setCurrentPage('dashboard');
          return null;
        }
        return (
          <EditApplicationPage
            application={appToEdit}
            onSave={handleEditApplication}
            onCancel={() => {
              setEditingId(null);
              setCurrentPage('dashboard');
            }}
          />
        );
      default:
        return null;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;

import type React from 'react';
import type { Application } from '../pages/DashboardPage';
import { StatusBadge } from './StatusBadge';

interface ApplicationTableProps {
  applications: Application[];
  onNavigateToEdit: (id: string) => void;
  onDeleteApplication: (id: string) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onNavigateToEdit,
  onDeleteApplication,
}) => {
  const handleDelete = (event: React.MouseEvent, application: Application) => {
    event.stopPropagation();

    if (confirm(`Are you sure you want to delete your application for ${application.position} at ${application.company}?`)) {
      onDeleteApplication(application.id);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2h7.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 13 2 2 4-4" />
          </svg>
        </div>
        <h3>No applications found</h3>
        <p>Try adjusting your search query, status filters, or time filters.</p>
      </div>
    );
  }

  return (
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
          {applications.map((application) => (
            <tr
              key={application.id}
              className="clickable-row"
              onClick={() => onNavigateToEdit(application.id)}
            >
              <td>
                <span className="company-name">{application.company}</span>
              </td>
              <td>{application.position}</td>
              <td>
                <StatusBadge status={application.status} />
              </td>
              <td>{application.date}</td>
              <td>
                <div className="actions-cell">
                  <button
                    onClick={(event) => handleDelete(event, application)}
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
  );
};

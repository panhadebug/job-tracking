import React, { useState } from 'react';
import type { Application } from './DashboardPage';

interface CreateApplicationPageProps {
  onSave: (application: Omit<Application, 'id'>) => void;
  onCancel: () => void;
}

export const CreateApplicationPage: React.FC<CreateApplicationPageProps> = ({ onSave, onCancel }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<Application['status'] | ''>('');
  // Initialize date as today's date in local time zone
  const [date, setDate] = useState(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  });
  const [jobLink, setJobLink] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!company.trim() || !position.trim()) {
      setError('Company Name and Position are required fields.');
      return;
    }

    if (!status) {
      setError('Please select an application status.');
      return;
    }

    onSave({
      company: company.trim(),
      position: position.trim(),
      status,
      date,
      jobLink: jobLink.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <div className="container form-page-wrapper">
      {/* Back Button and Title */}
      <div className="back-header">
        <button onClick={onCancel} className="back-btn" title="Back to Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="form-title">Create Application</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-alert">{error}</div>}

          {/* Company Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="company">Company Name *</label>
            <input
              id="company"
              type="text"
              className="form-control"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Position */}
          <div className="form-group">
            <label className="form-label" htmlFor="position">Position *</label>
            <input
              id="position"
              type="text"
              className="form-control"
              placeholder="e.g. Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label" htmlFor="status">Status *</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value as Application['status'])}
              required
            >
              <option value="" disabled>Select status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Test">Test</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Applied Date */}
          <div className="form-group">
            <label className="form-label" htmlFor="date">Applied Date *</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Job Link */}
          <div className="form-group">
            <label className="form-label" htmlFor="jobLink">Job Link</label>
            <input
              id="jobLink"
              type="url"
              className="form-control"
              placeholder="https://..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="form-control"
              placeholder="Add any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Form buttons layout matching mockup */}
          <div className="form-actions-mock">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

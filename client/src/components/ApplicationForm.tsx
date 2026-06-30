import type React from 'react';
import { useEffect, useState } from 'react';
import type { Application } from '../pages/DashboardPage';

type ApplicationDraft = Omit<Application, 'id'>;
type ApplicationFormData = ApplicationDraft & Partial<Pick<Application, 'id'>>;

type ApplicationFormProps =
  | {
      title: string;
      application: Application;
      onSave: (application: Application) => void;
      onCancel: () => void;
    }
  | {
      title: string;
      application?: undefined;
      onSave: (application: ApplicationDraft) => void;
      onCancel: () => void;
    };

const getLocalDateInputValue = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
};

const createEmptyApplication = (): ApplicationFormData => ({
  company: '',
  position: '',
  status: 'Applied',
  date: getLocalDateInputValue(),
  jobLink: '',
  notes: '',
});

const createInitialFormData = (application?: Application): ApplicationFormData => ({
  ...createEmptyApplication(),
  ...application,
  jobLink: application?.jobLink || '',
  notes: application?.notes || '',
});

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  title,
  application,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>(() => createInitialFormData(application));
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(createInitialFormData(application));
    setError('');
  }, [application]);

  const updateField = <Field extends keyof ApplicationFormData>(
    field: Field,
    value: ApplicationFormData[Field],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!formData.company.trim() || !formData.position.trim()) {
      setError('Company Name and Position are required fields.');
      return;
    }

    const payload: ApplicationFormData = {
      ...application,
      company: formData.company.trim(),
      position: formData.position.trim(),
      status: formData.status,
      date: formData.date,
      jobLink: formData.jobLink?.trim() || '',
      notes: formData.notes.trim(),
    };

    if (application) {
      onSave({ ...payload, id: application.id });
      return;
    }

    const { id: _id, ...draft } = payload;
    onSave(draft);
  };

  return (
    <div className="container form-page-wrapper">
      <div className="back-header">
        <button onClick={onCancel} className="back-btn" title="Back to Dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="form-title">{title}</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {error && <div className="form-alert">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="company">Company Name *</label>
            <input
              id="company"
              type="text"
              className="form-control"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={(event) => updateField('company', event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="position">Position *</label>
            <input
              id="position"
              type="text"
              className="form-control"
              placeholder="e.g. Frontend Developer"
              value={formData.position}
              onChange={(event) => updateField('position', event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="status">Status *</label>
            <select
              id="status"
              className="form-control"
              value={formData.status}
              onChange={(event) => updateField('status', event.target.value as Application['status'])}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Test">Test</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">Applied Date *</label>
            <input
              id="date"
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(event) => updateField('date', event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="jobLink">Job Link</label>
            <input
              id="jobLink"
              type="url"
              className="form-control"
              placeholder="https://..."
              value={formData.jobLink}
              onChange={(event) => updateField('jobLink', event.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="form-control"
              placeholder="Add any notes..."
              value={formData.notes}
              onChange={(event) => updateField('notes', event.target.value)}
            />
          </div>

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

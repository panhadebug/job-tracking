import React from 'react';
import { ApplicationForm } from '../components/ApplicationForm';
import type { Application } from './DashboardPage';

interface EditApplicationPageProps {
  application: Application;
  onSave: (application: Application) => void;
  onCancel: () => void;
}

export const EditApplicationPage: React.FC<EditApplicationPageProps> = ({
  application,
  onSave,
  onCancel,
}) => {
  return (
    <ApplicationForm
      title="Edit Application"
      application={application}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

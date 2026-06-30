import React from 'react';
import { ApplicationForm } from '../components/ApplicationForm';
import type { Application } from './DashboardPage';

interface CreateApplicationPageProps {
  onSave: (application: Omit<Application, 'id'>) => void;
  onCancel: () => void;
}

export const CreateApplicationPage: React.FC<CreateApplicationPageProps> = ({ onSave, onCancel }) => {
  return (
    <ApplicationForm
      title="Create Application"
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

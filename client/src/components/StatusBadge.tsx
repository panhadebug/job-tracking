import type { Application } from '../pages/DashboardPage';

interface StatusBadgeProps {
  status: Application['status'];
}

const statusClassNames: Record<Application['status'], string> = {
  Applied: 'badge-applied',
  Interview: 'badge-interview',
  Test: 'badge-test',
  Offer: 'badge-offer',
  Rejected: 'badge-rejected',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <span className={`badge ${statusClassNames[status]}`}>{status}</span>;
};

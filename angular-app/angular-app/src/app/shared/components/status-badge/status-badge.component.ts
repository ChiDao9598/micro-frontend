import { Component, Input } from '@angular/core';

type BadgeStatus =
  | 'healthy' | 'warning' | 'critical' | 'offline'
  | 'success' | 'failed' | 'in-progress' | 'pending' | 'rolled-back'
  | 'critical' | 'high' | 'medium' | 'low' | 'info'
  | 'active' | 'acknowledged' | 'resolved';

const LABELS: Record<string, string> = {
  healthy: 'Healthy', warning: 'Warning', critical: 'Critical', offline: 'Offline',
  success: 'Success', failed: 'Failed', 'in-progress': 'In Progress', pending: 'Pending',
  'rolled-back': 'Rolled Back',
  high: 'High', medium: 'Medium', low: 'Low', info: 'Info',
  active: 'Active', acknowledged: 'Acknowledged', resolved: 'Resolved',
};

@Component({
  selector: 'cdo-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: BadgeStatus;
  get label(): string { return LABELS[this.status] ?? this.status; }
}

import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAlerts } from '../../store/alert.actions';
import { selectAllAlerts, selectAlertsLoading, selectAlertsError, selectActiveCriticalCount } from '../../store/alert.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AlertStatus } from '../../../../shared/models';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './alert-list.component.html',
  styleUrl: './alert-list.component.css',
})
export class AlertListComponent implements OnInit {
  private readonly store = inject(Store);

  private alerts  = toSignal(this.store.select(selectAllAlerts),          { initialValue: [] });
  loading         = toSignal(this.store.select(selectAlertsLoading),       { initialValue: false });
  error           = toSignal(this.store.select(selectAlertsError),         { initialValue: null });
  criticalCount   = toSignal(this.store.select(selectActiveCriticalCount), { initialValue: 0 });

  statusFilter = signal<AlertStatus | 'all'>('all');

  readonly statusOpts = [
    { label: 'All',          value: 'all' as const },
    { label: 'Active',       value: 'active' as const },
    { label: 'Acknowledged', value: 'acknowledged' as const },
    { label: 'Resolved',     value: 'resolved' as const },
  ];

  filtered = computed(() => {
    const f = this.statusFilter();
    return f === 'all' ? this.alerts() : this.alerts().filter(a => a.status === f);
  });

  ngOnInit() { this.store.dispatch(loadAlerts()); }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
}

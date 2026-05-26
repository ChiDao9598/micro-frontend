import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadDeployments } from '../../store/deployment.actions';
import { selectAllDeployments, selectDeploymentsLoading, selectDeploymentsError } from '../../store/deployment.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DeploymentStatus } from '../../../../shared/models';

@Component({
  selector: 'app-deployment-list',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './deployment-list.component.html',
  styleUrl: './deployment-list.component.css',
})
export class DeploymentListComponent implements OnInit {
  private readonly store = inject(Store);

  deployments = toSignal(this.store.select(selectAllDeployments),    { initialValue: [] });
  loading     = toSignal(this.store.select(selectDeploymentsLoading), { initialValue: false });
  error       = toSignal(this.store.select(selectDeploymentsError),   { initialValue: null });

  statusFilter = signal<DeploymentStatus | 'all'>('all');

  readonly statusOpts = [
    { label: 'All',         value: 'all' as const },
    { label: 'Success',     value: 'success' as const },
    { label: 'In Progress', value: 'in-progress' as const },
    { label: 'Failed',      value: 'failed' as const },
  ];

  filtered = computed(() => {
    const f = this.statusFilter();
    return f === 'all' ? this.deployments() : this.deployments().filter(d => d.status === f);
  });

  ngOnInit() { this.store.dispatch(loadDeployments()); }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
}

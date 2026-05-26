import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadDeployments } from '../../store/deployment.actions';
import { selectDeploymentById, selectDeploymentsLoading } from '../../store/deployment.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-deployment-detail',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent, IconComponent],
  templateUrl: './deployment-detail.component.html',
  styleUrl: './deployment-detail.component.css',
})
export class DeploymentDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  deployment = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.store.select(selectDeploymentById(params.get('id') ?? '')))
    )
  );
  loading = toSignal(this.store.select(selectDeploymentsLoading), { initialValue: false });

  ngOnInit() { this.store.dispatch(loadDeployments()); }

  formatDate(d: Date): string {
    return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '—';
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
}

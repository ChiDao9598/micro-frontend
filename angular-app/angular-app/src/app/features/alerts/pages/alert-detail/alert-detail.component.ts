import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadAlerts } from '../../store/alert.actions';
import { selectAlertById, selectAlertsLoading } from '../../store/alert.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-alert-detail',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent, IconComponent],
  templateUrl: './alert-detail.component.html',
  styleUrl: './alert-detail.component.css',
})
export class AlertDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  alert = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.store.select(selectAlertById(params.get('id') ?? '')))
    )
  );
  loading = toSignal(this.store.select(selectAlertsLoading), { initialValue: false });

  ngOnInit() { this.store.dispatch(loadAlerts()); }

  formatDate(d: Date): string {
    return d.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 60) return `${m} minutes ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} hour${h === 1 ? '' : 's'} ago`;
    const d = Math.floor(h / 24);
    return `${d} day${d === 1 ? '' : 's'} ago`;
  }
}

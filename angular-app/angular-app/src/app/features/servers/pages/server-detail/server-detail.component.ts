import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadServers } from '../../store/server.actions';
import { selectServerById, selectServersLoading } from '../../store/server.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-server-detail',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent, IconComponent],
  templateUrl: './server-detail.component.html',
  styleUrl: './server-detail.component.css',
})
export class ServerDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  server  = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.store.select(selectServerById(params.get('id') ?? '')))
    )
  );
  loading = toSignal(this.store.select(selectServersLoading), { initialValue: false });

  ngOnInit() { this.store.dispatch(loadServers()); }

  barColor(val: number): string {
    if (val > 85) return 'crit';
    if (val > 70) return 'warn';
    return 'ok';
  }

  formatDate(d: Date): string {
    return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  }
}

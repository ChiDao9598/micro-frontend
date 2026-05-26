import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadServers } from '../../store/server.actions';
import { selectAllServers, selectServersLoading, selectServersError } from '../../store/server.selectors';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Environment, ServerStatus } from '../../../../shared/models';

@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent, IconComponent],
  templateUrl: './server-list.component.html',
  styleUrl: './server-list.component.css',
})
export class ServerListComponent implements OnInit {
  private readonly store = inject(Store);

  servers = toSignal(this.store.select(selectAllServers),  { initialValue: [] });
  loading = toSignal(this.store.select(selectServersLoading), { initialValue: false });
  error   = toSignal(this.store.select(selectServersError),   { initialValue: null });

  query       = signal('');
  env         = signal<Environment | 'all'>('all');
  status      = signal<ServerStatus | 'all'>('all');
  searchFocus = signal(false);

  readonly envOpts = [
    { label: 'All',        value: 'all' as const },
    { label: 'Production', value: 'production' as const },
    { label: 'Staging',    value: 'staging' as const },
  ];
  readonly statusOpts = [
    { label: 'All',      value: 'all' as const },
    { label: 'Healthy',  value: 'healthy' as const },
    { label: 'Warning',  value: 'warning' as const },
    { label: 'Critical', value: 'critical' as const },
  ];

  filtered = computed(() => {
    const q = this.query().toLowerCase();
    const e = this.env();
    const s = this.status();
    return this.servers().filter(srv =>
      (!q || srv.name.toLowerCase().includes(q) || srv.region.toLowerCase().includes(q)) &&
      (e === 'all' || srv.environment === e) &&
      (s === 'all' || srv.status === s)
    );
  });

  ngOnInit() { this.store.dispatch(loadServers()); }
}

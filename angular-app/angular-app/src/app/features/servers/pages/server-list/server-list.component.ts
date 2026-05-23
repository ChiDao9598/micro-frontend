import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Environment, Server, ServerStatus } from '../../../../shared/models';

@Component({
  selector: 'app-server-list',
  standalone: true,
  imports: [NgClass, StatusBadgeComponent, IconComponent],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Servers</h1>
          <p class="page-sub">{{ filtered().length }} of {{ all().length }} servers</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="search-box" [class.search-box--focus]="searchFocus()">
          <cdo-icon name="magnifying-glass" [size]="13" class="search-icon"/>
          <input class="search-input" type="text" placeholder="Search by name or region…"
                 [value]="query()"
                 (input)="query.set($any($event.target).value)"
                 (focus)="searchFocus.set(true)"
                 (blur)="searchFocus.set(false)"/>
          @if (query()) {
            <button class="search-clear" (click)="query.set('')">
              <cdo-icon name="x-mark" [size]="12"/>
            </button>
          }
        </div>

        <div class="tab-group">
          @for (o of envOpts; track o.value) {
            <button class="tab" [class.tab--active]="env() === o.value"
                    (click)="env.set(o.value)">{{ o.label }}</button>
          }
        </div>

        <div class="tab-group">
          @for (o of statusOpts; track o.value) {
            <button class="tab" [class.tab--active]="status() === o.value"
                    (click)="status.set(o.value)">{{ o.label }}</button>
          }
        </div>
      </div>

      <!-- Table -->
      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Name</th><th>Status</th>
              <th>CPU</th><th>Memory</th>
              <th>Uptime</th><th>Region</th><th>Environment</th>
            </tr>
          </thead>
          <tbody>
            @for (s of filtered(); track s.id) {
              <tr class="tbl-row">
                <td class="cell-name">
                  <span class="mono">{{ s.name }}</span>
                  <span class="ip">{{ s.ipAddress }}</span>
                </td>
                <td><cdo-status-badge [status]="s.status"/></td>
                <td>
                  <div class="metric">
                    <span class="metric-val"
                          [class.metric-val--warn]="s.cpu>70"
                          [class.metric-val--crit]="s.cpu>85">{{ s.cpu }}%</span>
                    <div class="bar">
                      <div class="bar-fill"
                           [style.width.%]="s.cpu"
                           [class.bar-fill--warn]="s.cpu>70"
                           [class.bar-fill--crit]="s.cpu>85"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="metric">
                    <span class="metric-val"
                          [class.metric-val--warn]="s.memory>70"
                          [class.metric-val--crit]="s.memory>85">{{ s.memory }}%</span>
                    <div class="bar">
                      <div class="bar-fill"
                           [style.width.%]="s.memory"
                           [class.bar-fill--warn]="s.memory>70"
                           [class.bar-fill--crit]="s.memory>85"></div>
                    </div>
                  </div>
                </td>
                <td class="uptime">{{ s.uptime }}%</td>
                <td class="region">{{ s.region }}</td>
                <td><span class="env-chip env-chip--{{ s.environment }}">{{ s.environment }}</span></td>
              </tr>
            } @empty {
              <tr><td colspan="7" class="tbl-empty">No servers match your filters</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page { display:flex; flex-direction:column; gap:14px; }
    .page-header { display:flex; align-items:flex-start; justify-content:space-between; }
    .page-title  { font-size:20px; font-weight:700; color:var(--cdo-text); margin:0; }
    .page-sub    { font-size:11px; color:var(--cdo-text-faint); margin:3px 0 0; }

    /* Filters */
    .filters { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .search-box {
      display:flex; align-items:center; gap:7px;
      background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border);
      border-radius:6px; padding:5px 10px; flex:1; max-width:260px;
      transition:border-color .12s;
    }
    .search-box--focus { border-color:var(--cdo-accent); }
    .search-icon  { color:var(--cdo-text-faint); flex-shrink:0; }
    .search-input {
      flex:1; background:none; border:none; outline:none;
      color:var(--cdo-text); font-size:12px; font-family:inherit;
    }
    .search-input::placeholder { color:var(--cdo-text-faint); }
    .search-clear {
      background:none; border:none; color:var(--cdo-text-faint); cursor:pointer;
      padding:0; display:flex; transition:color .1s;
    }
    .search-clear:hover { color:var(--cdo-text-muted); }
    .tab-group {
      display:flex; gap:2px; padding:3px;
      background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border); border-radius:6px;
    }
    .tab {
      padding:4px 10px; border-radius:4px; border:none;
      background:none; color:var(--cdo-text-muted);
      font-size:12px; font-family:inherit; cursor:pointer; transition:all .12s;
    }
    .tab:hover { color:var(--cdo-text); }
    .tab--active {
      background:var(--cdo-bg-tertiary); color:var(--cdo-text);
      border:1px solid var(--cdo-border);
    }

    /* Table */
    .table-wrap {
      background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border);
      border-radius:8px; overflow:hidden; overflow-x:auto;
    }
    .tbl { width:100%; border-collapse:collapse; font-size:12px; }
    .tbl thead tr { background:var(--cdo-bg-tertiary); border-bottom:1px solid var(--cdo-border); }
    .tbl th {
      padding:9px 13px; text-align:left; font-size:10px; font-weight:700;
      color:var(--cdo-text-faint); text-transform:uppercase; letter-spacing:.06em; white-space:nowrap;
    }
    .tbl-row { border-bottom:1px solid var(--cdo-border-subtle,#21262d); transition:background .1s; }
    .tbl-row:last-child { border-bottom:none; }
    .tbl-row:hover { background:var(--cdo-bg-tertiary); }
    .tbl td { padding:9px 13px; vertical-align:middle; }
    .tbl-empty { text-align:center; color:var(--cdo-text-faint); padding:32px !important; }

    /* Cells */
    .cell-name { display:flex; flex-direction:column; gap:2px; }
    .mono   { font-family:monospace; font-size:12px; color:var(--cdo-text); }
    .ip     { font-size:10px; color:var(--cdo-text-faint); font-family:monospace; }
    .metric { display:flex; align-items:center; gap:7px; min-width:80px; }
    .metric-val { font-size:12px; font-weight:600; color:var(--cdo-text); min-width:33px; }
    .metric-val--warn { color:var(--cdo-warning); }
    .metric-val--crit { color:var(--cdo-danger); }
    .bar { flex:1; height:4px; background:var(--cdo-bg-primary); border-radius:2px; overflow:hidden; }
    .bar-fill { height:100%; background:var(--cdo-accent); border-radius:2px; transition:width .3s; }
    .bar-fill--warn { background:var(--cdo-warning); }
    .bar-fill--crit { background:var(--cdo-danger); }
    .uptime { font-family:monospace; font-size:12px; color:var(--cdo-success); }
    .region { font-size:12px; color:var(--cdo-text-muted); }
    .env-chip {
      font-size:10px; font-weight:600; padding:2px 7px; border-radius:3px; white-space:nowrap;
    }
    .env-chip--production  { background:rgba(248,81,73,.12);  color:#f85149; }
    .env-chip--staging     { background:rgba(210,153,34,.12); color:#d29922; }
    .env-chip--development { background:rgba(88,166,255,.12); color:#58a6ff; }
  `]
})
export class ServerListComponent implements OnInit {
  private readonly dataService = inject(MockDataService);

  all    = signal<Server[]>([]);
  query  = signal('');
  env    = signal<Environment | 'all'>('all');
  status = signal<ServerStatus | 'all'>('all');
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
    return this.all().filter(srv =>
      (!q || srv.name.toLowerCase().includes(q) || srv.region.toLowerCase().includes(q)) &&
      (e === 'all' || srv.environment === e) &&
      (s === 'all' || srv.status === s)
    );
  });

  ngOnInit() { this.all.set(this.dataService.getServers()); }
}

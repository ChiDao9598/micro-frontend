import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { Alert, AlertSeverity, AlertStatus } from '../../../../shared/models';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [StatusBadgeComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Alerts</h1>
          <p class="page-sub">{{ filtered().length }} alerts · <span class="txt-danger">{{ criticalCount() }} critical</span></p>
        </div>
      </div>

      <div class="tab-group">
        @for (o of statusOpts; track o.value) {
          <button class="tab" [class.tab--active]="statusFilter() === o.value"
                  (click)="statusFilter.set(o.value)">
            {{ o.label }}
          </button>
        }
      </div>

      <div class="alert-list">
        @for (a of filtered(); track a.id) {
          <div class="alert-card alert-card--{{ a.severity }}">
            <div class="alert-bar"></div>
            <div class="alert-body">
              <div class="alert-top">
                <span class="alert-title">{{ a.title }}</span>
                <div class="alert-badges">
                  <span class="sev-pill sev-pill--{{ a.severity }}">{{ a.severity.toUpperCase() }}</span>
                  <cdo-status-badge [status]="a.status"/>
                </div>
              </div>
              <p class="alert-desc">{{ a.description }}</p>
              <div class="alert-meta">
                <span class="source">Source: <code>{{ a.source }}</code></span>
                <span class="ts">{{ ago(a.timestamp) }}</span>
              </div>
            </div>
          </div>
        } @empty {
          <div class="empty">No alerts match the current filter.</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page { display:flex; flex-direction:column; gap:14px; }
    .page-header { display:flex; align-items:flex-start; justify-content:space-between; }
    .page-title  { font-size:20px; font-weight:700; color:var(--cdo-text); margin:0; }
    .page-sub    { font-size:11px; color:var(--cdo-text-faint); margin:3px 0 0; }
    .txt-danger  { color:var(--cdo-danger); font-weight:600; }

    .tab-group {
      display:flex; gap:2px; padding:3px;
      background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border);
      border-radius:6px; align-self:flex-start;
    }
    .tab {
      padding:4px 12px; border-radius:4px; border:none;
      background:none; color:var(--cdo-text-muted);
      font-size:12px; font-family:inherit; cursor:pointer; transition:all .12s;
    }
    .tab:hover { color:var(--cdo-text); }
    .tab--active { background:var(--cdo-bg-tertiary); color:var(--cdo-text); border:1px solid var(--cdo-border); }

    .alert-list { display:flex; flex-direction:column; gap:8px; }
    .alert-card {
      display:flex; background:var(--cdo-bg-secondary);
      border:1px solid var(--cdo-border); border-radius:8px; overflow:hidden;
      transition:border-color .12s;
    }
    .alert-card:hover { border-color:var(--cdo-text-faint); }
    .alert-bar { width:4px; flex-shrink:0; }
    .alert-card--critical .alert-bar { background:var(--cdo-danger); }
    .alert-card--high     .alert-bar { background:#e5534b; }
    .alert-card--medium   .alert-bar { background:var(--cdo-warning); }
    .alert-card--low      .alert-bar { background:var(--cdo-accent); }
    .alert-card--info     .alert-bar { background:var(--cdo-purple); }

    .alert-body { flex:1; padding:12px 14px; }
    .alert-top {
      display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:6px;
    }
    .alert-title { font-size:13px; font-weight:600; color:var(--cdo-text); }
    .alert-badges { display:flex; align-items:center; gap:6px; flex-shrink:0; }
    .alert-desc { font-size:12px; color:var(--cdo-text-muted); margin:0 0 8px; }
    .alert-meta { display:flex; align-items:center; justify-content:space-between; }
    .source { font-size:11px; color:var(--cdo-text-faint); }
    .source code { font-family:monospace; color:var(--cdo-text-muted); }
    .ts { font-size:11px; color:var(--cdo-text-faint); }
    .sev-pill {
      font-size:9px; font-weight:700; letter-spacing:.05em;
      padding:1px 5px; border-radius:3px;
    }
    .sev-pill--critical { background:rgba(248,81,73,.2);  color:#f85149; }
    .sev-pill--high     { background:rgba(229,83,75,.15); color:#e5534b; }
    .sev-pill--medium   { background:rgba(210,153,34,.15);color:#d29922; }
    .sev-pill--low      { background:rgba(88,166,255,.1); color:#58a6ff; }
    .empty { text-align:center; color:var(--cdo-text-faint); padding:32px 0; font-size:13px; }
  `]
})
export class AlertListComponent implements OnInit {
  private readonly data = inject(MockDataService);

  private allAlerts: Alert[] = [];
  statusFilter = signal<AlertStatus | 'all'>('all');

  readonly statusOpts = [
    { label: 'All',          value: 'all' as const },
    { label: 'Active',       value: 'active' as const },
    { label: 'Acknowledged', value: 'acknowledged' as const },
    { label: 'Resolved',     value: 'resolved' as const },
  ];

  filtered = computed(() => {
    const f = this.statusFilter();
    return f === 'all' ? this.allAlerts : this.allAlerts.filter(a => a.status === f);
  });

  criticalCount = computed(() =>
    this.allAlerts.filter(a => a.severity === 'critical' && a.status === 'active').length
  );

  ngOnInit() { this.allAlerts = this.data.getAlerts(); }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
}

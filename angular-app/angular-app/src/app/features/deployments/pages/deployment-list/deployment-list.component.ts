import { Component, inject, OnInit } from '@angular/core';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { Deployment } from '../../../../shared/models';

@Component({
  selector: 'app-deployment-list',
  standalone: true,
  imports: [StatusBadgeComponent, IconComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Deployments</h1>
          <p class="page-sub">{{ deployments.length }} recent deployments</p>
        </div>
      </div>

      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Service</th><th>Version</th><th>Environment</th>
              <th>Status</th><th>Deployed By</th><th>Started</th><th>Duration</th>
            </tr>
          </thead>
          <tbody>
            @for (d of deployments; track d.id) {
              <tr class="tbl-row">
                <td class="svc">{{ d.service }}</td>
                <td class="mono">{{ d.version }}</td>
                <td><span class="env-chip env-chip--{{ d.environment }}">{{ d.environment }}</span></td>
                <td><cdo-status-badge [status]="d.status"/></td>
                <td class="by">{{ d.deployedBy }}</td>
                <td class="ts">{{ ago(d.startTime) }}</td>
                <td class="dur">{{ d.duration ? d.duration + 's' : '—' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page { display:flex; flex-direction:column; gap:16px; }
    .page-header { display:flex; align-items:flex-start; justify-content:space-between; }
    .page-title { font-size:20px; font-weight:700; color:var(--cdo-text); margin:0; }
    .page-sub   { font-size:11px; color:var(--cdo-text-faint); margin:3px 0 0; }
    .table-wrap {
      background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border);
      border-radius:8px; overflow:hidden; overflow-x:auto;
    }
    .tbl { width:100%; border-collapse:collapse; font-size:12px; }
    .tbl thead tr { background:var(--cdo-bg-tertiary); border-bottom:1px solid var(--cdo-border); }
    .tbl th {
      padding:9px 13px; text-align:left; font-size:10px; font-weight:700;
      color:var(--cdo-text-faint); text-transform:uppercase; letter-spacing:.06em;
    }
    .tbl-row { border-bottom:1px solid var(--cdo-border-subtle,#21262d); transition:background .1s; }
    .tbl-row:last-child { border-bottom:none; }
    .tbl-row:hover { background:var(--cdo-bg-tertiary); }
    .tbl td { padding:9px 13px; vertical-align:middle; color:var(--cdo-text); }
    .svc  { font-weight:500; }
    .mono { font-family:monospace; color:var(--cdo-text-muted); }
    .by   { color:var(--cdo-text-muted); font-size:11px; }
    .ts   { color:var(--cdo-text-faint); font-size:11px; }
    .dur  { font-family:monospace; color:var(--cdo-text-faint); font-size:11px; }
    .env-chip {
      font-size:10px; font-weight:600; padding:2px 7px; border-radius:3px;
    }
    .env-chip--production  { background:rgba(248,81,73,.12);  color:#f85149; }
    .env-chip--staging     { background:rgba(210,153,34,.12); color:#d29922; }
    .env-chip--development { background:rgba(88,166,255,.12); color:#58a6ff; }
  `]
})
export class DeploymentListComponent implements OnInit {
  private readonly data = inject(MockDataService);
  deployments: Deployment[] = [];
  ngOnInit() { this.deployments = this.data.getDeployments(); }
  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { Alert, Deployment, KpiCard, Server, ServerStatus } from '../../../../shared/models';

interface HealthGroup { name: string; status: ServerStatus; count: number; }

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [RouterLink, NgClass, KpiCardComponent, StatusBadgeComponent, IconComponent],
  template: `
    <div class="page">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Overview</h1>
          <p class="page-sub">Infrastructure status · Updated just now</p>
        </div>
        <button class="btn-secondary" (click)="load()">
          <cdo-icon name="arrow-path" [size]="13"/>Refresh
        </button>
      </div>

      <!-- KPI row -->
      <div class="kpi-grid">
        @for (k of kpis; track k.label) { <cdo-kpi-card [kpi]="k"/> }
      </div>

      <!-- Mid row -->
      <div class="mid-row">

        <!-- System health -->
        <div class="card">
          <div class="card-hdr">
            <span class="card-title">System Health</span>
            <span class="card-meta">{{ totalServers }} servers</span>
          </div>
          <div class="card-body">
            @for (g of healthGroups; track g.name) {
              <div class="health-row">
                <span class="health-dot health-dot--{{ g.status }}"></span>
                <span class="health-name">{{ g.name }}</span>
                <span class="health-count">{{ g.count }}</span>
                <cdo-status-badge [status]="g.status"/>
              </div>
            }
          </div>
        </div>

        <!-- Recent deployments -->
        <div class="card">
          <div class="card-hdr">
            <span class="card-title">Recent Deployments</span>
            <a [routerLink]="['../deployments']" class="card-link">View all →</a>
          </div>
          <div class="card-body">
            @for (d of recentDeployments; track d.id) {
              <div class="deploy-row">
                <span class="deploy-icon" [ngClass]="deployIconClass(d.status)">
                  @switch (d.status) {
                    @case ('success')     { <cdo-icon name="check-circle"        [size]="15"/> }
                    @case ('failed')      { <cdo-icon name="x-circle"            [size]="15"/> }
                    @case ('in-progress') { <cdo-icon name="arrow-path"          [size]="15" class="cdo-spin"/> }
                    @case ('rolled-back') { <cdo-icon name="exclamation-triangle" [size]="15"/> }
                    @default              { <cdo-icon name="clock"               [size]="15"/> }
                  }
                </span>
                <div class="deploy-info">
                  <span class="deploy-svc">{{ d.service }}</span>
                  <span class="deploy-ver">{{ d.version }}</span>
                </div>
                <div class="deploy-end">
                  <span class="env-chip env-chip--{{ d.environment }}">{{ d.environment }}</span>
                  <span class="txt-faint txt-xs">{{ ago(d.startTime) }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Recent alerts -->
      <div class="card">
        <div class="card-hdr">
          <span class="card-title">Recent Alerts</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span class="critical-pill">{{ criticalCount }} critical</span>
            <a [routerLink]="['../alerts']" class="card-link">View all →</a>
          </div>
        </div>
        <div class="card-body card-body--flush">
          @for (a of recentAlerts; track a.id) {
            <div class="alert-row alert-row--{{ a.severity }}">
              <span class="alert-bar"></span>
              <div class="alert-info">
                <span class="alert-title">{{ a.title }}</span>
                <span class="alert-src">{{ a.source }}</span>
              </div>
              <div class="alert-end">
                <span class="sev-pill sev-pill--{{ a.severity }}">{{ a.severity.toUpperCase() }}</span>
                <span class="txt-faint txt-xs">{{ ago(a.timestamp) }}</span>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  `,
  styles: [`
    .page { display:flex; flex-direction:column; gap:18px; }

    /* Header */
    .page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
    .page-title  { font-size:20px; font-weight:700; color:var(--cdo-text); margin:0; }
    .page-sub    { font-size:11px; color:var(--cdo-text-faint); margin:3px 0 0; }
    .btn-secondary {
      display:inline-flex; align-items:center; gap:5px;
      padding:6px 13px; border-radius:6px; cursor:pointer; font-family:inherit;
      font-size:12px; font-weight:500;
      background:var(--cdo-bg-tertiary); color:var(--cdo-text-muted);
      border:1px solid var(--cdo-border); transition:all .12s;
    }
    .btn-secondary:hover { color:var(--cdo-text); border-color:var(--cdo-text-faint); }

    /* KPI */
    .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
    @media(max-width:860px) { .kpi-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:480px) { .kpi-grid { grid-template-columns:1fr; } }

    /* Mid row */
    .mid-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    @media(max-width:680px) { .mid-row { grid-template-columns:1fr; } }

    /* Card */
    .card { background:var(--cdo-bg-secondary); border:1px solid var(--cdo-border); border-radius:8px; overflow:hidden; }
    .card-hdr {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 14px; border-bottom:1px solid var(--cdo-border);
    }
    .card-title { font-size:13px; font-weight:600; color:var(--cdo-text); }
    .card-meta  { font-size:11px; color:var(--cdo-text-faint); }
    .card-link  { font-size:12px; color:var(--cdo-accent); text-decoration:none; }
    .card-link:hover { text-decoration:underline; }
    .card-body { padding:4px 0; }
    .card-body--flush { padding:0; }

    /* Health */
    .health-row {
      display:flex; align-items:center; gap:8px;
      padding:8px 14px; transition:background .1s;
    }
    .health-row:hover { background:var(--cdo-bg-tertiary); }
    .health-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
    .health-dot--healthy  { background:var(--cdo-success); }
    .health-dot--warning  { background:var(--cdo-warning); animation:cdo-pulse 1.5s infinite; }
    .health-dot--critical { background:var(--cdo-danger);  animation:cdo-pulse 1s infinite; }
    .health-dot--offline  { background:var(--cdo-text-faint); }
    .health-name  { flex:1; font-size:12px; color:var(--cdo-text); font-family:monospace; }
    .health-count { font-size:11px; color:var(--cdo-text-faint); min-width:18px; text-align:right; }

    /* Deployments */
    .deploy-row {
      display:flex; align-items:center; gap:8px;
      padding:9px 14px; transition:background .1s;
    }
    .deploy-row:hover { background:var(--cdo-bg-tertiary); }
    .deploy-icon { display:flex; flex-shrink:0; }
    .deploy-info { flex:1; display:flex; flex-direction:column; gap:1px; min-width:0; }
    .deploy-svc  { font-size:12px; font-weight:500; color:var(--cdo-text); }
    .deploy-ver  { font-size:11px; color:var(--cdo-text-faint); font-family:monospace; }
    .deploy-end  { display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
    .env-chip {
      font-size:10px; font-weight:600; padding:1px 6px; border-radius:3px;
    }
    .env-chip--production  { background:rgba(248,81,73,.12);  color:#f85149; }
    .env-chip--staging     { background:rgba(210,153,34,.12); color:#d29922; }
    .env-chip--development { background:rgba(88,166,255,.12); color:#58a6ff; }
    .ic-success { color:var(--cdo-success); }
    .ic-danger  { color:var(--cdo-danger); }
    .ic-info    { color:var(--cdo-accent); }
    .ic-warning { color:var(--cdo-warning); }
    .ic-muted   { color:var(--cdo-text-muted); }

    /* Alerts */
    .critical-pill { font-size:11px; color:var(--cdo-danger); font-weight:600; }
    .alert-row {
      display:flex; align-items:center; gap:10px;
      padding:9px 14px;
      border-bottom:1px solid var(--cdo-border-subtle,#21262d);
      transition:background .1s;
    }
    .alert-row:last-child { border-bottom:none; }
    .alert-row:hover { background:var(--cdo-bg-tertiary); }
    .alert-bar { width:3px; height:30px; border-radius:2px; flex-shrink:0; }
    .alert-row--critical .alert-bar { background:var(--cdo-danger); }
    .alert-row--high     .alert-bar { background:#e5534b; }
    .alert-row--medium   .alert-bar { background:var(--cdo-warning); }
    .alert-row--low      .alert-bar { background:var(--cdo-accent); }
    .alert-row--info     .alert-bar { background:var(--cdo-purple); }
    .alert-info  { flex:1; display:flex; flex-direction:column; gap:2px; min-width:0; }
    .alert-title { font-size:12px; font-weight:500; color:var(--cdo-text); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .alert-src   { font-size:10px; color:var(--cdo-text-faint); font-family:monospace; }
    .alert-end   { display:flex; flex-direction:column; align-items:flex-end; gap:3px; flex-shrink:0; }
    .sev-pill {
      font-size:9px; font-weight:700; letter-spacing:.05em;
      padding:1px 5px; border-radius:3px;
    }
    .sev-pill--critical { background:rgba(248,81,73,.2);  color:#f85149; }
    .sev-pill--high     { background:rgba(229,83,75,.15); color:#e5534b; }
    .sev-pill--medium   { background:rgba(210,153,34,.15);color:#d29922; }
    .sev-pill--low      { background:rgba(88,166,255,.1); color:#58a6ff; }
    .sev-pill--info     { background:rgba(188,140,255,.1);color:#bc8cff; }

    /* Utilities */
    .txt-faint { color:var(--cdo-text-faint); }
    .txt-xs    { font-size:11px; }
  `]
})
export class DashboardOverviewComponent implements OnInit {
  private readonly data = inject(MockDataService);

  kpis: KpiCard[]         = [];
  healthGroups: HealthGroup[] = [];
  recentDeployments: Deployment[] = [];
  recentAlerts: Alert[]   = [];
  totalServers = 0;
  criticalCount = 0;

  ngOnInit() { this.load(); }

  load() {
    const servers     = this.data.getServers();
    const deployments = this.data.getDeployments();
    const alerts      = this.data.getAlerts();

    this.totalServers  = servers.length;
    this.criticalCount = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length;

    this.kpis = [
      { label: 'Total Servers',      value: String(servers.length),                                          subtitle: '+2 this week',          trend: 4.3,  iconColor: '#58a6ff' },
      { label: 'Active Deployments', value: String(deployments.filter(d => d.status === 'in-progress').length), subtitle: 'Running now',          iconColor: '#3fb950' },
      { label: 'Open Alerts',        value: String(alerts.filter(a => a.status === 'active').length),         subtitle: `${this.criticalCount} critical`, iconColor: '#f85149' },
      { label: 'Avg Uptime',         value: '99.8%',                                                          subtitle: 'Last 30 days',          iconColor: '#bc8cff' },
    ];

    const groups = [
      { key: 'prod-us-east', filter: (s: Server) => s.name.includes('prod-us-east') },
      { key: 'prod-us-west', filter: (s: Server) => s.name.includes('prod-us-west') },
      { key: 'prod-eu-west', filter: (s: Server) => s.name.includes('prod-eu') },
      { key: 'staging',      filter: (s: Server) => s.environment === 'staging' },
      { key: 'db-cluster',   filter: (s: Server) => s.name.includes('db-cluster') },
    ];
    this.healthGroups = groups.map(g => {
      const ss = servers.filter(g.filter);
      return { name: g.key, status: this.worstStatus(ss), count: ss.length };
    });

    this.recentDeployments = deployments.slice(0, 5);
    this.recentAlerts      = alerts.slice(0, 5);
  }

  deployIconClass(status: string): string {
    const map: Record<string, string> = {
      success: 'ic-success', failed: 'ic-danger',
      'in-progress': 'ic-info', 'rolled-back': 'ic-warning',
    };
    return map[status] ?? 'ic-muted';
  }

  private worstStatus(servers: Server[]): ServerStatus {
    if (servers.some(s => s.status === 'critical')) return 'critical';
    if (servers.some(s => s.status === 'offline'))  return 'offline';
    if (servers.some(s => s.status === 'warning'))  return 'warning';
    return 'healthy';
  }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 1)   return 'just now';
    if (m < 60)  return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24)  return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
}

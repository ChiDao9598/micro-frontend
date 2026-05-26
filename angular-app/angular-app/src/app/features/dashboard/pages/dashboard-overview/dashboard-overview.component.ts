import { Component, OnInit, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { selectAllServers } from '../../../servers/store/server.selectors';
import { selectAllDeployments } from '../../../deployments/store/deployment.selectors';
import { selectAllAlerts } from '../../../alerts/store/alert.selectors';
import { loadServers } from '../../../servers/store/server.actions';
import { loadDeployments } from '../../../deployments/store/deployment.actions';
import { loadAlerts } from '../../../alerts/store/alert.actions';
import { KpiCard, Server, ServerStatus } from '../../../../shared/models';

interface HealthGroup { name: string; status: ServerStatus; count: number; }

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [RouterLink, NgClass, KpiCardComponent, StatusBadgeComponent, IconComponent],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css',
})
export class DashboardOverviewComponent implements OnInit {
  private readonly store = inject(Store);

  private servers     = toSignal(this.store.select(selectAllServers),      { initialValue: [] });
  private deployments = toSignal(this.store.select(selectAllDeployments),  { initialValue: [] });
  private alerts      = toSignal(this.store.select(selectAllAlerts),       { initialValue: [] });

  totalServers  = computed(() => this.servers().length);
  criticalCount = computed(() => this.alerts().filter(a => a.severity === 'critical' && a.status === 'active').length);

  kpis = computed((): KpiCard[] => {
    const servers     = this.servers();
    const deployments = this.deployments();
    const alerts      = this.alerts();
    return [
      { label: 'Total Servers',      value: String(servers.length),                                             subtitle: '+2 this week',     trend: 4.3, iconColor: '#58a6ff' },
      { label: 'Active Deployments', value: String(deployments.filter(d => d.status === 'in-progress').length), subtitle: 'Running now',                  iconColor: '#3fb950' },
      { label: 'Open Alerts',        value: String(alerts.filter(a => a.status === 'active').length),           subtitle: `${this.criticalCount()} critical`, iconColor: '#f85149' },
      { label: 'Avg Uptime',         value: '99.8%',                                                            subtitle: 'Last 30 days',                 iconColor: '#bc8cff' },
    ];
  });

  healthGroups = computed((): HealthGroup[] => {
    const servers = this.servers();
    const groups = [
      { key: 'prod-us-east', filter: (s: Server) => s.name.includes('prod-us-east') },
      { key: 'prod-us-west', filter: (s: Server) => s.name.includes('prod-us-west') },
      { key: 'prod-eu-west', filter: (s: Server) => s.name.includes('prod-eu') },
      { key: 'staging',      filter: (s: Server) => s.environment === 'staging' },
      { key: 'db-cluster',   filter: (s: Server) => s.name.includes('db-cluster') },
    ];
    return groups.map(g => {
      const ss = servers.filter(g.filter);
      return { name: g.key, status: this.worstStatus(ss), count: ss.length };
    });
  });

  recentDeployments = computed(() => this.deployments().slice(0, 5));
  recentAlerts      = computed(() => this.alerts().slice(0, 5));

  ngOnInit() { this.load(); }

  load(): void {
    this.store.dispatch(loadServers());
    this.store.dispatch(loadDeployments());
    this.store.dispatch(loadAlerts());
  }

  deployIconClass(status: string): string {
    const map: Record<string, string> = {
      success: 'ic-success', failed: 'ic-danger',
      'in-progress': 'ic-info', 'rolled-back': 'ic-warning',
    };
    return map[status] ?? 'ic-muted';
  }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  private worstStatus(servers: Server[]): ServerStatus {
    if (servers.some(s => s.status === 'critical')) return 'critical';
    if (servers.some(s => s.status === 'offline'))  return 'offline';
    if (servers.some(s => s.status === 'warning'))  return 'warning';
    return 'healthy';
  }
}

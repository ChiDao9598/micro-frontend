import { Injectable } from '@angular/core';
import { Alert, CostItem, Deployment, KpiCard, LogEntry, Server, UptimeRow } from '../../shared/models';

const now = () => Date.now();

@Injectable({ providedIn: 'root' })
export class MockDataService {

  getServers(): Server[] {
    return [
      { id: '1',  name: 'prod-us-east-01',  environment: 'production', status: 'healthy',  cpu: 45, memory: 62, uptime: 99.9, region: 'US-East', ipAddress: '10.0.1.10', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '2',  name: 'prod-us-east-02',  environment: 'production', status: 'healthy',  cpu: 38, memory: 58, uptime: 99.9, region: 'US-East', ipAddress: '10.0.1.11', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '3',  name: 'prod-us-east-03',  environment: 'production', status: 'warning',  cpu: 87, memory: 71, uptime: 99.8, region: 'US-East', ipAddress: '10.0.1.12', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '4',  name: 'prod-us-east-04',  environment: 'production', status: 'critical', cpu: 94, memory: 89, uptime: 99.7, region: 'US-East', ipAddress: '10.0.1.13', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '5',  name: 'prod-us-west-01',  environment: 'production', status: 'healthy',  cpu: 42, memory: 55, uptime: 99.9, region: 'US-West', ipAddress: '10.0.2.10', os: 'Amazon Linux 2',  lastChecked: new Date(now() - 30_000) },
      { id: '6',  name: 'prod-us-west-02',  environment: 'production', status: 'healthy',  cpu: 35, memory: 51, uptime: 100,  region: 'US-West', ipAddress: '10.0.2.11', os: 'Amazon Linux 2',  lastChecked: new Date(now() - 30_000) },
      { id: '7',  name: 'prod-eu-west-01',  environment: 'production', status: 'healthy',  cpu: 28, memory: 43, uptime: 99.9, region: 'EU-West', ipAddress: '10.1.1.10', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '8',  name: 'prod-eu-west-02',  environment: 'production', status: 'healthy',  cpu: 31, memory: 47, uptime: 99.9, region: 'EU-West', ipAddress: '10.1.1.11', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 30_000) },
      { id: '9',  name: 'staging-us-01',    environment: 'staging',    status: 'healthy',  cpu: 15, memory: 32, uptime: 98.5, region: 'US-East', ipAddress: '10.2.1.10', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 60_000) },
      { id: '10', name: 'staging-us-02',    environment: 'staging',    status: 'warning',  cpu: 72, memory: 68, uptime: 97.2, region: 'US-East', ipAddress: '10.2.1.11', os: 'Ubuntu 22.04',    lastChecked: new Date(now() - 60_000) },
      { id: '11', name: 'db-cluster-01',    environment: 'production', status: 'warning',  cpu: 65, memory: 81, uptime: 99.8, region: 'US-East', ipAddress: '10.0.3.10', os: 'CentOS 7',        lastChecked: new Date(now() - 30_000) },
      { id: '12', name: 'db-cluster-02',    environment: 'production', status: 'healthy',  cpu: 42, memory: 75, uptime: 99.9, region: 'US-East', ipAddress: '10.0.3.11', os: 'CentOS 7',        lastChecked: new Date(now() - 30_000) },
    ];
  }

  getDeployments(): Deployment[] {
    return [
      { id: '1', service: 'api-gateway',      version: 'v2.4.1', environment: 'production', status: 'success',     deployedBy: 'john.doe',   startTime: new Date(now() -   3 * 60_000), duration: 145, commitHash: 'abc1234', branch: 'main' },
      { id: '2', service: 'auth-service',     version: 'v1.8.0', environment: 'production', status: 'success',     deployedBy: 'jane.smith', startTime: new Date(now() -  60 * 60_000), duration: 98,  commitHash: 'def5678', branch: 'main' },
      { id: '3', service: 'frontend',         version: 'v3.2.1', environment: 'staging',    status: 'in-progress', deployedBy: 'dev-team',   startTime: new Date(now() -   2 * 60_000), duration: 0,   commitHash: 'xyz9012', branch: 'feat/dashboard' },
      { id: '4', service: 'worker-service',   version: 'v2.1.0', environment: 'production', status: 'failed',      deployedBy: 'mike.jones', startTime: new Date(now() - 120 * 60_000), duration: 203, commitHash: 'mno3456', branch: 'fix/memory-leak' },
      { id: '5', service: 'notification-svc', version: 'v1.2.3', environment: 'production', status: 'success',     deployedBy: 'alice.wang', startTime: new Date(now() - 180 * 60_000), duration: 87,  commitHash: 'pqr7890', branch: 'main' },
      { id: '6', service: 'data-pipeline',    version: 'v0.8.5', environment: 'production', status: 'rolled-back', deployedBy: 'bob.chen',   startTime: new Date(now() - 240 * 60_000), duration: 310, commitHash: 'stu1234', branch: 'fix/schema' },
    ];
  }

  getAlerts(): Alert[] {
    return [
      { id: '1', title: 'High CPU usage on prod-us-east-04',         description: 'CPU at 94% for 15+ min — threshold 85%.', severity: 'critical', status: 'active',       source: 'prod-us-east-04', timestamp: new Date(now() -   2 * 60_000) },
      { id: '2', title: 'Memory threshold exceeded on db-cluster-01', description: 'Memory at 81%, approaching critical (90%).',  severity: 'high',     status: 'active',       source: 'db-cluster-01',   timestamp: new Date(now() -  15 * 60_000) },
      { id: '3', title: 'SSL certificate expiring in 7 days',         description: 'api.prod.com cert expires 2024-01-28.',       severity: 'medium',   status: 'active',       source: 'api.prod.com',    timestamp: new Date(now() -  60 * 60_000) },
      { id: '4', title: 'Deployment failure: worker-service v2.1.0',  description: 'Health check failed during rollout.',         severity: 'high',     status: 'acknowledged', source: 'worker-service',  timestamp: new Date(now() - 120 * 60_000) },
      { id: '5', title: 'Response time degradation on /api/v2/users', description: 'P95 latency +340 ms over baseline.',          severity: 'medium',   status: 'active',       source: 'api-gateway',     timestamp: new Date(now() - 150 * 60_000) },
      { id: '6', title: 'Disk usage at 73% on prod-us-east-02',       description: 'Trending to 90% in ~3 days.',                 severity: 'low',      status: 'active',       source: 'prod-us-east-02', timestamp: new Date(now() - 180 * 60_000) },
      { id: '7', title: 'DB connection pool exhausted on db-cluster-01', description: 'Reached max connections — auto-resolved.', severity: 'critical', status: 'resolved',     source: 'db-cluster-01',   timestamp: new Date(now() -   5 * 3600_000) },
    ];
  }

  getLogs(): LogEntry[] {
    return [
      { id: '1', timestamp: new Date(now() -   5_000), level: 'INFO',  service: 'api-gateway',      message: 'POST /api/v2/auth/login → 200 OK [45 ms]' },
      { id: '2', timestamp: new Date(now() -  12_000), level: 'WARN',  service: 'auth-service',     message: 'Rate limit nearing for 192.168.1.105 (450/500)' },
      { id: '3', timestamp: new Date(now() -  28_000), level: 'ERROR', service: 'worker-service',   message: 'Uncaught exception: connection timeout after 30 s' },
      { id: '4', timestamp: new Date(now() -  45_000), level: 'INFO',  service: 'notification-svc', message: 'Email batch sent to 1 247 subscribers [batch-id: abc123]' },
      { id: '5', timestamp: new Date(now() -  72_000), level: 'DEBUG', service: 'data-pipeline',    message: 'Checkpoint: 50 000 / 128 432 records (38.9 %)' },
      { id: '6', timestamp: new Date(now() -  95_000), level: 'ERROR', service: 'frontend',         message: 'Build failed: Module not found "@org/shared-ui@2.1.0"' },
      { id: '7', timestamp: new Date(now() - 120_000), level: 'INFO',  service: 'api-gateway',      message: 'Health check passed — 12/12 upstreams healthy' },
      { id: '8', timestamp: new Date(now() - 145_000), level: 'WARN',  service: 'db-cluster-01',    message: 'Slow query: SELECT * FROM events WHERE… [2 847 ms]' },
    ];
  }

  // ── Analytics ─────────────────────────────────────────────────────────────

  getAnalyticsKpis(): KpiCard[] {
    return [
      { label: 'Avg CPU',    value: '52%',    subtitle: 'Prod servers · 24h avg',  trend: 3.2,  iconColor: '#58a6ff' },
      { label: 'Avg Memory', value: '68%',    subtitle: 'Prod servers · 24h avg',  trend: 1.5,  iconColor: '#bc8cff' },
      { label: 'Peak Req',   value: '910/m',  subtitle: 'Requests/min · today',    trend: 8.4,  iconColor: '#3fb950' },
      { label: 'Avg Uptime', value: '99.87%', subtitle: 'All services · 30d avg',  trend: 0,    iconColor: '#58a6ff' },
    ];
  }

  getCpuMemTrend(): { labels: string[]; cpu: number[]; memory: number[] } {
    const labels = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ':00');
    const cpu    = [42, 38, 35, 33, 31, 30, 34, 45, 58, 67, 71, 68, 65, 70, 72, 68, 65, 71, 74, 69, 61, 55, 50, 46];
    const memory = [62, 61, 60, 59, 58, 58, 60, 63, 67, 70, 72, 73, 72, 73, 74, 73, 72, 74, 75, 74, 72, 70, 67, 64];
    return { labels, cpu, memory };
  }

  getRequestRate(): { labels: string[]; values: number[] } {
    const labels = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0') + ':00');
    const values = [120, 80, 60, 45, 35, 30, 55, 180, 420, 680, 820, 890, 760, 810, 850, 830, 780, 820, 910, 870, 720, 540, 380, 220];
    return { labels, values };
  }

  getUptimeHeatmap(): UptimeRow[] {
    const full = (incidents: [number, number][]): number[] => {
      const days = Array(30).fill(99.99) as number[];
      for (const [d, v] of incidents) { days[d] = v; }
      return days;
    };
    return [
      { service: 'api-gateway',      days: full([[12, 99.72], [13, 99.85]]) },
      { service: 'auth-service',     days: full([[5,  98.90], [6,  99.45]]) },
      { service: 'frontend',         days: full([[19, 99.60]]) },
      { service: 'worker-service',   days: full([[8,  97.30], [9,  98.80], [22, 99.50]]) },
      { service: 'notification-svc', days: full([]) },
      { service: 'data-pipeline',    days: full([[15, 99.20], [16, 99.70]]) },
      { service: 'db-cluster',       days: full([[28, 99.55], [29, 99.80]]) },
    ];
  }

  getCostBreakdown(): CostItem[] {
    return [
      { service: 'db-cluster',       compute: 960, storage: 720, bandwidth:  25, total: 1705 },
      { service: 'data-pipeline',    compute: 720, storage: 480, bandwidth:  40, total: 1240 },
      { service: 'api-gateway',      compute: 840, storage: 120, bandwidth:  95, total: 1055 },
      { service: 'worker-service',   compute: 560, storage: 200, bandwidth:  30, total:  790 },
      { service: 'auth-service',     compute: 420, storage:  60, bandwidth:  45, total:  525 },
      { service: 'frontend',         compute: 180, storage:  40, bandwidth: 280, total:  500 },
      { service: 'notification-svc', compute: 240, storage:  80, bandwidth:  60, total:  380 },
    ];
  }
}

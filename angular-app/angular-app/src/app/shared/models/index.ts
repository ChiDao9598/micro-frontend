export type ServerStatus    = 'healthy' | 'warning' | 'critical' | 'offline';
export type Environment     = 'production' | 'staging' | 'development';
export type DeploymentStatus = 'success' | 'failed' | 'in-progress' | 'pending' | 'rolled-back';
export type AlertSeverity   = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type AlertStatus     = 'active' | 'acknowledged' | 'resolved';
export type LogLevel        = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export interface Server {
  id: string;
  name: string;
  environment: Environment;
  status: ServerStatus;
  cpu: number;       // 0–100 %
  memory: number;    // 0–100 %
  uptime: number;    // 0–100 %
  region: string;
  ipAddress: string;
  os: string;
  lastChecked: Date;
}

export interface Deployment {
  id: string;
  service: string;
  version: string;
  environment: Environment;
  status: DeploymentStatus;
  deployedBy: string;
  startTime: Date;
  duration: number;   // seconds
  commitHash: string;
  branch: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  timestamp: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  service: string;
  message: string;
}

export interface KpiCard {
  label: string;
  value: string;
  subtitle: string;
  trend?: number;       // positive = up, negative = down
  iconColor: string;    // hex colour for the icon dot
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

export interface UptimeRow {
  service: string;
  days: number[];  // 30 uptime % values, index 0 = 30 days ago
}

export interface CostItem {
  service: string;
  compute: number;
  storage: number;
  bandwidth: number;
  total: number;
}

import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login.component')
      .then(m => m.LoginComponent),
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-overview/dashboard-overview.component')
          .then(m => m.DashboardOverviewComponent),
      },
      {
        path: 'servers',
        loadComponent: () => import('./features/servers/pages/server-list/server-list.component')
          .then(m => m.ServerListComponent),
      },
      {
        path: 'servers/:id',
        loadComponent: () => import('./features/servers/pages/server-detail/server-detail.component')
          .then(m => m.ServerDetailComponent),
      },
      {
        path: 'deployments',
        loadComponent: () => import('./features/deployments/pages/deployment-list/deployment-list.component')
          .then(m => m.DeploymentListComponent),
      },
      {
        path: 'deployments/:id',
        loadComponent: () => import('./features/deployments/pages/deployment-detail/deployment-detail.component')
          .then(m => m.DeploymentDetailComponent),
      },
      {
        path: 'alerts',
        loadComponent: () => import('./features/alerts/pages/alert-list/alert-list.component')
          .then(m => m.AlertListComponent),
      },
      {
        path: 'alerts/:id',
        loadComponent: () => import('./features/alerts/pages/alert-detail/alert-detail.component')
          .then(m => m.AlertDetailComponent),
      },
      {
        path: 'logs',
        loadComponent: () => import('./features/logs/pages/logs-view/logs-view.component')
          .then(m => m.LogsViewComponent),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/analytics/pages/analytics-overview/analytics-overview.component')
          .then(m => m.AnalyticsOverviewComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/pages/settings-page/settings-page.component')
          .then(m => m.SettingsPageComponent),
      },
    ],
  },
];

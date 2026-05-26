import { SettingsState } from '../features/settings/store/settings.reducer';
import { ServerState } from '../features/servers/store/server.reducer';
import { DeploymentState } from '../features/deployments/store/deployment.reducer';
import { AlertState } from '../features/alerts/store/alert.reducer';
import { AuthState } from '../core/auth/store/auth.reducer';

export interface AppState {
  settings:    SettingsState;
  servers:     ServerState;
  deployments: DeploymentState;
  alerts:      AlertState;
  auth:        AuthState;
}

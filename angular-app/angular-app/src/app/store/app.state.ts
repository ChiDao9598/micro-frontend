import { SettingsState } from '../features/settings/store/settings.reducer';
import { ServerState } from '../features/servers/store/server.reducer';
import { AuthState } from '../core/auth/store/auth.reducer';

export interface AppState {
  settings: SettingsState;
  servers:  ServerState;
  auth:     AuthState;
}

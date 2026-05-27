import '@angular/compiler';
import 'zone.js';
import './styles.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { settingsReducer } from './app/features/settings/store/settings.reducer';
import { serverReducer } from './app/features/servers/store/server.reducer';
import { deploymentReducer } from './app/features/deployments/store/deployment.reducer';
import { alertReducer } from './app/features/alerts/store/alert.reducer';
import { authReducer } from './app/core/auth/store/auth.reducer';
import { logReducer } from './app/features/logs/store/log.reducer';
import { SettingsEffects } from './app/features/settings/store/settings.effects';
import { ServerEffects } from './app/features/servers/store/server.effects';
import { DeploymentEffects } from './app/features/deployments/store/deployment.effects';
import { AlertEffects } from './app/features/alerts/store/alert.effects';
import { AuthEffects } from './app/core/auth/store/auth.effects';
import { LogEffects } from './app/features/logs/store/log.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideStore({ settings: settingsReducer, servers: serverReducer, deployments: deploymentReducer, alerts: alertReducer, auth: authReducer, logs: logReducer }),
    provideEffects([SettingsEffects, ServerEffects, DeploymentEffects, AlertEffects, AuthEffects, LogEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
}).catch(console.error);

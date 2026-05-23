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
import { authReducer } from './app/core/auth/store/auth.reducer';
import { SettingsEffects } from './app/features/settings/store/settings.effects';
import { ServerEffects } from './app/features/servers/store/server.effects';
import { AuthEffects } from './app/core/auth/store/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideStore({ settings: settingsReducer, servers: serverReducer, auth: authReducer }),
    provideEffects([SettingsEffects, ServerEffects, AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
}).catch(console.error);

import '@angular/compiler';
import 'zone.js';

document.documentElement.style.setProperty('--cdo-host-offset', '4rem');
import './styles.css';
import { NgZone } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { singleSpaAngular } from 'single-spa-angular';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { settingsReducer } from './app/features/settings/store/settings.reducer';
import { serverReducer } from './app/features/servers/store/server.reducer';
import { authReducer } from './app/core/auth/store/auth.reducer';
import { SettingsEffects } from './app/features/settings/store/settings.effects';
import { ServerEffects } from './app/features/servers/store/server.effects';
import { AuthEffects } from './app/core/auth/store/auth.effects';

const lifecycles = singleSpaAngular({
  bootstrapFunction: () =>
    bootstrapApplication(AppComponent, {
      providers: [
        provideAnimations(),
        provideRouter(routes),
        { provide: APP_BASE_HREF, useValue: '/angular-app' },
        provideStore({ settings: settingsReducer, servers: serverReducer, auth: authReducer }),
        provideEffects([SettingsEffects, ServerEffects, AuthEffects]),
      ],
    }),
  template: '<app-root></app-root>',
  NgZone,
  domElementGetter: () => document.getElementById('single-spa-application') as HTMLElement,
});

export const { bootstrap, mount, unmount } = lifecycles;

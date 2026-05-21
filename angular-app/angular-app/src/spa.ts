import 'zone.js';
import { NgZone } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { singleSpaAngular } from 'single-spa-angular';
import { AppComponent } from './app/app.component';

const lifecycles = singleSpaAngular({
  bootstrapFunction: () => bootstrapApplication(AppComponent),
  template: '<app-root></app-root>',
  NgZone,
  domElementGetter: () => document.getElementById('single-spa-application'),
});

export const { bootstrap, mount, unmount } = lifecycles;
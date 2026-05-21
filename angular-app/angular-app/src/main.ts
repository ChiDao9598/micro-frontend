import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Standalone entry — only used when running this app directly (npm run dev).
// When loaded by the host via Single-SPA, spa.ts is used instead.
bootstrapApplication(AppComponent).catch(console.error);

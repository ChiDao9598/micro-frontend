import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .angular-app {
      padding: 2rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .app-header {
      margin-bottom: 2rem;
    }
    .app-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(221, 0, 49, 0.15);
      color: #DD0031;
      border: 1px solid rgba(221, 0, 49, 0.3);
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .app-header p { color: #888; }
    .app-body {
      max-width: 600px;
      line-height: 1.7;
      color: #ccc;
    }
  `],
  template: `
    <div class="angular-app">
      <div class="app-header">
        <span class="app-badge">Angular 17</span>
        <h1>Angular App</h1>
        <p>This is the Angular micro frontend running inside the host shell.</p>
      </div>
      <div class="app-body">
        <p>
          Build your Angular app content here. This component works both as a
          <strong>standalone app</strong> and as a <strong>micro frontend</strong> inside the host.
        </p>
      </div>
    </div>
  `,
})
export class AppComponent {}

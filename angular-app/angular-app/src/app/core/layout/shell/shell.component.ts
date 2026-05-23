import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopNavComponent } from '../topnav/topnav.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, NgClass, SidebarComponent, TopNavComponent],
  template: `
    <!-- Mobile overlay -->
    @if (mobileOpen()) {
      <div class="shell-overlay" (click)="mobileOpen.set(false)"></div>
    }

    <div class="shell">
      <app-sidebar [isOpen]="mobileOpen()" (closeSidebar)="mobileOpen.set(false)"/>

      <div class="shell__main">
        <app-topnav (menuClick)="toggleMobile()"/>
        <div class="cdo-content shell__content">
          <router-outlet/>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .shell {
      display: flex;
      height: calc(100vh - var(--cdo-host-offset));
      background: var(--cdo-bg-primary);
      border: 1px solid var(--cdo-border);
      border-radius: 8px;
      overflow: hidden;
    }
    .shell__main {
      flex: 1; min-width: 0;
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    .shell__content {
      flex: 1;
      padding: 20px 24px;
      overflow-y: auto;
    }
    .shell-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.55);
      z-index: 35;
    }
    @media (min-width: 768px) { .shell-overlay { display: none; } }
  `]
})
export class ShellComponent {
  mobileOpen = signal(false);

  constructor() {
    inject(ThemeService).init();
  }

  toggleMobile() { this.mobileOpen.update(v => !v); }
}

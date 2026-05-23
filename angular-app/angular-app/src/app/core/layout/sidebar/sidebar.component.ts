import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { NavItem } from '../../../shared/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, IconComponent],
  template: `
    <aside class="sidebar" [class.sidebar--open]="isOpen">

      <!-- Brand -->
      <div class="sidebar__brand">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="var(--cdo-accent)" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="brand-name">CloudOps</span>
        <button class="sidebar__close-btn" (click)="closeSidebar.emit()" aria-label="Close sidebar">
          <cdo-icon name="x-mark" [size]="16"/>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="sidebar__nav">
        <section class="nav-section">
          <span class="nav-section__label">Monitoring</span>
          @for (item of primaryNav; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="nav-item--active"
               [routerLinkActiveOptions]="{ exact: false }"
               class="nav-item">
              <cdo-icon [name]="item.icon" [size]="15"/>
              <span>{{ item.label }}</span>
              @if (item.badge) {
                <span class="nav-badge">{{ item.badge }}</span>
              }
            </a>
          }
        </section>

        <section class="nav-section">
          <span class="nav-section__label">System</span>
          @for (item of systemNav; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="nav-item--active"
               [routerLinkActiveOptions]="{ exact: false }"
               class="nav-item">
              <cdo-icon [name]="item.icon" [size]="15"/>
              <span>{{ item.label }}</span>
            </a>
          }
        </section>
      </nav>

      <!-- Footer / user -->
      <div class="sidebar__footer">
        <div class="user-row">
          <div class="user-avatar">DC</div>
          <div class="user-meta">
            <span class="user-name">Dev User</span>
            <span class="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--cdo-sidebar-width, 200px);
      flex-shrink: 0;
      background: var(--cdo-bg-secondary);
      border-right: 1px solid var(--cdo-border);
      display: flex; flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }
    @media (max-width: 767px) {
      .sidebar {
        position: fixed; left: 0; top: 0; height: 100vh;
        z-index: 40; transform: translateX(-100%);
        transition: transform .2s ease;
      }
      .sidebar--open { transform: translateX(0); }
    }

    /* Brand */
    .sidebar__brand {
      display: flex; align-items: center; gap: 8px;
      padding: 14px 12px; border-bottom: 1px solid var(--cdo-border);
      flex-shrink: 0;
    }
    .brand-icon {
      width: 30px; height: 30px; flex-shrink: 0;
      background: rgba(88,166,255,.1); border: 1px solid rgba(88,166,255,.25);
      border-radius: 7px; display: flex; align-items: center; justify-content: center;
    }
    .brand-name {
      font-size: 13px; font-weight: 700; color: var(--cdo-text); letter-spacing: -.01em;
    }
    .sidebar__close-btn {
      display: none; margin-left: auto; background: none; border: none;
      color: var(--cdo-text-muted); cursor: pointer; padding: 4px; border-radius: 4px;
    }
    @media (max-width: 767px) { .sidebar__close-btn { display: flex; } }

    /* Nav */
    .sidebar__nav {
      flex: 1; padding: 10px 8px;
      display: flex; flex-direction: column; gap: 18px; overflow-y: auto;
    }
    .nav-section { display: flex; flex-direction: column; gap: 1px; }
    .nav-section__label {
      font-size: 10px; font-weight: 700; color: var(--cdo-text-faint);
      letter-spacing: .07em; text-transform: uppercase;
      padding: 0 8px; margin-bottom: 4px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 10px; border-radius: 6px;
      color: var(--cdo-text-muted); text-decoration: none;
      font-size: 13px; font-weight: 500;
      transition: color .12s, background .12s;
    }
    .nav-item:hover { color: var(--cdo-text); background: var(--cdo-bg-tertiary); }
    .nav-item--active { color: var(--cdo-accent) !important; background: rgba(88,166,255,.1) !important; }
    .nav-badge {
      margin-left: auto; background: rgba(248,81,73,.18); color: var(--cdo-danger);
      font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 999px;
    }

    /* Footer */
    .sidebar__footer {
      padding: 10px 12px; border-top: 1px solid var(--cdo-border); flex-shrink: 0;
    }
    .user-row { display: flex; align-items: center; gap: 8px; }
    .user-avatar {
      width: 28px; height: 28px; flex-shrink: 0;
      background: rgba(88,166,255,.15); border: 1px solid rgba(88,166,255,.3);
      border-radius: 6px; color: var(--cdo-accent);
      font-size: 10px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .user-meta { display: flex; flex-direction: column; gap: 1px; }
    .user-name  { font-size: 12px; font-weight: 600; color: var(--cdo-text); }
    .user-role  { font-size: 10px; color: var(--cdo-text-faint); }
  `]
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  readonly primaryNav: NavItem[] = [
    { label: 'Dashboard',   path: 'dashboard',   icon: 'home' },
    { label: 'Servers',     path: 'servers',     icon: 'server' },
    { label: 'Deployments', path: 'deployments', icon: 'rocket' },
    { label: 'Alerts',      path: 'alerts',      icon: 'bell',  badge: 5 },
    { label: 'Logs',        path: 'logs',        icon: 'document-text' },
  ];

  readonly systemNav: NavItem[] = [
    { label: 'Analytics', path: 'analytics', icon: 'chart-bar' },
    { label: 'Settings',  path: 'settings',  icon: 'cog' },
  ];
}

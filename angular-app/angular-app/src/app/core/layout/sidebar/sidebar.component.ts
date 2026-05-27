import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/store/auth.selectors';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { NavItem } from '../../../shared/models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  private user = toSignal(inject(Store).select(selectUser));

  displayName = computed(() => {
    const u = this.user();
    if (!u) return 'User';
    return u.displayName ?? u.email?.split('@')[0] ?? 'User';
  });

  initials = computed(() => this.displayName().slice(0, 2).toUpperCase());

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

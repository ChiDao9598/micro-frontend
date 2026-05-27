import { Component, OnInit, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { loadAlerts } from '../../../features/alerts/store/alert.actions';
import { selectAllAlerts } from '../../../features/alerts/store/alert.selectors';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css',
})
export class TopNavComponent implements OnInit {
  @Output() menuClick = new EventEmitter<void>();

  private store     = inject(Store);
  private user      = toSignal(this.store.select(selectUser));
  private allAlerts = toSignal(this.store.select(selectAllAlerts), { initialValue: [] });

  menuOpen  = signal(false);
  notifOpen = signal(false);

  displayName = computed(() => {
    const u = this.user();
    if (!u) return 'User';
    return u.displayName ?? u.email?.split('@')[0] ?? 'User';
  });

  email    = computed(() => this.user()?.email ?? '');
  initials = computed(() => this.displayName().slice(0, 2).toUpperCase());

  activeAlerts = computed(() =>
    this.allAlerts().filter(a => a.status === 'active').slice(0, 5)
  );

  activeCount = computed(() =>
    this.allAlerts().filter(a => a.status === 'active').length
  );

  ngOnInit() { this.store.dispatch(loadAlerts()); }

  openNotif(): void {
    this.notifOpen.update(v => !v);
    this.menuOpen.set(false);
  }

  openUser(): void {
    this.menuOpen.update(v => !v);
    this.notifOpen.set(false);
  }

  closeAll(): void {
    this.menuOpen.set(false);
    this.notifOpen.set(false);
  }

  doLogout(): void {
    this.menuOpen.set(false);
    this.store.dispatch(logout());
  }

  ago(date: Date): string {
    const m = Math.floor((Date.now() - date.getTime()) / 60_000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
}

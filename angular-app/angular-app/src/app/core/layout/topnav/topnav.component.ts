import { Component, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css',
})
export class TopNavComponent {
  @Output() menuClick = new EventEmitter<void>();

  private store = inject(Store);
  private user  = toSignal(this.store.select(selectUser));

  menuOpen = signal(false);

  displayName = computed(() => {
    const u = this.user();
    if (!u) return 'User';
    return u.displayName ?? u.email?.split('@')[0] ?? 'User';
  });

  email = computed(() => this.user()?.email ?? '');

  initials = computed(() => {
    const name = this.displayName();
    return name.slice(0, 2).toUpperCase();
  });

  doLogout(): void {
    this.menuOpen.set(false);
    this.store.dispatch(logout());
  }
}

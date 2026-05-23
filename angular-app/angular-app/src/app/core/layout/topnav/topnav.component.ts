import { Component, Output, EventEmitter } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [IconComponent],
  template: `
    <header class="topnav">
      <button class="topnav__menu" (click)="menuClick.emit()" aria-label="Toggle sidebar">
        <cdo-icon name="bars-3" [size]="18"/>
      </button>

      <div class="topnav__search">
        <cdo-icon name="magnifying-glass" [size]="13" class="topnav__search-icon"/>
        <input class="topnav__search-input" type="text"
               placeholder="Search resources…" readonly/>
        <kbd class="topnav__kbd">⌘K</kbd>
      </div>

      <div class="topnav__actions">
        <button class="topnav__icon-btn" aria-label="Alerts">
          <cdo-icon name="bell" [size]="16"/>
          <span class="topnav__dot"></span>
        </button>

        <span class="topnav__divider"></span>

        <button class="topnav__user">
          <span class="topnav__avatar">DC</span>
          <span class="topnav__username">Dev User</span>
          <cdo-icon name="chevron-down" [size]="11"/>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .topnav {
      height: var(--cdo-topnav-height, 52px);
      display: flex; align-items: center; gap: 10px;
      padding: 0 14px;
      background: var(--cdo-bg-secondary);
      border-bottom: 1px solid var(--cdo-border);
      flex-shrink: 0;
    }
    .topnav__menu {
      display: none; background: none; border: none;
      color: var(--cdo-text-muted); cursor: pointer; padding: 5px;
      border-radius: 5px; transition: color .12s, background .12s;
    }
    .topnav__menu:hover { color: var(--cdo-text); background: var(--cdo-bg-tertiary); }
    @media (max-width: 767px) { .topnav__menu { display: flex; } }

    .topnav__search {
      flex: 1; max-width: 300px;
      display: flex; align-items: center; gap: 7px;
      background: var(--cdo-bg-primary); border: 1px solid var(--cdo-border);
      border-radius: 6px; padding: 5px 10px; cursor: pointer;
      transition: border-color .12s;
    }
    .topnav__search:hover { border-color: var(--cdo-text-faint); }
    .topnav__search-icon { color: var(--cdo-text-faint); flex-shrink: 0; }
    .topnav__search-input {
      flex: 1; background: none; border: none; outline: none;
      color: var(--cdo-text-muted); font-size: 12px; font-family: inherit; cursor: pointer;
    }
    .topnav__search-input::placeholder { color: var(--cdo-text-faint); }
    .topnav__kbd {
      font-size: 10px; color: var(--cdo-text-faint);
      background: var(--cdo-bg-tertiary); border: 1px solid var(--cdo-border);
      border-radius: 3px; padding: 1px 5px; font-family: inherit;
    }

    .topnav__actions {
      display: flex; align-items: center; gap: 6px; margin-left: auto;
    }
    .topnav__icon-btn {
      position: relative; background: none; border: none;
      color: var(--cdo-text-muted); cursor: pointer; padding: 6px;
      border-radius: 6px; display: flex; transition: color .12s, background .12s;
    }
    .topnav__icon-btn:hover { color: var(--cdo-text); background: var(--cdo-bg-tertiary); }
    .topnav__dot {
      position: absolute; top: 4px; right: 4px;
      width: 6px; height: 6px; background: var(--cdo-danger);
      border-radius: 50%; border: 1.5px solid var(--cdo-bg-secondary);
    }
    .topnav__divider { width: 1px; height: 18px; background: var(--cdo-border); }
    .topnav__user {
      display: flex; align-items: center; gap: 7px;
      background: none; border: none; color: var(--cdo-text-muted); cursor: pointer;
      padding: 4px 8px; border-radius: 6px; font-size: 12px; font-family: inherit;
      transition: color .12s, background .12s;
    }
    .topnav__user:hover { color: var(--cdo-text); background: var(--cdo-bg-tertiary); }
    .topnav__avatar {
      width: 24px; height: 24px;
      background: rgba(88,166,255,.18); border: 1px solid rgba(88,166,255,.3);
      border-radius: 5px; color: var(--cdo-accent);
      font-size: 9px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    @media (max-width: 480px) { .topnav__username { display: none; } }
  `]
})
export class TopNavComponent {
  @Output() menuClick = new EventEmitter<void>();
}

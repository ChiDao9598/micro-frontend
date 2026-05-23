import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTheme } from '../../features/settings/store/settings.selectors';

const DARK: Record<string, string> = {
  '--cdo-bg-primary':   '#0d1117',
  '--cdo-bg-secondary': '#161b22',
  '--cdo-bg-tertiary':  '#21262d',
  '--cdo-border':       '#30363d',
  '--cdo-border-subtle':'#21262d',
  '--cdo-text':         '#e6edf3',
  '--cdo-text-muted':   '#8b949e',
  '--cdo-text-faint':   '#6e7681',
  '--cdo-accent':       '#58a6ff',
  '--cdo-success':      '#3fb950',
  '--cdo-warning':      '#d29922',
  '--cdo-danger':       '#f85149',
  '--cdo-info':         '#388bfd',
  '--cdo-purple':       '#bc8cff',
  '--cdo-orange':       '#ffa657',
};

const LIGHT: Record<string, string> = {
  '--cdo-bg-primary':   '#f0f2f5',
  '--cdo-bg-secondary': '#ffffff',
  '--cdo-bg-tertiary':  '#e8ecf0',
  '--cdo-border':       '#d1d9e0',
  '--cdo-border-subtle':'#e8ecf0',
  '--cdo-text':         '#1c2128',
  '--cdo-text-muted':   '#57606a',
  '--cdo-text-faint':   '#8c959f',
  '--cdo-accent':       '#0969da',
  '--cdo-success':      '#1a7f37',
  '--cdo-warning':      '#9a6700',
  '--cdo-danger':       '#d1242f',
  '--cdo-info':         '#0550ae',
  '--cdo-purple':       '#8250df',
  '--cdo-orange':       '#bc4c00',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private store   = inject(Store);
  private started = false;

  init(): void {
    if (this.started) return;
    this.started = true;
    this.store.select(selectTheme).subscribe(theme => {
      const tokens = theme === 'light' ? LIGHT : DARK;
      const root = document.documentElement;
      for (const [prop, value] of Object.entries(tokens)) {
        root.style.setProperty(prop, value);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { selectTheme, selectNotifications, selectThresholds } from '../../store/settings.selectors';
import { setTheme, updateNotifications, updateThresholds, resetSettings } from '../../store/settings.actions';
import { NotificationSettings, ThresholdSettings } from '../../store/settings.reducer';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
})
export class SettingsPageComponent {
  private store = inject(Store);

  readonly theme$         = this.store.select(selectTheme);
  readonly notifications$ = this.store.select(selectNotifications);
  readonly thresholds$    = this.store.select(selectThresholds);

  readonly severityOptions: Array<{ value: NotificationSettings['minSeverity']; label: string }> = [
    { value: 'low',      label: 'Low & above'      },
    { value: 'medium',   label: 'Medium & above'   },
    { value: 'high',     label: 'High & above'     },
    { value: 'critical', label: 'Critical only'    },
  ];

  setTheme(theme: 'dark' | 'light'): void {
    this.store.dispatch(setTheme({ theme }));
  }

  setNotification(key: keyof NotificationSettings, value: boolean | string): void {
    this.store.dispatch(updateNotifications({ notifications: { [key]: value } as Partial<NotificationSettings> }));
  }

  setThreshold(key: keyof ThresholdSettings, value: number): void {
    this.store.dispatch(updateThresholds({ thresholds: { [key]: value } as Partial<ThresholdSettings> }));
  }

  reset(): void {
    this.store.dispatch(resetSettings());
  }
}

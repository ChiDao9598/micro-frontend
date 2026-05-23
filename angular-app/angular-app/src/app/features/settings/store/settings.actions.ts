import { createAction, props } from '@ngrx/store';
import { NotificationSettings, ThresholdSettings } from './settings.reducer';

export const setTheme = createAction(
  '[Settings] Set Theme',
  props<{ theme: 'dark' | 'light' }>()
);

export const updateNotifications = createAction(
  '[Settings] Update Notifications',
  props<{ notifications: Partial<NotificationSettings> }>()
);

export const updateThresholds = createAction(
  '[Settings] Update Thresholds',
  props<{ thresholds: Partial<ThresholdSettings> }>()
);

export const resetSettings = createAction('[Settings] Reset to Defaults');

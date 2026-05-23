import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectTheme         = createSelector(selectSettingsState, s => s.theme);
export const selectNotifications = createSelector(selectSettingsState, s => s.notifications);
export const selectThresholds    = createSelector(selectSettingsState, s => s.thresholds);

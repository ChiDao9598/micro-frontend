import { createReducer, on } from '@ngrx/store';
import { setTheme, updateNotifications, updateThresholds, resetSettings } from './settings.actions';

export interface NotificationSettings {
  emailEnabled: boolean;
  inAppEnabled: boolean;
  minSeverity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ThresholdSettings {
  cpu: number;          // %
  memory: number;       // %
  disk: number;         // %
  responseTime: number; // ms
}

export interface SettingsState {
  theme: 'dark' | 'light';
  notifications: NotificationSettings;
  thresholds: ThresholdSettings;
}

export const SETTINGS_STORAGE_KEY = 'cdo-settings';

function loadFromStorage(): Partial<SettingsState> {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const defaults: SettingsState = {
  theme: 'dark',
  notifications: {
    emailEnabled: true,
    inAppEnabled: true,
    minSeverity: 'medium',
  },
  thresholds: {
    cpu: 85,
    memory: 90,
    disk: 80,
    responseTime: 1000,
  },
};

export const initialSettingsState: SettingsState = {
  ...defaults,
  ...loadFromStorage(),
};

export const settingsReducer = createReducer(
  initialSettingsState,

  on(setTheme, (state, { theme }) => ({ ...state, theme })),

  on(updateNotifications, (state, { notifications }) => ({
    ...state,
    notifications: { ...state.notifications, ...notifications },
  })),

  on(updateThresholds, (state, { thresholds }) => ({
    ...state,
    thresholds: { ...state.thresholds, ...thresholds },
  })),

  on(resetSettings, () => ({ ...defaults }))
);

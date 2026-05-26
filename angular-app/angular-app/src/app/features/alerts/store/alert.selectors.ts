import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertState, alertAdapter } from './alert.reducer';

export const selectAlertState = createFeatureSelector<AlertState>('alerts');

const { selectAll, selectTotal } = alertAdapter.getSelectors();

export const selectAllAlerts         = createSelector(selectAlertState, selectAll);
export const selectAlertsCount       = createSelector(selectAlertState, selectTotal);
export const selectAlertsLoading     = createSelector(selectAlertState, s => s.loading);
export const selectAlertsError       = createSelector(selectAlertState, s => s.error);
export const selectActiveCriticalCount = createSelector(selectAllAlerts,
  alerts => alerts.filter(a => a.severity === 'critical' && a.status === 'active').length
);

export const selectAlertById = (id: string) =>
  createSelector(selectAlertState, state => state.entities[id] ?? null);

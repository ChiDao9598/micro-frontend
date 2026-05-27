import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogState, logAdapter } from './log.reducer';

export const selectLogState = createFeatureSelector<LogState>('logs');

const { selectAll } = logAdapter.getSelectors();

export const selectAllLogs   = createSelector(selectLogState, selectAll);
export const selectLogsLoading = createSelector(selectLogState, s => s.loading);
export const selectLogsError   = createSelector(selectLogState, s => s.error);

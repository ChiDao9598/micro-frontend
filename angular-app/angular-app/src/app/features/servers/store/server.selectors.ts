import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServerState, serverAdapter } from './server.reducer';

export const selectServerState = createFeatureSelector<ServerState>('servers');

const { selectAll, selectTotal } = serverAdapter.getSelectors();

export const selectAllServers   = createSelector(selectServerState, selectAll);
export const selectServersCount = createSelector(selectServerState, selectTotal);
export const selectServersLoading = createSelector(selectServerState, s => s.loading);
export const selectServersError   = createSelector(selectServerState, s => s.error);

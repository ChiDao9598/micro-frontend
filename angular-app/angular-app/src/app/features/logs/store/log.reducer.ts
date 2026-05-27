import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { LogEntry } from '../../../shared/models';
import { loadLogs, loadLogsSuccess, loadLogsFailure } from './log.actions';

export interface LogState extends EntityState<LogEntry> {
  loading: boolean;
  error: string | null;
}

export const logAdapter: EntityAdapter<LogEntry> = createEntityAdapter<LogEntry>();

export const initialLogState: LogState = logAdapter.getInitialState({
  loading: false,
  error: null,
});

export const logReducer = createReducer(
  initialLogState,

  on(loadLogs, state => ({ ...state, loading: true, error: null })),

  on(loadLogsSuccess, (state, { logs }) =>
    logAdapter.setAll(logs, { ...state, loading: false })
  ),

  on(loadLogsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

import { createAction, props } from '@ngrx/store';
import { LogEntry } from '../../../shared/models';

export const loadLogs        = createAction('[Logs] Load');
export const loadLogsSuccess = createAction('[Logs] Load Success', props<{ logs: LogEntry[] }>());
export const loadLogsFailure = createAction('[Logs] Load Failure', props<{ error: string }>());

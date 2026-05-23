import { createAction, props } from '@ngrx/store';
import { Server } from '../../../shared/models';

export const loadServers        = createAction('[Servers] Load Servers');
export const loadServersSuccess = createAction('[Servers] Load Servers Success', props<{ servers: Server[] }>());
export const loadServersFailure = createAction('[Servers] Load Servers Failure', props<{ error: string }>());

import { createAction, props } from '@ngrx/store';
import { Alert } from '../../../shared/models';

export const loadAlerts        = createAction('[Alerts] Load');
export const loadAlertsSuccess = createAction('[Alerts] Load Success', props<{ alerts: Alert[] }>());
export const loadAlertsFailure = createAction('[Alerts] Load Failure', props<{ error: string }>());

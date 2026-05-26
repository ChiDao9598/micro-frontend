import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Alert } from '../../../shared/models';
import { loadAlerts, loadAlertsSuccess, loadAlertsFailure } from './alert.actions';

export interface AlertState extends EntityState<Alert> {
  loading: boolean;
  error: string | null;
}

export const alertAdapter: EntityAdapter<Alert> = createEntityAdapter<Alert>();

export const initialAlertState: AlertState = alertAdapter.getInitialState({
  loading: false,
  error: null,
});

export const alertReducer = createReducer(
  initialAlertState,

  on(loadAlerts, state => ({ ...state, loading: true, error: null })),

  on(loadAlertsSuccess, (state, { alerts }) =>
    alertAdapter.setAll(alerts, { ...state, loading: false })
  ),

  on(loadAlertsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

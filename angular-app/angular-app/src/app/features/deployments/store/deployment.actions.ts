import { createAction, props } from '@ngrx/store';
import { Deployment } from '../../../shared/models';

export const loadDeployments        = createAction('[Deployments] Load');
export const loadDeploymentsSuccess = createAction('[Deployments] Load Success', props<{ deployments: Deployment[] }>());
export const loadDeploymentsFailure = createAction('[Deployments] Load Failure', props<{ error: string }>());

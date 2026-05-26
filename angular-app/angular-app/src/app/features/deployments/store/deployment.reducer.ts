import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Deployment } from '../../../shared/models';
import { loadDeployments, loadDeploymentsSuccess, loadDeploymentsFailure } from './deployment.actions';

export interface DeploymentState extends EntityState<Deployment> {
  loading: boolean;
  error: string | null;
}

export const deploymentAdapter: EntityAdapter<Deployment> = createEntityAdapter<Deployment>();

export const initialDeploymentState: DeploymentState = deploymentAdapter.getInitialState({
  loading: false,
  error: null,
});

export const deploymentReducer = createReducer(
  initialDeploymentState,

  on(loadDeployments, state => ({ ...state, loading: true, error: null })),

  on(loadDeploymentsSuccess, (state, { deployments }) =>
    deploymentAdapter.setAll(deployments, { ...state, loading: false })
  ),

  on(loadDeploymentsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeploymentState, deploymentAdapter } from './deployment.reducer';

export const selectDeploymentState = createFeatureSelector<DeploymentState>('deployments');

const { selectAll, selectTotal } = deploymentAdapter.getSelectors();

export const selectAllDeployments      = createSelector(selectDeploymentState, selectAll);
export const selectDeploymentsCount    = createSelector(selectDeploymentState, selectTotal);
export const selectDeploymentsLoading  = createSelector(selectDeploymentState, s => s.loading);
export const selectDeploymentsError    = createSelector(selectDeploymentState, s => s.error);

export const selectDeploymentById = (id: string) =>
  createSelector(selectDeploymentState, state => state.entities[id] ?? null);

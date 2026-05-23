import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Server } from '../../../shared/models';
import { loadServers, loadServersSuccess, loadServersFailure } from './server.actions';

export interface ServerState extends EntityState<Server> {
  loading: boolean;
  error: string | null;
}

export const serverAdapter: EntityAdapter<Server> = createEntityAdapter<Server>();

export const initialServerState: ServerState = serverAdapter.getInitialState({
  loading: false,
  error: null,
});

export const serverReducer = createReducer(
  initialServerState,

  on(loadServers, state => ({ ...state, loading: true, error: null })),

  on(loadServersSuccess, (state, { servers }) =>
    serverAdapter.setAll(servers, { ...state, loading: false })
  ),

  on(loadServersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

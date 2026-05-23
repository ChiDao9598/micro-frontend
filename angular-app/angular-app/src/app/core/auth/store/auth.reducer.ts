import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../services/auth.service';
import {
  setUser, login, loginSuccess, loginFailure,
  logout, logoutSuccess,
} from './auth.actions';

export interface AuthState {
  user:        AuthUser | null;
  loading:     boolean;
  error:       string | null;
  initialized: boolean; // true after onAuthStateChanged fires the first time
}

export const initialAuthState: AuthState = {
  user: null, loading: false, error: null, initialized: false,
};

export const authReducer = createReducer(
  initialAuthState,

  // Firebase onAuthStateChanged resolved → mark initialized
  on(setUser, (state, { user }) => ({ ...state, user, initialized: true, loading: false, error: null })),

  on(login,         state       => ({ ...state, loading: true, error: null })),
  on(loginSuccess,  (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(loginFailure,  (state, { error }) => ({ ...state, loading: false, error })),

  on(logout,        state => ({ ...state, loading: true })),
  on(logoutSuccess, state => ({ ...state, user: null, loading: false })),
);

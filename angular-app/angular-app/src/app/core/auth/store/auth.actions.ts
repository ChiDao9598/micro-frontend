import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../services/auth.service';

export const initAuth       = createAction('[Auth] Init');
export const setUser        = createAction('[Auth] Set User',        props<{ user: AuthUser | null }>());

export const login          = createAction('[Auth] Login',           props<{ email: string; password: string }>());
export const loginSuccess   = createAction('[Auth] Login Success',   props<{ user: AuthUser }>());
export const loginFailure   = createAction('[Auth] Login Failure',   props<{ error: string }>());

export const logout         = createAction('[Auth] Logout');
export const logoutSuccess  = createAction('[Auth] Logout Success');

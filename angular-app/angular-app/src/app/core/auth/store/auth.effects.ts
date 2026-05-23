import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  initAuth, setUser,
  login, loginSuccess, loginFailure,
  logout, logoutSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private auth     = inject(AuthService);
  private router   = inject(Router);

  // Subscribe to Firebase onAuthStateChanged — fires immediately with current user
  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      exhaustMap(() =>
        this.auth.authState$().pipe(
          map(user => setUser({ user }))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.auth.login(email, password).pipe(
          map(user => loginSuccess({ user })),
          catchError(err => of(loginFailure({ error: firebaseMessage(err.code) })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() =>
        this.auth.logout().pipe(
          map(() => logoutSuccess()),
          catchError(() => of(logoutSuccess()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}

function firebaseMessage(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Invalid email or password.';
    case 'auth/too-many-requests':  return 'Too many attempts. Try again later.';
    case 'auth/user-disabled':      return 'This account has been disabled.';
    default:                        return 'Authentication failed. Please try again.';
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { selectAuthState } from '../store/auth.selectors';

// Wait for Firebase to resolve the initial auth state before allowing navigation.
// If no user is present after initialization, redirect to /login.
export const authGuard: CanActivateFn = () => {
  const store  = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthState).pipe(
    filter(state => state.initialized),
    take(1),
    map(state => state.user ? true : router.createUrlTree(['/login']))
  );
};

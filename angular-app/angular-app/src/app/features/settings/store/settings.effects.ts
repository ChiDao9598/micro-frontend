import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import { setTheme, updateNotifications, updateThresholds, resetSettings } from './settings.actions';
import { selectSettingsState } from './settings.selectors';
import { SETTINGS_STORAGE_KEY } from './settings.reducer';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions);
  private store    = inject(Store);

  persistSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setTheme, updateNotifications, updateThresholds, resetSettings),
        withLatestFrom(this.store.select(selectSettingsState)),
        tap(([, state]) => {
          try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state));
          } catch { /* quota exceeded — ignore */ }
        }),
      ),
    { dispatch: false }
  );
}

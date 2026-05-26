import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../../core/services/mock-data.service';
import { loadAlerts, loadAlertsSuccess, loadAlertsFailure } from './alert.actions';

@Injectable()
export class AlertEffects {
  private actions$ = inject(Actions);
  private svc      = inject(MockDataService);

  loadAlerts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlerts),
      switchMap(() =>
        of(this.svc.getAlerts()).pipe(
          map(alerts => loadAlertsSuccess({ alerts })),
          catchError(e => of(loadAlertsFailure({ error: String(e) })))
        )
      )
    )
  );
}

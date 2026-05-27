import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../../core/services/mock-data.service';
import { loadLogs, loadLogsSuccess, loadLogsFailure } from './log.actions';

@Injectable()
export class LogEffects {
  private actions$ = inject(Actions);
  private svc      = inject(MockDataService);

  loadLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLogs),
      switchMap(() =>
        of(this.svc.getLogs()).pipe(
          map(logs => loadLogsSuccess({ logs })),
          catchError(e => of(loadLogsFailure({ error: String(e) })))
        )
      )
    )
  );
}

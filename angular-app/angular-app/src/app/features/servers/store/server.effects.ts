import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../../core/services/mock-data.service';
import { loadServers, loadServersSuccess, loadServersFailure } from './server.actions';

@Injectable()
export class ServerEffects {
  private actions$ = inject(Actions);
  private svc      = inject(MockDataService);

  loadServers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadServers),
      switchMap(() =>
        of(this.svc.getServers()).pipe(
          map(servers => loadServersSuccess({ servers })),
          catchError(e => of(loadServersFailure({ error: String(e) })))
        )
      )
    )
  );
}

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MockDataService } from '../../../core/services/mock-data.service';
import { loadDeployments, loadDeploymentsSuccess, loadDeploymentsFailure } from './deployment.actions';

@Injectable()
export class DeploymentEffects {
  private actions$ = inject(Actions);
  private svc      = inject(MockDataService);

  loadDeployments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDeployments),
      switchMap(() =>
        of(this.svc.getDeployments()).pipe(
          map(deployments => loadDeploymentsSuccess({ deployments })),
          catchError(e => of(loadDeploymentsFailure({ error: String(e) })))
        )
      )
    )
  );
}

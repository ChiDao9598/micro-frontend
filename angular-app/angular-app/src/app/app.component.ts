import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { initAuth } from './core/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
})
export class AppComponent {
  constructor() {
    inject(Store).dispatch(initAuth());
  }
}

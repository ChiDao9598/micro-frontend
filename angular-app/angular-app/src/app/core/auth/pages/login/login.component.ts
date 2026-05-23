import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { login } from '../../store/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private store = inject(Store);
  private fb    = inject(FormBuilder);

  readonly loading$ = this.store.select(selectAuthLoading);
  readonly error$   = this.store.select(selectAuthError);

  form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  showPassword = false;

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.store.dispatch(login({ email, password }));
  }

  fieldError(name: 'email' | 'password'): string | null {
    const ctrl = this.form.get(name)!;
    if (!ctrl.touched || ctrl.valid) return null;
    if (ctrl.hasError('required'))   return 'This field is required.';
    if (ctrl.hasError('email'))      return 'Enter a valid email address.';
    if (ctrl.hasError('minlength'))  return 'Password must be at least 6 characters.';
    return null;
  }
}

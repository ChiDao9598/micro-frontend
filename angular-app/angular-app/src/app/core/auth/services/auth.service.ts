import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, User,
} from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { firebaseConfig } from '../../../../environments/firebase.config';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth(
    getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  );

  login(email: string, password: string): Observable<AuthUser> {
    return from(
      signInWithEmailAndPassword(this.auth, email, password).then(c => toAuthUser(c.user))
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  authState$(): Observable<AuthUser | null> {
    return new Observable(sub => onAuthStateChanged(
      this.auth,
      user => sub.next(user ? toAuthUser(user) : null),
      err  => sub.error(err),
    ));
  }
}

function toAuthUser(u: User): AuthUser {
  return { uid: u.uid, email: u.email, displayName: u.displayName };
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, catchError, of, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backednUrl = 'http://localhost:3000/auth';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  isLoggedIn$ = new Subject<boolean>();

  login(email: string, password: string) {
    return this.http.post(`${this.backednUrl}/login`, { email, password }).pipe(
      tap((res) => this.setSession(res)),
      catchError(this.handleError({}))
    );
  }

  isLoggedIn() {
    const expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn) {
      this.isLoggedIn$.next(Date.now() < +expiresIn);
      return Date.now() < +expiresIn;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('myToken');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['login']);
  }

  private setSession(res: any) {
    const expiresIn = Date.now() + +res.expiresIn;
    localStorage.setItem('myToken', res.token);
    localStorage.setItem('expiresIn', String(expiresIn));
  }

  private handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      this.snackBar.open(` ${error.error.message}`, 'close', {
        duration: 1000,
      });
      return of(result as T);
    };
  }
}

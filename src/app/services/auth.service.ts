import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerlink =
    'https://aldaci-langfella-api.azurewebsites.net/Users/register';
  private loginlink =
    'https://aldaci-langfella-api.azurewebsites.net/Users/login';
  user = new BehaviorSubject<User | null>(null);

  get token(): string {
    return JSON.parse(localStorage.getItem('user') || '{}')._jwt;
  }
  constructor(private http: HttpClient, private router: Router) {}

  // register(email: string, password: string){
  //     return this.http.post<any>(this.registerlink, {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //     }).pipe(
  //         tap(response => {
  //             this.handleUser(response.email, response.localId, response.idToken, response.expiresIn);
  //         }),
  //         catchError(this.rhandleError)
  //     )
  // }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['../onboarding/']);
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.loginlink, {
        email: email,
        password: password,
      })
      .pipe(
        tap((response) => {
          this.handleUser(email, response.userId, response.jwt);
        }),
        catchError(this.rhandleError)
      );
  }

  // loadStyle(theme?:any): void {
  // 	const head = document.getElementsByTagName('head')[0];
  // 	let themeLink = document.getElementById('theme') as HTMLLinkElement;
  //     console.log(theme)
  //     if(!theme){
  //         const style = document.createElement('link');
  //         style.id = 'theme';
  //         style.rel = 'stylesheet';
  //         style.href = `assets/css/light.css`;
  //         head.appendChild(style);
  //     }

  // 	if (themeLink) {
  // 		themeLink.href = `${theme}.css`;
  // 	} else {
  // 		const style = document.createElement('link');
  // 		style.id = 'theme';
  // 		style.rel = 'stylesheet';
  // 		style.href = `assets/css/${theme}.css`;

  // 		head.appendChild(style);
  // 	}
  // }

  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadedUser = new User(user.email, user.userId, user.jwt);
    if (loadedUser.userId) {
      this.user.next(loadedUser);
    }
  }

  private rhandleError(err: HttpErrorResponse) {
    let message = 'An error occurred';

    return throwError(() => message);
  }

  // private lhandleError(err: HttpErrorResponse) {
  //     let message = "Wrong mail address or password"

  //     return throwError(() => message)
  // }

  private handleUser(email: string, userId: string, jwt: string) {
    const user = new User(email, userId, jwt);

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  error = "";

  constructor(private http: HttpClient, public router: Router) { }

  // Sign-up
  signUp(user: Usuario) {
    let api = `${this.endpoint}/register`;
    return this.http.post<any>(api, user).pipe();
  }

  // Sign-in
  signIn(user: Usuario) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user).pipe();
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  getTokenD() {
    return atob(this.getToken().split('.')[1])
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/usuarios/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

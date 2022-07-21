import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Ppp } from '../models/ppp';

@Injectable({
  providedIn: 'root'
})
export class PppService {

  AUTH_SERVER: string = 'http://localhost:4000/api';
  /*   authSubject = new BehaviorSubject(false); */
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  CreatePpp(data: any): Observable<Ppp> {
    return this.http
      .post<Ppp>(
        this.AUTH_SERVER + '/ppps/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetPpp(id: any): Observable<Ppp> {
    return this.http
      .get<Ppp>(this.AUTH_SERVER + '/ppps/' + id)
      .pipe();
  }
  // GET
  GetPpps(): Observable<Ppp> {
    return this.http
      .get<Ppp>(this.AUTH_SERVER + '/ppps/')
      .pipe(retry(1));
  }
  // PUT
  UpdatePpp(id: any, data: any): Observable<Ppp> {
    return this.http
      .put<Ppp>(
        this.AUTH_SERVER + '/ppps/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe();
  }
  // DELETE 
  DeletePpp(id: any) {
    return this.http
      .delete<Ppp>(this.AUTH_SERVER + '/ppps/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

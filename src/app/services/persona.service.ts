import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  AUTH_SERVER: string = 'http://localhost:4000/api';
  /*   authSubject = new BehaviorSubject(false); */
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  CreatePersona(data: any): Observable<Persona> {
    return this.http
      .post<Persona>(
        this.AUTH_SERVER + '/personas/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetPersona(id: any): Observable<Persona> {
    return this.http
      .get<Persona>(this.AUTH_SERVER + '/personas/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetPersonas(): Observable<Persona> {
    return this.http
      .get<Persona>(this.AUTH_SERVER + '/personas/')
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // PUT
  UpdatePersona(id: any, data: any): Observable<Persona> {
    return this.http
      .put<Persona>(
        this.AUTH_SERVER + '/personas/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  DeletePersona(id: any) {
    return this.http
      .delete<Persona>(this.AUTH_SERVER + '/personas/' + id, this.httpOptions)
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

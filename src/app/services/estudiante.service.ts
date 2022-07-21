import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  AUTH_SERVER: string = 'http://localhost:4000/api';
  /*   authSubject = new BehaviorSubject(false); */
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // POST
  CreateEstudiante(data: any): Observable<Estudiante> {
    return this.http
      .post<Estudiante>(
        this.AUTH_SERVER + '/estudiantes/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetEstudiante(id: any): Observable<Estudiante> {
    return this.http
      .get<Estudiante>(this.AUTH_SERVER + '/estudiantes/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetEstudiantes(): Observable<Estudiante> {
    return this.http
      .get<Estudiante>(this.AUTH_SERVER + '/estudiantes/')
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // PUT
  UpdateEstudiante(id: any, data: any): Observable<Estudiante> {
    return this.http
      .put<Estudiante>(
        this.AUTH_SERVER + '/estudiantes/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  DeleteEstudiante(id: any) {
    return this.http
      .delete<Estudiante>(this.AUTH_SERVER + '/estudiantes/' + id, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  AUTH_SERVER: string = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  CreateUsuario(data: any): Observable<Usuario> {
    return this.http
      .post<Usuario>(
        this.AUTH_SERVER + '/usuarios/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetUsuario(id: any): Observable<Usuario> {
    return this.http
      .get<Usuario>(this.AUTH_SERVER + '/usuarios/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // GET
  GetUsuarios(): Observable<Usuario> {
    return this.http
      .get<Usuario>(this.AUTH_SERVER + '/usuarios/')
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // PUT
  UpdateUsuario(id: any, data: any): Observable<Usuario> {
    return this.http
      .put<Usuario>(
        this.AUTH_SERVER + '/usuarios/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  DeleteUsuario(id: any) {
    return this.http
      .delete<Usuario>(this.AUTH_SERVER + '/usuarios/' + id, this.httpOptions)
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

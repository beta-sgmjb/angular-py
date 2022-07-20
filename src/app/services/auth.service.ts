import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { JwtResponse } from '../models/jwt-response';
import { Rol } from '../models/rol';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:4000/api';
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';

  constructor(private httpClient: HttpClient) { }

  register(usuario: Usuario): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`,
    usuario).pipe(tap(
      (res:JwtResponse) => {
        if(res) {
          //guardar token
          this.saveToken(res.dataUsuario.accessToken, "7d");       
        }
      }
    ));
  }

  login(usuario: Usuario): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/login`,
    usuario).pipe(tap(
      (res:JwtResponse) => {
        if(res) {
          //guardar token
          this.saveToken(res.dataUsuario.accessToken, "7d");
        }
      }
    ));
  }

  getUsuarios() {
    return this.httpClient.get(`${this.AUTH_SERVER}/usuarios`);
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  getTokenD(token: string | any ): object {
    return JSON.parse(atob(token.split('.')[1])).usuario
  }
}

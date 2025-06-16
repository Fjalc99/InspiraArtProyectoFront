import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { LoginResponse } from '../interfaces/LoginResponse';
import { UsuarioDto } from '../interfaces/UsuarioDto';
import { RegisterUsuarioDto } from '../interfaces/RegisterUsaurioDto';
import { RegisterArtistaDto } from '../interfaces/RegisterArtistaDto';
import { ActivateAccountRequest } from '../interfaces/ActivateAccountRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly API_URL = 'http://localhost:8081/auth';
  private readonly url_Activacion_User =
    'http://localhost:8081/activate/account/';
  private readonly url_Activacion_Artista =
    'http://localhost:8081/activate/account/artista';
  private readonly url_Activacion_User_Admin =
    'http://localhost:8081/activate/account/admin';

  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
    data: LoginRequest
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('username', res.username);
        localStorage.setItem('userId', res.id);
      })
    );
  }

  loginArtista(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.id);
        })
      );
  }

  loginUsuario(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.id);
        })
      );
  }

  registerUsuario(
    usuario: RegisterUsuarioDto,
    file: File | null
  ): Observable<RegisterUsuarioDto> {
    const formData = new FormData();
    formData.append(
      'createUserDto',
      new Blob([JSON.stringify(usuario)], { type: 'application/json' })
    );
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<RegisterUsuarioDto>(
      `${this.API_URL}/register`,
      formData
    );
  }

  registerArtista(
    artista: RegisterArtistaDto,
    file: File | null
  ): Observable<RegisterArtistaDto> {
    const formData = new FormData();
    formData.append(
      'createArtistaDto',
      new Blob([JSON.stringify(artista)], { type: 'application/json' })
    );
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<RegisterArtistaDto>(
      `${this.API_URL}/register/artista`,
      formData
    );
  }

  activarCuentaUsuario(
    request: ActivateAccountRequest
  ): Observable<ActivateAccountRequest> {
    return this.http.post<ActivateAccountRequest>(
      `${this.url_Activacion_User}`,
      request
    );
  }

  activarCuentaArtista(
    request: ActivateAccountRequest
  ): Observable<ActivateAccountRequest> {
    return this.http.post<ActivateAccountRequest>(
      `${this.url_Activacion_Artista}`,
      request
    );
  }

  activarCuentaUsuarioAdmin(
    request: ActivateAccountRequest
  ): Observable<ActivateAccountRequest> {
    return this.http.post<ActivateAccountRequest>(
      `${this.url_Activacion_User}`,
      request
    );
  }

  activarCuentaArtistaAdmin(
    request: ActivateAccountRequest
  ): Observable<ActivateAccountRequest> {
    return this.http.post<ActivateAccountRequest>(
      `${this.url_Activacion_Artista}`,
      request
    );
  }

  activarCuentaAdmin(
    request: ActivateAccountRequest
  ): Observable<ActivateAccountRequest> {
    return this.http.post<ActivateAccountRequest>(
      `${this.url_Activacion_User_Admin}`,
      request
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly API_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, data: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${this.API_URL}/login`,
    data
  ).pipe(
    tap(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('userId', res.id);
    })
  );
  }
}
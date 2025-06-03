import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDto } from '../interfaces/UsuarioDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API_URL = 'http://localhost:8080';
   
  constructor(private http: HttpClient) { }

  getUsuarios(page: number = 0, size: number = 10): Observable<UsuarioDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<UsuarioDto[]>(`${this.API_URL}/users?page=${page}&size=${size}`, { headers });
  }

  getUsuarioById(id: string): Observable<UsuarioDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<UsuarioDto>(`${this.API_URL}/user/${id}`, { headers });
  }

  updateUsuario(id: string, formData: FormData): Observable<UsuarioDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.put<UsuarioDto>(`${this.API_URL}/user/${id}`, formData, { headers });
  }

  deleteUsuario(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.API_URL}/user/${id}`, { headers });
  }

   createUsuario(formData: FormData): Observable<UsuarioDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.post<UsuarioDto>(this.API_URL + '/auth/register', formData, { headers });
  }


}
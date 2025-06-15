import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../interfaces/UsuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  
  getPerfilUsuario(): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.apiUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  
  actualizarPerfilUsuarioMe(data: Partial<UsuarioDto>, file?: File): Observable<UsuarioDto> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<UsuarioDto>(`${this.apiUrl}/me`, formData, {
      headers: this.getAuthHeaders()
      
    });
  }
}
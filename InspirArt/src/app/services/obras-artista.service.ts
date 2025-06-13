import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaObraDto } from '../interfaces/ListaObraDto';

@Injectable({
  providedIn: 'root'
})
export class ObrasArtistaService {
  private apiUrl = 'http://localhost:8080/obra/perfil/obras';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getObrasArtista(page: number = 0, size: number = 10): Observable<{ content: ListaObraDto[] }> {
    return this.http.get<{ content: ListaObraDto[] }>(
      `${this.apiUrl}?page=${page}&size=${size}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
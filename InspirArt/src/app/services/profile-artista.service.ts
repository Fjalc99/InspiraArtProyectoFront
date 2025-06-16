import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistaDto } from '../interfaces/ArtistaDto';

@Injectable({
  providedIn: 'root'
})
export class ProfileArtistaService {


    private apiUrl = 'http://localhost:8081/artista/me';


  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  
getPerfilArtista(): Observable<ArtistaDto> {
    return this.http.get<ArtistaDto>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  
  actualizarPerfilArtista(data: Partial<ArtistaDto>, file?: File): Observable<ArtistaDto> {
    const formData = new FormData();
    formData.append('artista', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<ArtistaDto>(`${this.apiUrl}`, formData, {
      headers: this.getAuthHeaders()
      
    });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistaDto } from '../interfaces/ArtistaDto';

@Injectable({
  providedIn: 'root'
})


export class ArtistaService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


   getArtistas(page: number = 0, size: number = 10): Observable<ArtistaDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<ArtistaDto[]>(`${this.API_URL}/artistas?page=${page}&size=${size}`, { headers });
  }


  getArtistaById(id: string): Observable<ArtistaDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<ArtistaDto>(`${this.API_URL}/artista/${id}`, { headers });
  }

  updateArtista(id: string, formData: FormData): Observable<ArtistaDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.put<ArtistaDto>(`${this.API_URL}/artista/${id}`, formData, { headers });
  }


  deleteArtista(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.API_URL}/artista/${id}`, { headers });
  }

  createArtista(formData: FormData): Observable<ArtistaDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.post<ArtistaDto>(`${this.API_URL}/auth/register/artista`, formData, { headers });
  }


}

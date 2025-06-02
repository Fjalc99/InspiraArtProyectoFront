import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistaDto } from '../interfaces/ArtistaDto';

@Injectable({
  providedIn: 'root'
})


export class ArtistaService {
  private readonly API_URL = 'http://localhost:8080/artistas';

  constructor(private http: HttpClient) { }


   getArtistas(page: number = 0, size: number = 10): Observable<ArtistaDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<ArtistaDto[]>(`${this.API_URL}?page=${page}&size=${size}`, { headers });
  }


}

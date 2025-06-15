import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoritoDto } from '../interfaces/FavoritoDto';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  favoritos: FavoritoDto[] = [];
  private apiUrl = 'http://localhost:8080/favoritos';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

 
 agregarFavorito(obraId: string): Observable<FavoritoDto> {
  return this.http.post<FavoritoDto>(
    `${this.apiUrl}/${obraId}`,
    {},
    { headers: this.getHeaders() }
  );
}

  
  obtenerFavoritosPorUsuario(page: number = 0, size: number = 10): Observable<{ content: FavoritoDto[] }> {
    return this.http.get<{ content: FavoritoDto[] }>(
      `${this.apiUrl}?page=${page}&size=${size}`,
      { headers: this.getHeaders() }
    );
  }

  cargarFavoritos() {
    this.obtenerFavoritosPorUsuario().subscribe({
      next: res => this.favoritos = res.content,
      error: () => this.favoritos = []
    });
  }

  
  eliminarFavorito(favoritoId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${favoritoId}`,
      { headers: this.getHeaders() }
    );
  }
}
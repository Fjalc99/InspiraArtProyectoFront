import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValoracionDto } from '../interfaces/ValoracionDto';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private readonly API_URL = 'http://localhost:8080/valoraciones';

  constructor(private http: HttpClient) {}

  // Crear valoración
  crearValoracion(valoracion: ValoracionDto): Observable<ValoracionDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post<ValoracionDto>(this.API_URL, valoracion, { headers });
  }

  
  obtenerValoracionesUsuario(page: number = 0, size: number = 10): Observable<{ content: ValoracionDto[]; totalElements: number; totalPages: number; }> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<{ content: ValoracionDto[]; totalElements: number; totalPages: number; }>(this.API_URL, { headers, params });
  }
  
  // ...existing code...

  // Editar valoración
  editarValoracion(valoracionId: string, valoracion: ValoracionDto): Observable<ValoracionDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put<ValoracionDto>(`${this.API_URL}/${valoracionId}`, valoracion, { headers });
  }

  // Eliminar valoración
  eliminarValoracion(valoracionId: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.delete<void>(`${this.API_URL}/${valoracionId}`, { headers });
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ComentarioDto } from '../interfaces/ComentarioDto';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private readonly API_URL = 'http://localhost:8080/comentarios';

  constructor(private http: HttpClient) {}

  getComentarios(
    page: number = 0,
    size: number = 10
  ): Observable<ComentarioDto[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ComentarioDto[]>(this.API_URL, { params });
  }

  getComentariosPorObraId(
    obraId: string,
    page: number = 0,
    size: number = 10
  ): Observable<ComentarioDto[]> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<ComentarioDto[]>(`${this.API_URL}/${obraId}`, {
      params,
    });
  }

  deleteComentarioAdministrador(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<void>(`${this.API_URL}/admin/${id}`, { headers });
  }

  crearComentarioAdministrador(
    comentario: ComentarioDto
  ): Observable<ComentarioDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<ComentarioDto>(this.API_URL + '/admin' , comentario, { headers });
  }

  editarComentarioAdministrador(
    id: string,
    comentario: ComentarioDto
  ): Observable<ComentarioDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<ComentarioDto>(`${this.API_URL}/admin/${id}`, comentario, {
      headers,
    });
  }

  crearComentarioUsuario(
    comentario: ComentarioDto
  ): Observable<ComentarioDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<ComentarioDto>(this.API_URL, comentario, { headers });
  }

  editarComentarioUsuario(
    id: string,
    comentario: ComentarioDto
  ): Observable<ComentarioDto> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put<ComentarioDto>(`${this.API_URL}/${id}`, comentario, {
      headers,
    });
  }

  deleteComentarioUsuario(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }
}

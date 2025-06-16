import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoriaDto } from '../interfaces/categoria/CategoriaDto';
import { CreateCategoriaDto } from '../interfaces/categoria/CreateCategoriaDto';
import { EditCategoriaDto } from '../interfaces/categoria/EditCategoriaDto';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly API_URL = 'http://localhost:8081/categoria';

  constructor(private http: HttpClient) { }

  getCategorias(page: number = 0, size: number = 10): Observable<CategoriaDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<CategoriaDto[]>(`${this.API_URL}?page=${page}&size=${size}`, { headers });
  }

 getCategoriasForm(page: number = 0, size: number = 10): Observable<CategoriaDto[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<{ content: CategoriaDto[] }>(`${this.API_URL}/form?page=${page}&size=${size}`, { headers })
    .pipe(map(resp => resp.content));
}

 editarCategoria(idCategoria: string, dto: EditCategoriaDto): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.put(`${this.API_URL}/${idCategoria}`, dto, { headers });
}

  eliminarCategoria(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }

  crearCategoria(categoria: CreateCategoriaDto): Observable<CategoriaDto> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.post<CategoriaDto>(this.API_URL, categoria, { headers });
}

  getCategoriaById(id: string): Observable<CategoriaDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<CategoriaDto>(`${this.API_URL}/${id}`, { headers });
  }
}
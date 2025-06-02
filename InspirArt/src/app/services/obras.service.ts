import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObraDto } from '../interfaces/ObraDto';
import { ListaObraDto } from '../interfaces/ListaObraDto';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  private API_URL = 'http://localhost:8080/obra';

  constructor(private http: HttpClient) { }

  getListaObras(page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(this.API_URL, { params });
  }

  getObras(filtros: { [key: string]: string } = {}, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    // Agregar filtros a los parámetros
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key) && filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    }

    return this.http.get<any>(this.API_URL, { params });
  }

  getObraById(idObra: string): Observable<ListaObraDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<ListaObraDto>(`${this.API_URL}/${idObra}`, { headers });
  }

  crearObra(formData: FormData): Observable<ListaObraDto> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
    
  });
  return this.http.post<ListaObraDto>(this.API_URL, formData, { headers });
}
  editarObra(idObra: string, obra: ObraDto): Observable<ListaObraDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<ListaObraDto>(`${this.API_URL}/${idObra}`, obra, { headers });
  }

  eliminarObra(idObra: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.API_URL}/${idObra}`, { headers });
  }
}

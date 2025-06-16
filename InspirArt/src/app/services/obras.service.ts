import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObraDto } from '../interfaces/ObraDto';
import { ListaObraDto } from '../interfaces/ListaObraDto';
import { CreateObraDto } from '../interfaces/CreateObraDto';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  private API_URL = 'http://localhost:8081/obra';

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

  crearObra(obra: CreateObraDto, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('createObraDto', new Blob([JSON.stringify(obra)], { type: 'application/json' }));
  if (file) {
    formData.append('file', file);
  }

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
   
  });

  return this.http.post<any>(`${this.API_URL}`, formData, { headers });
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

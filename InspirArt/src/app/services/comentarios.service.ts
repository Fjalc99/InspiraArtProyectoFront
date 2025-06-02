import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ComentarioDto } from '../interfaces/ComentarioDto';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private readonly API_URL = 'http://localhost:8080/comentarios';

  constructor(private http: HttpClient) { }

  getComentarios(page: number = 0, size: number = 10): Observable<ComentarioDto[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<ComentarioDto[]>(this.API_URL, { params });
  }


  
  getComentariosPorObraId(obraId: string, page: number = 0, size: number = 10): Observable<ComentarioDto[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<ComentarioDto[]>(`${this.API_URL}/${obraId}`, { params });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDto } from '../interfaces/AdminDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private readonly API_URL = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) {}

  getAdmins(page: number = 0, size: number = 10): Observable<AdminDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<AdminDto[]>(`${this.API_URL}?page=${page}&size=${size}`, { headers });
  }



}

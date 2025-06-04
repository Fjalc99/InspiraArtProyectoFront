import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDto } from '../interfaces/AdminDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAdmins(page: number = 0, size: number = 10): Observable<AdminDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<AdminDto[]>(`${this.API_URL}/admins?page=${page}&size=${size}`, { headers });
  }

  getAdminById(id: string): Observable<AdminDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<AdminDto>(`${this.API_URL}/admin/${id}`, { headers });
  }

  updateAdmin(id: string, formData: FormData): Observable<AdminDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.put<AdminDto>(`${this.API_URL}/admin/${id}`, formData, { headers });
  }

  deleteAdmin(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.API_URL}/admin/${id}`, { headers });
  }

  createAdmin(formData: FormData): Observable<AdminDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
      // No pongas 'Content-Type' aquí
    });
    return this.http.post<AdminDto>(`${this.API_URL}/auth/register/admin`, formData, { headers });
  }


}

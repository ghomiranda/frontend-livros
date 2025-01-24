import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${endpoint}`);
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${endpoint}/${id}`);
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${endpoint}`, data);
  }

  update(endpoint: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${endpoint}/${id}`);
  }

  downloadPDF(endpoint: string): Observable<Blob> {
    return this.http.get(`${this.API_URL}/${endpoint}`, {
      responseType: 'blob'
    });
  }
}

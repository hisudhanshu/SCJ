import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  apiUrl: any;
  token: string;
  
  constructor(private http: HttpClient) {
    // Retrieve token from localStorage during initialization
    this.token = window.localStorage.getItem('myToken') || 'DEFAULT_TOKEN';
    console.log('myToken:', this.token);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}Authentication/UserLogin`, data);
  }

  setToken(token: string): void {
    window.localStorage.setItem('myToken', token);
  }

  insertData(data: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertRawMaterials`, data, { headers });
  }

  insertProductData(data: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertProduct`, data, { headers });
  }
}

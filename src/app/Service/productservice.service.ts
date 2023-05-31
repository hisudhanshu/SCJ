import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlprefix: any = "https://localhost:44384/";
  token: string;

  constructor(private http: HttpClient) {
    // Retrieve token from localStorage during initialization
    this.token = window.localStorage.getItem('myToken') || 'DEFAULT_TOKEN';
    console.log('myToken:', this.token);
  }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    
    let url = this.urlprefix + "api/Authentication/GetProducts";
    return this.http.get(url, { headers: headers });
  }
}

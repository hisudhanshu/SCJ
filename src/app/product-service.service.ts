import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // API URL

  private apiUrl = `https://localhost:44384/api/Authentication/GetProducts`;

  constructor(private http: HttpClient) {}

  getProduct(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get(url);
  }
}

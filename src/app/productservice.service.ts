import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl1 } from 'src/environments/environment';

const API_URL = 'https://localhost:44384/api/Authentication/GetProducts';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  
  getProducts(): Observable<any> {
    return this.http.get(`${baseUrl1}Authentication/GetProducts`);
  }
}
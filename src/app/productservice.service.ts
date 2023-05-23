import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl1 } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlprefix: any = "https://localhost:44384/";
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYjg3M2EwZC1iZGI3LTQ1NjctYTA4NC1iNzNhNjc2NDBhZGUiLCJzaWQiOiIxIiwiZW1haWwiOiJkZWVwYWsudGl3YXJpIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJEYXRlIjoiMjMtMDUtMjAyMyAxMDozNDo0MSIsImV4cCI6MTY4NDgyNTQ4MSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODQvIn0.htUU7Dka22jPPVqtGcSz1gtr8huiN6irW8KBggIL6nQ';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let url = this.urlprefix + "api/Authentication/GetProducts";
    return this.http.get(url, { headers: headers });
  }
}
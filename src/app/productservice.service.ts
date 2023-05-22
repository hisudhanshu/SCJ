import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl1 } from 'src/environments/environment';


// const API_URL = 'https://localhost:44384/api/Authentication/GetProducts';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlprefix:any="https://localhost:44384/";
  header: any = new Headers({ 'Content-Type': 'application/json; charset = utf-8;',
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache','Expires': '0'  });
  
  constructor(private http:HttpClient) { }

  getProducts()
  {

    let url=this.urlprefix+"/api/Authentication/GetProducts"

    return this.http.get(url,{ headers: this.header });
  }
}
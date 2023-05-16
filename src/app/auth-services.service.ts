import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}Authentication/UserLogin`,data);
  }
//  Get Product API call Service code start here

  getProduct(data: any):Observable<any>{
    return this.http.post(``,data);
  }
}
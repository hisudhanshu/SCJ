import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  
  getToken() {
    throw new Error('Method not implemented.');
  }
  static setToken() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}Authentication/UserLogin`,data);
  }
}
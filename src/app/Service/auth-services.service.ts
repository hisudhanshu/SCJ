import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  getData() {
    throw new Error('Method not implemented.');
  }

  apiUrl: any;
  token: string;
  baseUrl: any;
  urlprefix: any = "https://localhost:44384/";
  getElements: any;
  InsertRawMaterials: any;

  constructor(private http: HttpClient) {
    // Retrieve token from localStorage during initialization
    this.token = window.localStorage.getItem('myToken') || 'DEFAULT_TOKEN';
    console.log('myToken:', this.token);
  }

  // Login Authentication API url Call here 

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}Authentication/UserLogin`, data);
  }

  setToken(token: string): void {
    window.localStorage.setItem('myToken', token);
  }

  // Raw material data insert API url Call here  InsertRawMaterials 

  insertData(data: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertRawMaterialName`, data, { headers });
  }

  // Prouct Master Insert data API url Call here   InserProductmaster

  insertProductData(data: any): Observable<any> {
    const url = `${this.apiUrl}InsertProductMaster`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertProductMaster`, data, { headers });
  }


  // Raw Master API url Call here 

  rawmasterData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertRawMaster`, data, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error saving data:', error);
          return throwError(error);
        })
      );
  }

  // Raw Material Element Data Insert API url Call here 

  saveElementData(data: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/UpdateRawMaterials`, data, { headers });
  }

  getRawElements(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const url = this.urlprefix + 'api/Authentication/GetMaterials';
    return this.http.get(url, { headers: headers });
  }

  // Raw Material Management Get data API url Call here

  getMaterials(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // GetProducts API call here Show on Map Product Screen 

    let url = this.urlprefix + "api/Authentication/GetMaterials";
    return this.http.get(url, { headers: headers });
  }
  getMaterials1(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // GetProducts API call here Show on Map Product Screen 

    let url = this.urlprefix + "api/Authentication/GetMaterials";
    return this.http.get(url, { headers: headers });
  }


  // FUll Recipe API Call here
  getRecipes(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let url = this.urlprefix + "api/Authentication/GetRecipe";
    return this.http.get<any[]>(url, { headers: headers });
  }

  // FUll Recipe API Call here
  getRecipes1(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let url = this.urlprefix + "api/Authentication/GetProductData";
    return this.http.get<any[]>(url, { headers: headers });
  }

  // Recipe Compare API Call here

  getRecipescompare(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    let url = this.urlprefix + "api/Authentication/GetComparisionRecipe";
    return this.http.get<any[]>(url, { headers: headers });
  }
  getRawMaterialsrecipe(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // GetProducts API call here Show on Map Product Screen 

    let url = this.urlprefix + "api/Authentication/GetMaterials";
    return this.http.get(url, { headers: headers });
  }

  insertRecipe(data: any): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with your insert API endpoint
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${baseUrl}Authentication/InsertRecipe`, data, { headers });
  }

  // API to upload the file

  uploadFile(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(`${baseUrl}Authentication/ImportCsv`, formData, { headers });
  }
}
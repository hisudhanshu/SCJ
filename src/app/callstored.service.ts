import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallstoredService {

  // Replace 'http://your-backend-server/api/execute-stored-procedure' 
  // with the actual URL of your backend server's API endpoint that executes the stored procedure.
  
  private apiUrl = 'http://your-backend-server/api/execute-stored-procedure';

  constructor(private http: HttpClient) { }

  callStoredProcedure() {
    return this.http.get<any>(this.apiUrl);
  }
}
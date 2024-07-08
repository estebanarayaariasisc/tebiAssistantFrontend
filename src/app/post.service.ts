import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:5000/chat';

  constructor(private http: HttpClient) { }

  sendPostRequest(message: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({ message });
    
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

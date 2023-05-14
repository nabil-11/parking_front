import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200', // Replace with your frontend URL
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Specify the allowed HTTP methods
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Requested-With, Accept' // Specify the allowed request headers
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://127.0.0.1:8000/api/user'; 

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;

    return this.http.post(url, user );
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials);
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post(url, {});
  }
}

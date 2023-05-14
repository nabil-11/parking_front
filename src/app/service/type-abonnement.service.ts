import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeAbonnementService {
  private baseUrl = 'http://127.0.0.1:8000/api/type_abonnement'; 


  constructor(private http : HttpClient) { }
 showType_abonnement(){
  return this.http.get(this.baseUrl);
 }
}

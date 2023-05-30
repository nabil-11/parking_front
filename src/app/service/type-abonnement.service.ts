import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class TypeAbonnementService {
  private baseUrl = 'http://127.0.0.1:8000/api/payment'; 


  constructor(private http : HttpClient ,  private  tokenStorge : TokenStorageService) { }
 showType_abonnement(){
  return this.http.get(this.baseUrl);
 }
 addAbonnement(data:any,type:any){
  return this.http.post(this.baseUrl+'/add',{
    data:data , type:type } , { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } }) ;
}
}

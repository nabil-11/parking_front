import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://127.0.0.1:8000/api/parking'; 

  constructor(private http : HttpClient , private  tokenStorge : TokenStorageService) { }
  addParking(parkingForm:any){
    console.log(parkingForm)
  return this.http.post(this.baseUrl ,parkingForm, { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
 }
 getParkingList(){
  return this.http.get(this.baseUrl , { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
 }
}

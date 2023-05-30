import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private baseUrl = 'http://127.0.0.1:8000/api/parking'; 


  constructor(private http : HttpClient , private  tokenStorge : TokenStorageService) { }

  getBlocReservation(blockId: any) {
    return this.http.get(`${this.baseUrl}/bloc-reservation/${blockId}`);
  }
/**** */
  clientReservation(data:any){
    console.log(data)
    return this.http.post(this.baseUrl+'/reserve', data, { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });

  }
  listReservation(){
    return this.http.get( 'http://127.0.0.1:8000/api/list_reservation',  { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
  }

  addParking(parkingForm:any){
    console.log(parkingForm)
  return this.http.post(this.baseUrl ,parkingForm, { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
 }
 getAllParkings(){
  return this.http.get(this.baseUrl+'/all' , { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
 }
 getParkingList(){
  return this.http.get(this.baseUrl , { headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` } });
 }
 updateParking(parkingId: number, updatedParking: any) {
  const url = `${this.baseUrl}/${parkingId}`;
  return this.http.put(url, updatedParking, {
    headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` }
  });
}

deleteParking(parkingId: number) {
  const url = `${this.baseUrl}/${parkingId}`;
  return this.http.delete(url, {
    headers: { Authorization: `Bearer ${this.tokenStorge.getToken()}` }
  });
}

}



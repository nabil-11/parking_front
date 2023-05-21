import { AfterViewInit, Component,ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';
import flatpickr from 'flatpickr';
@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.css']
})
export class SearchParkingComponent  implements AfterViewInit {

  map: any;
   markers: any[] = [
    { lat: 36.8065, lng: 10.1815 },
    { lat: 34.0522, lng: -118.2437 },
    { lat: 31.0522, lng: -118.2437 },
    { lat: 40.0522, lng: -118.2437 },
    { lat: 12.0522, lng: -118.2437 },
 
  ];


  constructor() {
  }
   flatpickr: any

   ngAfterViewInit(): void {
    this.loadMap();
    $(document).ready(() => {
      flatpickr("#kt_datepicker_3", {
        enableTime: true,
        dateFormat: "Y-m-d H:i"
      });
    });

  
  }
  html =`
 <div class="d-flex flex-column w-100">
 <img width="200" class="rounded border"  src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" />
 <p class="text-start"> parking elissa</p>
 
 <div class="container my-3 py-2 bg-light rounded border d-flex flex-column align-items-start">
 <span> description</span>
 </div>

 <span class="badge badge-light-success mb-1 mb-3">available</span>
 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> taken</button>

 
 </div>
  `
  
  private loadMap(): void {
    this.map = L.map('map').setView([36.8065,10.1815], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibmFiaWwxMSIsImEiOiJjbDBxenBrbGcwbWN5M2xwZW0xcWloeG5rIn0.QU0BgTiODBWSqnwEw9EYBg'
    }).addTo(this.map);
    
    
    this.markers.forEach((marker:any) =>{
      L.marker([marker.lat, marker.lng]).addTo(this.map).bindPopup(this.html);
    });   
  
  
  }

  handlereservation() {
    $('#successModal').modal('hide');

  }
  

}

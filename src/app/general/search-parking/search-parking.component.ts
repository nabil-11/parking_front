import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
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
 
  ];


  constructor() {
  }

   ngAfterViewInit(): void {
    this.loadMap();
  
  }
 
  
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
      L.marker([marker.lat, marker.lng]).addTo(this.map).bindPopup('votre position');
    });   

  
  }
  

}

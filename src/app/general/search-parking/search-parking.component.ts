import { AfterViewInit, Component,ViewChild, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import * as $ from 'jquery';
import flatpickr from 'flatpickr';
import { ParkingService } from 'src/app/service/parking.service';
import { FormGroup , Validator, FormBuilder} from '@angular/forms';
import {DataSet , Timeline} from 'vis';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.css']
})
export class SearchParkingComponent  implements AfterViewInit {
   reservationForm: FormGroup = new FormGroup({});

  map: any;
   total:any = 0 ;
   step:any = 1 ;
   
   markers: any[] = [
  
  ];
  parkingSelected!:any ;



  constructor( 
    private formBuilder : FormBuilder ,
    private toastr: ToastrService ,
    private parkingService:ParkingService) {
  }
   flatpickr: any
 ngOnInit(){
  this.reservationForm = this.formBuilder.group({
    blocId: ['1'],
    parkingId:[''],
    dateTime: [new Date()],
    numberOfHours: ['3'],
    paymentType: ['online'] // Set the default payment type here
  });
  this.parkingService.listReservation().subscribe({
    next:(response :any)=>{
      console.log(response) ;
   
    },
    error:(error:any)=>{

    }
  })
 }
   ngAfterViewInit(): void {
      this.parkingService.getAllParkings().subscribe({
        next: (data:any) => {
          data.data.forEach((m:any) => {
  this.markers.push({
    lat: m.langitude,
    lng: m.lantitude,
    name:m.name ,
    blocs : m.blocs ,
    description : m.description
  })            

          });
          this.loadMap()
        
        },
        error:(error:any)=>{

        }
      })
     
    $(document).ready(() => {
      flatpickr("#kt_datepicker_3", {
        enableTime: true,
        dateFormat: "Y-m-d H:i"
      });
    });
 
  
  }

   getTotal(){
     const blocId =  this.reservationForm.get('blocId')?.value
     const selectedBloc = this.parkingSelected.blocs.find((bloc: any) => bloc.id === +blocId);
     const hourPrice = selectedBloc ? selectedBloc.hour_price : 0;
     const  numberOfHours = this.reservationForm.get('numberOfHours')?.value
      this.total = hourPrice*numberOfHours
      console.log(this.total )
      this.timline(blocId)
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
    
    const customIcon = L.icon({
      iconUrl: "https://img.icons8.com/external-prettycons-flat-prettycons/47/external-park-urban-prettycons-flat-prettycons-1.png",
      iconSize: [32, 32], // [width, height]
    });
    this.markers.forEach((marker:any) =>{
      
      const html =`
      <div class="d-flex flex-column w-300px  justify-content-center w-100">
     
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://images.unsplash.com/photo-1616363088386-31c4a8414858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1616363088386-31c4a8414858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1616363088386-31c4a8414858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="d-flex justify-content-start py-1">
<span class="fw-bold">${marker.name}</span>
</div>
<div class="d-flex" >
<span class="badge badge-light-primary m-1"> ${marker.blocs.length} blocs</span>
<span class="badge badge-light-success m-1"> available </span>
</div>
<div class="d-flex justify-content-end align-items-end">
<a type="button" class="btn btn-primary btn-sm" (click)="openModalReserve(${JSON.stringify(marker)})" data-bs-toggle="modal" (click)="openModalReserve(${marker})" data-bs-target="#staticBackdrop">Reserve</a>

</div> 
      </div>
       `

      L.marker([marker.lat, marker.lng],{ icon: customIcon }).addTo(this.map).bindPopup(html)
      .on('click', (e: any) => {
        this.parkingSelected = marker;
      console.log(this.parkingSelected)
      })
    });   
  
  
  }

  handlereservation() {
   console.log( this.parkingSelected.id )
   this.parkingService.clientReservation(this.reservationForm.value).subscribe({
    next:(response:any)=>{
           this.toastr.success(' reserve passed  successfully')
           location.reload() ;
    },
    error:(error:any)=>{

    }
   })

  }
  handleGetBlocReserveData(){

  }
  timline(blocId:any) {
    
    
    setTimeout(() => {
      const container = document.getElementById('kt_docs_vistimeline_basic');
      if (container) {
        // Create the timeline
        $('#kt_docs_vistimeline_basic').empty()
        const items = new DataSet([
          { id: 1, content: 'item 1', start: '2021-04-20' },
          { id: 2, content: 'item 2', start: '2021-04-14' },
          { id: 3, content: 'item 3', start: '2021-04-18' },
          { id: 4, content: 'item 4', start: '2021-04-16', end: '2021-04-19' },
          { id: 5, content: 'item 5', start: '2021-04-25' },
          { id: 6, content: 'item 6', start: '2021-04-27', type: 'point' }
        ]);
  
        const options = {
          start:  this.reservationForm.get('dateTime')?.value,
          width: '100%',
          height: '300px',
          // Configure the hour scale
       
          zoomKey: 'ctrlKey',
          zoomMax: 3600000, // Maximum zoom level to 1 hour
          zoomMin: 3600000, // Minimum zoom level to 1 hour
        };
  
        const timeline = new Timeline(container, items, options);
      }
    }, 0);
  }
  

 

  

}

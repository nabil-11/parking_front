import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as $ from 'jquery';
import { ParkingService } from 'src/app/service/parking.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent implements OnInit{
  marker: L.Marker | undefined;

  constructor(private router:Router ,private formBuilder: FormBuilder , private parkingService :ParkingService) {}

  step: number = 0
  blocsArray: number[] = [];
  blocsArrayForm : FormGroup = new FormGroup({})
  parkingDetails: FormGroup = new FormGroup({})
  get blocsForm(): FormArray {
    return this.parkingDetails.get('blocsForm') as FormArray;
  }

  map: any;


  markers: any[] = [
   { lat: 36.8065, lng: 10.1815 },
   { lat: 34.0522, lng: -118.2437 },

 ];
  ngOnInit():void{
    console.log("ngOnInit called");
  this.step = 0 ;
  this.parkingDetails = this.formBuilder.group({
    parkingName: ['', Validators.required],
    langitude: ['', Validators.required],
    lantitude: ['', Validators.required],
    description: ['', Validators.required],
    blocNumber: ['1' ,Validators.required],
    blocsForm: this.formBuilder.array([])// Empty array to hold the blocks
  });
  }
  createBlock(): FormGroup {
    return this.formBuilder.group({
      price: ['', Validators.required], // Add price control with validation
      type: ['1', Validators.required] ,// Add type control with validation
      place_number: ['1', Validators.required] // Add type control with validation

    });
  }
  onSubmitStep1():void{
    if (this.parkingDetails.valid) {
      
      const blocNumber = this.parkingDetails.value.blocNumber;
      this.blocsArray = Array.from({ length: blocNumber }, (_, index) => index + 1);
      
      for (let index = 0; index < this.blocsArray.length; index++) {
        const blocksFormArray = this.parkingDetails.get('blocsForm') as FormArray;
        blocksFormArray.push(this.createBlock());
        console.log(this.parkingDetails.value)
      }
     
      this.step += 1 
   
      
      // Proceed to the next step or perform any other actions
    } else {
      // Mark the form controls as touched to display validation errors
      this.parkingDetails.markAllAsTouched();
    }
  }
  handleClickPrev(){
    this.step -= 1
  }
  submitBlocForms(){
    if (this.parkingDetails.valid) {
      this.parkingService.addParking(this.parkingDetails.value).subscribe({
        next: (response) => {
          // Handle the success response here
          console.log('Parking added successfully');
           window.location.href="/responsable/parking_list"        
          // Perform any additional actions, such as displaying a success message or redirecting to another page
        },
        error: (error) => {
          // Handle the error response here
          console.error('Error occurred while adding parking', error);
          // Perform any error handling or display error messages
        }
     
      });
      
    }else{
      console.log('eeroor')
    }
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
    
    
     

    this.map.on('click', this.onMapClick.bind(this));

    

  }
  onMapClick(e: L.LeafletMouseEvent) {
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;
  
   
  
    if (this.marker && this.map.hasLayer(this.marker)) {
      this.map.removeLayer(this.marker);
    }
    const button = document.createElement('button');
    button.innerHTML = 'Confirm';
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', () => {
      // Handle button click event
      this.parkingDetails.patchValue({
        langitude: latitude,
        lantitude: longitude
      });
      // Perform any additional actions you need
  
      // Close the popup
      this.map.closePopup();
    });
    // Create a new marker at the clicked coordinates and add it to the map
    this.marker = L.marker([latitude, longitude]).addTo(this.map).bindPopup(button).openPopup();
  }

  
  
  
  
  
  
}

import { Component , OnInit } from '@angular/core';
import { ParkingService } from 'src/app/service/parking.service';

@Component({
  selector: 'app-list-parking',
  templateUrl: './list-parking.component.html',
  styleUrls: ['./list-parking.component.css']
})
export class ListParkingComponent {
 constructor( private parkingService :ParkingService ){}
 parkings :any[]=[]
ngOnInit(){
  this.parkingService.getParkingList().subscribe((data: any) => {
    this.parkings = data['data'] 
  
  }, (err) => {
    console.log(err);
  });

}
}

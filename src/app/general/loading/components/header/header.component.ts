import { Component ,OnInit } from '@angular/core';
import { ParkingService } from 'src/app/service/parking.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(  private tokenStorage: TokenStorageService ,  private parkingService:ParkingService ){}
  isAuth:boolean = false ;
  user:any = false ;
  listR : any [] =[]
   code_reservation : any =""

  ngOnInit(){
    this.isAuth =this.tokenStorage.isLoggedIn() ;
     
    if(this.isAuth){
     this.user = this.tokenStorage.getUser()
    }
    this.parkingService.listReservation().subscribe({
      next:(response :any)=>{
        console.log(response) ;
        this.listR = response
      },
      error:(error:any)=>{
  
      }
    })
  }
  selectedItem(data:any){
   this.code_reservation = data.code_reservation
   console.log( this.code_reservation)
  }
  onLogOut(){
    this.tokenStorage.signOut();
    location.reload()
  }
   
  

}

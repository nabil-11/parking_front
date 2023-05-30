import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord-sidebar',
  templateUrl: './dashbord-sidebar.component.html',
  styleUrls: ['./dashbord-sidebar.component.css']
})
export class DashbordSidebarComponent {
constructor(private router:Router){
}
 goToHome(){
  this.router.navigate(['/'])
  .then(() => {
    window.location.reload();
  });;
 } 
}

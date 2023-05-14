import { Component ,OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(  private tokenStorage: TokenStorageService ){}
  isAuth:boolean = false ;
  user:any = false ;
  
  ngOnInit(){
    this.isAuth =this.tokenStorage.isLoggedIn() ;
     
    if(this.isAuth){
     this.user = this.tokenStorage.getUser()
    }
  }
  onLogOut(){
    this.tokenStorage.signOut();
    location.reload()
  }

}

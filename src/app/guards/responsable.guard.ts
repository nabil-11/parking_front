import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsableGuard implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is authenticated
    const isAuthenticated =  this.tokenStorage.isLoggedIn()
    
    if (isAuthenticated) {
      if( this.tokenStorage.getUser().role_id === 1){
        
        return true; 
      }
      this.router.navigate(['login']);
      return false ;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['login']);
      return false;
    }
  }
}


import { Injectable } from '@angular/core';
import {  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
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
    
    if (!isAuthenticated) {

      return true ;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['']);
      return false;
    }
  }
}


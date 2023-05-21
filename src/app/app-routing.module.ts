import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './general/loading/loading.component';
import { LoginComponent } from './general/login/login.component';
import { RegisterComponent } from './general/register/register.component';
import { ResponsableParkingModule } from './responsableParking/responsable-parking.module';
import { authGuard } from './guards/auth.guard';
import { SearchParkingComponent } from './general/search-parking/search-parking.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to 'home' component
  { path: 'home',  component: LoadingComponent },
  { path: 'login', canActivate:[authGuard], component: LoginComponent },
  { path: 'register', canActivate:[authGuard], component: RegisterComponent },
  { path: 'search',  component: SearchParkingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ResponsableParkingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

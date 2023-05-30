import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticsComponent } from './views/statics/statics.component';
import { LayoutComponent } from './layout/layout.component';
import { AddParkingComponent } from './views/add-parking/add-parking.component';
import { ResponsableGuard } from '../guards/responsable.guard';
import { ListParkingComponent } from './views/list-parking/list-parking.component';
import { AddEmployerComponent } from './views/add-employer/add-employer.component';

const routes: Routes = [
 {path:"responsable" ,  component:LayoutComponent,children:[
  { path: '', redirectTo: 'statics', pathMatch: 'full' },
  {path : "statics" , component:StaticsComponent } ,
  {path : "add_parking" , component:AddParkingComponent } ,
  {path : "parking_list" , component:ListParkingComponent }  ,
  {path :"add_employer" , component:AddEmployerComponent }
 

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableParkingRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableParkingRoutingModule } from './responsable-parking-routing.module';
import { StaticsComponent } from './views/statics/statics.component';
import { LayoutComponent } from './layout/layout.component';
import { DashbordHeaderComponent } from './components/dashbord-header/dashbord-header.component';
import { DashbordSidebarComponent } from './components/dashbord-sidebar/dashbord-sidebar.component';
import { DashbordToolbarComponent } from './components/dashbord-toolbar/dashbord-toolbar.component';
import { AddParkingComponent } from './views/add-parking/add-parking.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ListParkingComponent } from './views/list-parking/list-parking.component';




@NgModule({
  declarations: [
    LayoutComponent,
    DashbordHeaderComponent,
    DashbordSidebarComponent,
    DashbordToolbarComponent,
    AddParkingComponent,
    MapComponent,
    ListParkingComponent
  ],
  imports: [
    CommonModule,
    ResponsableParkingRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    HttpClientModule ,
    LeafletModule
  ]
})
export class ResponsableParkingModule { }

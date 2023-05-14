import { Component,OnInit } from '@angular/core';
import { TypeAbonnementService } from 'src/app/service/type-abonnement.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
constructor(private type_ab:TypeAbonnementService){}
ngOnInit(){
this.type_ab.showType_abonnement().pipe().subscribe({
  next:(data)=>{ console.log(data)},
  error:(error)=>{ console.log(error)}
})
}
}

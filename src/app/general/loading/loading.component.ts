import { Component,OnInit } from '@angular/core';
import { TypeAbonnementService } from 'src/app/service/type-abonnement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
   cardForm!: FormGroup;

constructor(private type_ab:TypeAbonnementService , private formBuilder: FormBuilder){}

ngOnInit(){


this.type_ab.showType_abonnement().pipe().subscribe({
  next:(data)=>{ console.log(data)},
  error:(error)=>{ console.log(error)}
})

this.cardForm = this.formBuilder.group({
  cardName: ['', Validators.required],
  cardNumber: ['', Validators.required],
  cardExpiryMonth: ['', Validators.required],
  cardExpiryYear: ['', Validators.required],
  cardCvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
  saveCard: [true]
});
}
  // Implement your form submission logic here
  submitFormAnnual() {
    if (this.cardForm.valid) {
      // Form is valid, perform submission
      this.type_ab.addAbonnement(this.cardForm.value,2).subscribe({
        next(response:any) {
          location.reload() ;
        },
        error(error:any) {

        }
      }) 
       }
  }
}


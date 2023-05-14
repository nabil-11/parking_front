import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm !: FormGroup  ;

  constructor(private formBuilder: FormBuilder , private authService :AuthServiceService ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }
  onSubmit(): void {
  
   
      this.authService.register(this.registrationForm.value).pipe(first())
      .subscribe({
          next: (reponse) => {
            location.href = '/login'
          },
          error: error => {
            console.log(error)
          }
      });
   

 
  }
}

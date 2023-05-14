import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 

  constructor(private formBuilder: FormBuilder , private authService:AuthServiceService , private tokenStorage: TokenStorageService ,private router :Router ,private toastr: ToastrService) {}
  authForm: FormGroup = new FormGroup({});
  loading:boolean=false
  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    this.loading = true
    this.toastr.success('Success message', 'Title');
    this.authService.login(this.authForm.value).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
  this.router.navigate(['responsable'])
  this.loading = false
      },
      error: err => {
        this.loading = false
      }
    });

  }


}

import { Component, Inject, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ReactiveFormsModule,HttpClientModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { 
 isSuccess:boolean=false;
 msgError:string="";
isLoading:boolean=false;
constructor(private _AuthService:AuthService,private _Router:Router){  
}

loginForm: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
});

loginSubmit(): void {
  this.isLoading=true;
  if (this.loginForm.valid) {
    this._AuthService.setLoginForm (  this.loginForm.value).subscribe({
      next:(res) => {
        console.log(res);
        this.isLoading=false;
        if(res.message=='success'){
          this.isSuccess=true;

          localStorage.setItem('userToken',res.token);
          //decode token
          this._AuthService.saveUserData();
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 1000);            
        }
        
      },
      error: (err:HttpErrorResponse) => {
        this.msgError=err.error.message;
        console.log(err);
        this.isLoading=false;
      },
    });
  }
  else { 
    this.loginForm.setErrors({mismatch:true});
    this.loginForm.markAllAsTouched();
    this.isLoading=false;    
  }
 
}


}
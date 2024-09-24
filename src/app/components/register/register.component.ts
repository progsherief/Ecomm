import { Component, Inject, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   //private  _AuthService = Inject(AuthService);
   isSuccess:boolean=false;
   msgError:string="";
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService,private _Router:Router){
    // ,private _FormBuilder:FormBuilder
  }

  // registerForm:FormGroup=this._FormBuilder.group({
  //   name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //   email:[null,[Validators.required,  Validators.email]],
  //   phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],

  //   password:[null,[Validators.required, [Validators.required, Validators.pattern(/^\w{6,}$/)]] ],
  //   rePassword:[null],
  // },this.confirmPassword);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null)
  }, this.confirmPassword);

  registerSubmit(): void {
    this.isLoading=true;
    if (this.registerForm.valid) {
      this._AuthService.setRegisterForm (  this.registerForm.value).subscribe({
        next:(res) => {
          console.log(res);
          this.isLoading=false;
          if(res.message=='success'){
            this.isSuccess=true;
            setTimeout(() => {
              this._Router.navigate(['/login']);
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
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
      this.isLoading=false;
      // console.log('invalid inputs') 
    }
   
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    }
    else {
      return { mismatch: true };
    }
  }

}

// [disabled]="registerForm.invalid || isLoading"  
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderValue } from 'http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})

export class ForgotpasswordComponent {
  step: number = 1;
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{5}/)])
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });

  constructor(private _AuthService: AuthService, private _Router: Router) { }
  ForgotPassword(): void {
   let email= this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(email);
    this._AuthService.ForgotPassword(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') { this.step = 2; }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  VerifyResetCode(): void {
    this._AuthService.VerifyResetCode(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') { this.step = 3; }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ResetPassword(): void {
    this._AuthService.ResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

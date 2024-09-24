import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterEvent } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any = null;
  private readonly _Httpclient = inject(HttpClient);
  private readonly _Router = inject(Router);
  setRegisterForm(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseurl}/api/v1/auth/signup`, data);
  }

  setLoginForm(data: object): Observable<any> {
    return this._Httpclient.post(`${environment.baseurl}/api/v1/auth/signin`, data);
  }
  // const decoded = jwtDecode(res.token);
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }

  }

  ForgotPassword(data:object):Observable<any>{
    return this._Httpclient.post(`${environment.baseurl}/api/v1/auth/forgotPasswords`, data);
  }

  VerifyResetCode(data:object):Observable<any>{
    return this._Httpclient.post(`${environment.baseurl}/api/v1/auth/verifyResetCode`, data);
  }
  
  ResetPassword(data:object):Observable<any>{
    return this._Httpclient.put(`${environment.baseurl}/api/v1/auth/resetPassword`, data);
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

}
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  // private readonly _HttpClient = Inject(HttpClient);
  
  constructor(private  _HttpClient:HttpClient ) { }

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/products`);
  }

  getSpecificProduct(id:string|null): Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/products/${id}`);
  }

  
}

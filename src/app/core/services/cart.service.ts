import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  // myHeaders: any = { token: localStorage.getItem('userToken') };
  // countNumber: BehaviorSubject<number>=new BehaviorSubject(0);
  countNumber:WritableSignal<number>=signal(0);
  constructor(private _HttpClient: HttpClient) { }

  AddProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseurl}/api/v1/cart`,
      { productId: id }
    );
  }
  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/cart`
    )
  }

  RemoveSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseurl}/api/v1/cart/${id}`
    )
  }

  UpdateCartProdQty(id:string,newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseurl}/api/v1/cart/${id}`,
      { count: newCount }
    )
  }

  ClearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseurl}/api/v1/cart`);
  }
  
}

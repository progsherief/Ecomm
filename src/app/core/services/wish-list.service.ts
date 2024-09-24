import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WishListService {
  countNumber: WritableSignal<number> = signal(0);
  constructor(private _HttpClient: HttpClient) { }

  AddProductToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseurl}/api/v1/wishlist`,
      { productId: id }
    );
  }
  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseurl}/api/v1/wishlist`
    )
  }

  RemoveSpecificWishlistItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseurl}/api/v1/wishlist/${id}`
    )
  }

}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ordersService {

  constructor(private _HttpClient: HttpClient) { }

  checkOut(cartId: string|null,shippingDetails:object): Observable<any> {
    return this._HttpClient.post(`${environment.baseurl}/api/v1/orders/checkout-session/${cartId}?url=${environment.serverUrl}`,
      {"shippingAddress": shippingDetails}
    );
  }


}

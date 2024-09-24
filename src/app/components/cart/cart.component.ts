import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  cartDetails:ICart={} as ICart;

  constructor(private _CartService: CartService) { }
  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => { 
        this.cartDetails=res.data;
        console.log(res) },
      error: (err) => { },
    });
  }

  removeItem(id: string): void {
   this._CartService.RemoveSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails=res.data;
        // this._CartService.countNumber.next(res.numOfCartItems);
        this._CartService.countNumber.set(res.numOfCartItems);
      },
      error: (err) => { console.log(err) }
    });
  };

  UpdateCartProdQty(id:string,count: number): void {
    this._CartService.UpdateCartProdQty(id,count).subscribe({
       next: (res) => {
         console.log(res);
         this.cartDetails=res.data;
       },
       error: (err) => { console.log(err) }
     });
   };

   ClearCart():void{
    this._CartService.ClearCart().subscribe({
      next: (res) => {
        console.log(res);
        if(res.message=='success'){
        this.cartDetails={} as ICart;
        // this._CartService.countNumber.next(0);
        this._CartService.countNumber.set(0);
      }
      },
      error: (err) => { console.log(err) }
    });
  };

}

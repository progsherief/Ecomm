import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wish-list.service';
import { IWishList } from '../../core/interfaces/iwish-list';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})

export class WishlistComponent implements OnInit {
  wishListDetails: IWishList[] = [];

  constructor(private _WishListService: WishListService, private _CartService: CartService,private _toastr: ToastrService) { }
  ngOnInit(): void {
    this.GetLoggedUserWishlist();
  }

  GetLoggedUserWishlist() {
    this._WishListService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishListDetails = res.data;
        console.log(this.wishListDetails);
      },
      error: (err) => { },
    });
  }

  removeItem(id: string): void {
    this._WishListService.RemoveSpecificWishlistItem(id).subscribe({
      next: (res) => {
        this._toastr.success(res.message,'freshCart');
        // this.wishListDetails = res.data;
        this.GetLoggedUserWishlist()

        console.log(this.wishListDetails);
        
      },
      error: (err) => { console.log(err) }
    });
  };


  AddToCart(id: string): void {
    this._CartService.AddProductToCart(id).subscribe({
      next: (res) => {
        this._toastr.success(res.message,'freshCart');       
        this._CartService.countNumber.set(res.numOfCartItems);
        
        this._WishListService.RemoveSpecificWishlistItem(id).subscribe({
          next: (res) => {            
            this.GetLoggedUserWishlist()    
          },
          error: (err) => { console.log(err) }
        });
      },
      error: (err) => { console.log(err) }
    });

  };


}


import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription, Subject } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wish-list.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule, RouterLink, SalePipe, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  searchInput: string = "";

  private destroy$: Subject<boolean> = new Subject<boolean>();
  productSub!: Subscription;
  addToCartSub!: Subscription;
  getWhish!: Subscription;
  removeWhish!: Subscription;
  AddProductToWishlist!: Subscription;

  productsList: IProduct[] = [];
  whishIdList: string[] = [];

  constructor(private _ChangeDetectorRef: ChangeDetectorRef,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _WishListService: WishListService,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }
  checkWhichExist(id: string): boolean {
    return this.whishIdList.includes(id);
  }
  ngOnInit(): void {
    this.getWhish = this._WishListService.GetLoggedUserWishlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.whishIdList = res.data.map(x => x.id);
          //localStorage.setItem('whishIdList', res.data.map(x => x.id));
          //this.whishIdList=
        },
        error: (err) => {
          this._toastr.error('Failed to fetch wishlist', 'Error');
          console.error(err);
        }
      });
    // alert('fav');
    this.productSub = this._ProductsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.productsList = res.data;
          // this.productsList =  res.data.map(item => {
          //   if (this.whishIdList.includes(item.id)) {
          // //    alert('fav');
          //     item.fav = true;
          //     this._ChangeDetectorRef.detectChanges(); 
          //   }
          //   return item;
          // });
        },
        error: (err) => {
          this._toastr.error('Failed to fetch products', 'Error');
          console.error(err);
        }
      });
  }

  AddToCart(id: string): void {
    this.addToCartSub = this._CartService.AddProductToCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this._toastr.success(res.message, 'Cart Update');
          this._CartService.countNumber.set(res.numOfCartItems);
          this.removeFromWhishList(id);
        },
        error: (err) => {
          this._toastr.error('Failed to add product to cart', 'Error');
          console.error(err);
        }
      });
  }

  AddOrRemoveToWishList(id: string): void {    
    if (this.whishIdList.includes(id)) {//Remove from Wishlist
      this.removeFromWhishList(id);

    } else { // Add to Wishlist
      this.AddProductToWishlist = this._WishListService.AddProductToWishlist(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this._toastr.success(res.message, 'Wishlist Update');
            this.whishIdList.push(id);           
          },
          error: (err) => {
            this._toastr.error('Failed to add to wishlist', 'Error');
            console.error(err);
          }
        });
    }
  }

 removeFromWhishList(id:string){
  this.removeWhish = this._WishListService.RemoveSpecificWishlistItem(id)
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: (res) => {
      this._toastr.success(res.message, 'Wishlist Update');      
      const indexToRemove = this.whishIdList.indexOf(id);

      // If the item exists in the array, remove it
      if (indexToRemove > -1) {
        this.whishIdList.splice(indexToRemove, 1);
      }
    },
    error: (err) => {
      this._toastr.error('Failed to remove from wishlist', 'Error');
      console.error(err);
    }
  });
 }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
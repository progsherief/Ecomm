import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ICategory, IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
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
import { ProductComponent } from "../product/product.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SalePipe, TermtextPipe, SearchPipe, FormsModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  // private  _ProductsService=inject(ProductsService);
  searchInput: string = "";

  customOptionsMain: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    rtl:true,
    nav: false
  }

  customOptionsCatg: OwlOptions = {
    loop: true,
    autoplay: false,
    // autoplayTimeout:2000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false,
    rtl:true
  }

  productSub!: Subscription;
  categtSub!: Subscription;
  addToCartSub!: Subscription;

  productsList: IProduct[] = [];
  categList: ICategory[] = [];


  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService,
    private _CartService: CartService,private _toastr: ToastrService,private _NgxSpinnerService:NgxSpinnerService) {
  }

  ngOnInit(): void {
    // this._NgxSpinnerService.show('loading-localImg');
    //categories
    this.categtSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categList = res.data;
        // this._NgxSpinnerService.hide('loading-localImg');
      },
      error: (err) => { console.log(err) }
    });


    this.productSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {

        this.productsList = res.data;
        console.log(this.productsList);

      },
      error: (err) => {
        // console.log(err)
      },
    });
  }

  AddToCart(id: string): void {
    this.addToCartSub = this._CartService.AddProductToCart(id).subscribe({
      next: (res) => {
        this._toastr.success(res.message,'freshCart');
       // this._CartService.countNumber.next(res.numOfCartItems);
       this._CartService.countNumber.set(res.numOfCartItems);
        console.log(res.data);
      },
      error: (err) => { console.log(err) }
    });

  };

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productSub!.unsubscribe();
    this.categtSub!.unsubscribe();
   // this.addToCartSub!.unsubscribe();
  }


}

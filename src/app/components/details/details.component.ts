import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit{
  productSub!: Subscription;
  product:IProduct|null=null;
  // product:IProduct={} as IProduct;
constructor(private readonly _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService){}
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{ 
      let productId=p.get('id');
      this.productSub=this._ProductsService.getSpecificProduct(productId).subscribe({
        next:(res)=>{
         this.product=res.data;
        }
      })
    }
  });
}
ngOnDestroy(): void { 
  this.productSub!.unsubscribe();
}
}

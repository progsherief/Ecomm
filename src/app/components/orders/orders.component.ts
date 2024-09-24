import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ordersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,private _OrdersService:ordersService) { }
  cartId: string | null = "";
  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })

  orderSubmit(): void {
    this._OrdersService.checkOut(this.cartId,this.orders.value).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          //res.session.url;
         window.open(res.session.url,'_self')
        }
        console.log(res)
      },
      error:(err)=>{console.log(err)},
    });

    console.log(this.orders.value);
    console.log( this.cartId);
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      }
    });
  }

}

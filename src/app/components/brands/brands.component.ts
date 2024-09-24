import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IBrand, ICategory, ICatg } from '../../core/interfaces/iproduct';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})

export class BrandsComponent implements OnInit {
  brandList: WritableSignal<IBrand[]> = signal([]);
  private readonly _BrandsService = inject(BrandsService);
  
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandList.set(res.data);
        console.log(res);
      }
    });
  }

}


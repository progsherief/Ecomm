import { Component, inject, Inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory, ICatg } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit {
  categList: WritableSignal<ICatg[]> = signal([]);
  private readonly _CategoriesService = inject(CategoriesService);
  
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categList.set(res.data);
        console.log(res);
      }
    });
  }

}

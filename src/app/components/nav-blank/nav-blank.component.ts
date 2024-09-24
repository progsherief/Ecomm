import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);
  private readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);
  // countNumber: number = 0;
  countNumber :Signal<number>= computed(() => this._CartService.countNumber());//computed signal
  changeLang(lang: string): void {

    this._MytranslateService.changeLang(lang);
  }

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        // this._CartService.countNumber.next(res.numOfCartItems);
        this._CartService.countNumber.set(res.numOfCartItems);
      }
    });

    // this._CartService.countNumber.subscribe({
    //   next: (data) => {
    //     this.countNumber = data;
    //   }
    // })
  }

}

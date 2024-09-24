import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
      { path: 'forgot', loadComponent: () => import('./components/forgotpassword/forgotpassword.component').then(c => c.ForgotpasswordComponent) }
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
      { path: 'carts', loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent) },
      { path: 'whishlist', loadComponent: () => import('./components/wishlist/wishlist.component').then(c => c.WishlistComponent) },
      { path: 'products', loadComponent: () => import('./components/product/product.component').then(c => c.ProductComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then(c => c.BrandsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'allorders', loadComponent: () => import('./components/allorders/allorders.component').then(c => c.AllordersComponent) },
      { path: 'orders/:id', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent) }
    ]
  },
  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then(c => c.NotfoundComponent) }
];

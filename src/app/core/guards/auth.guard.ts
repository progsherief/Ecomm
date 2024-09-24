import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);
  if (typeof localStorage !== 'undefined') {//for not read in rss or use isplateformid(_plateformid) or afterRender  and afterNextRender()
    if (localStorage.getItem('userToken') !== null) {

      return true;
    }
    else {
      _Router.navigate(['/login']);
      return false;
    }
  }
  else {
    _Router.navigate(['/login']);
    return false;
  }
};




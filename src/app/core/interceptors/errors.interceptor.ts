import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _toasterSerice=inject(ToastrService);

  return next(req).pipe(catchError((err)=>{
    _toasterSerice.error(err.error.message,'FreshCart')
    console.log('interceptores',err.error.message);
    return throwError(()=>err)
  }
  ));


};

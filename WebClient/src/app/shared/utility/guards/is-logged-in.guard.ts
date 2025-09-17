import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/api/account/auth.service";

export const isLoggedInGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn
  if (isLoggedIn) return true;

  inject(ToastrService).error('You need to login to go there', 'Unauthorized');
  return inject(Router).createUrlTree(['/login']);

};

import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../../services/api/account/auth.service";

export const isLoggedInGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn
  if (isLoggedIn) return true;

  return inject(Router).createUrlTree(['/login'], {
    queryParams: { showPopup: true }
  });

};

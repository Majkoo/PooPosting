import {Routes} from "@angular/router";
import {isLoggedInGuard} from "../../shared/utility/guards/is-logged-in.guard";

export const TABLE_LAYOUT_ROUTES: Routes = [
  {
    path: 'admin-page',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('../../views/admin-page/admin-page.component')
      .then(m => m.AdminPageComponent)
  },

]

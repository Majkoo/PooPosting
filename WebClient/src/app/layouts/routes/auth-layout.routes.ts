import {Routes} from "@angular/router";

export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: "register",
    loadComponent: () => import('../../views/register/register.component')
      .then(c => c.RegisterComponent)
  },
  {
    path: "login",
    loadComponent: () => import('../../views/login/login.component')
      .then(c => c.LoginComponent)
  },
]

import {Routes} from "@angular/router";
import {isLoggedInGuard} from "../../shared/utility/guards/is-logged-in.guard";

export const APP_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../../views/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'account/:id',
    loadComponent: () => import('../../views/account/account.component')
      .then(m => m.AccountComponent)
  },
  {
    path: 'add-post',
    canActivate: [isLoggedInGuard],
    loadChildren: () => import('../../views/add-post/add-post.module')
      .then(m => m.AddPostModule)
  },
  {
    path: 'trending',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('../../views/trending/trending.component')
      .then(m => m.TrendingComponent)
  },
  {
    path: 'liked',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('../../views/liked/liked.component')
      .then(m => m.LikedComponent)
  },
  {
    path: 'settings',
    canActivate: [isLoggedInGuard],
    loadComponent: () => import('../../views/settings/settings.component')
      .then(m => m.SettingsComponent)
  },
  // {
  //   path: "search",
  //   loadChildren: () => import('../view/search/feature/search-shell/search-shell.module')
  //     .then(m => m.SearchShellModule)
  // },
  // {
  //   path: "popular",
  //   loadChildren: () => import('../view/popular/feature/popular-shell/popular-shell.module')
  //     .then(m => m.PopularShellModule)
  // },
  // {
  //   path: "tos",
  //   loadChildren: () => import('../view/terms-of-services/feature/tos-shell/tos-shell.module')
  //     .then(m => m.TosShellModule)
  // },
  // {
  //   path: "picture",
  //   loadChildren: () => import('../view/picture/feature/picture-shell/picture-shell.module')
  //     .then(m => m.PictureShellModule)
  // },

]

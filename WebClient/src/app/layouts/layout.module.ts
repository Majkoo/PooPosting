import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';
import { RouterModule } from "@angular/router";
import { HeaderComponent } from '../shared/components/header/header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import {CreateAccountBannerComponent} from "../views/home/create-account-banner/create-account-banner.component";
import {QueryModalComponent} from "../shared/components/query-modal/query-modal";
import {ToastModule} from "primeng/toast";
import {provideToastr} from "ngx-toastr";
import {DialogService} from "primeng/dynamicdialog";
import {UrlTransformModule} from "../shared/utility/pipes/url-transform/url-transform.module";
import { TableLayoutComponent } from './table-layout/table-layout.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent,
    HeaderComponent,
    NavComponent,
    TableLayoutComponent
  ],
    imports: [
      CommonModule,
      RouterModule,
      NgOptimizedImage,
      CreateAccountBannerComponent,
      QueryModalComponent,
      ToastModule,
      UrlTransformModule,
    ],
  exports: [
    AppLayoutComponent,
    AuthLayoutComponent,
    ErrorLayoutComponent,
    HeaderComponent
  ],
  providers: [
    provideToastr(),
    {
      provide: DialogService,
      useClass: DialogService
    }
  ]
})
export class LayoutModule { }

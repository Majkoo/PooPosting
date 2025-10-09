import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import {RouterModule} from "@angular/router";
import {LayoutModule} from "./layouts/layout.module";
import {NgOptimizedImage} from "@angular/common";
import {UrlTransformModule} from "./shared/utility/pipes/url-transform/url-transform.module";
import {MessageService} from "primeng/api";
import {TokenInterceptorService} from "./shared/utility/interceptors/token-interceptor.service";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { EasterEggComponent } from './shared/components/easter-egg/easter-egg.component';
import { TextButtonComponent } from './shared/components/text-button/text-button.component';
import {SocialLoginModule,SocialAuthServiceConfig,GoogleLoginProvider, FacebookLoginProvider,} from "@abacritt/angularx-social-login";
import { HttpErrorInterceptorService } from './shared/utility/interceptors/http-error-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    LayoutModule,
    NgOptimizedImage,
    UrlTransformModule,
    TextButtonComponent,
    EasterEggComponent,
    SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    {
      provide: MessageService,
      useClass: MessageService
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '305815243977-oaueknb64qadmfsapu7vij2b6am315n3.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

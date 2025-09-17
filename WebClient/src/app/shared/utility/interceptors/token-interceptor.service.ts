import {inject, Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject, finalize} from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import {AuthData} from "../models/authData";
import {AuthService} from "../../../services/api/account/auth.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userData = this.authService.getJwtData();

    if (userData && userData.authToken) {
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.authToken}`
        }
      });

      return next.handle(tokenizedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handle401Error(req, next);
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((authData: AuthData) => {
          if (authData?.refreshToken) {
            this.refreshTokenSubject.next(authData.refreshToken);
            return next.handle(this.addToken(request, authData.refreshToken));
          }

          this.authService.forgetAuthData();
          return throwError(() => new Error('Token refresh failed, redirect to login.'));
        }),
        catchError(() => {
          this.authService.forgetAuthData();
          return throwError(() => new Error('Token refresh failed, redirect to login.'));
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap(() => next.handle(this.addToken(request, this.authService.getJwtData()!.authToken)))
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

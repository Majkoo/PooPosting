import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from "@angular/router";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export const retryCount = 2;
export const delayMs = 2000;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    ) { }
  intercept(req: HttpRequest<HttpRequest<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
    // return next.handle(req)
    //   .pipe(
    //     retryWhen((error) => {
    //       return error.pipe(
    //         mergeMap((error, index) => {
    //           if ((index < retryCount) && !((req.method === "GET") && (error.status === 404))) return of(error).pipe(delay(delayMs));
    //           throw error;
    //         })
    //       );
    //     }),
    //     catchError((error: HttpErrorResponse) => {
    //       return this.handleError(error.status, req, error);
    //     })
    //   );
  }

  // private handleError(status: number, req: HttpRequest<any>, error: HttpErrorResponse) {
  //   this.message.clear();
  //   switch (status) {
  //     case (401): {
  //       return throwError(() => {
  //         if (error.error) {
  //           if (error.error.contains("auth token")) {
  //             return error;
  //           }
  //         }
  //         this.message.add({
  //           severity:'error',
  //           summary: 'Niepowodzenie',
  //           detail: 'Nie udało się wykonać operacji. Do jej wykonania konieczne jest zalogowanie się.'
  //         });
  //         return error;
  //       });
  //     }
  //     case (403): {
  //       return throwError(() => {
  //         this.message.add({
  //           severity:'error',
  //           summary: 'Niepowodzenie',
  //           detail: 'Nie udało się wykonać operacji. Nie masz uprawnień.'
  //         });
  //         return error;
  //       });
  //     }
  //     case (404): {
  //       return throwError(() => {
  //         if (req.method !== "GET") {
  //           this.message.add({
  //             severity:'warn',
  //             summary: 'Niepowodzenie',
  //             detail: 'Nie udało się wykonać operacji. Zasób jest niedostępny. Prawdopodobnie został usunięty lub ukryty.'
  //           });
  //           return error;
  //         }
  //         return error;
  //       })
  //     }
  //     default: {
  //       if (req.url.endsWith('/picture/create')) {
  //         this.message.add({
  //           severity:'error',
  //           summary: 'Niepowodzenie',
  //           detail: 'Nie udało się zapostować obrazka. Przepraszamy za utrudnienia.'
  //         });
  //       }
  //       if (status.toString().startsWith("5")) {
  //         return throwError(() => {
  //           this.router.navigate(['/error500']);
  //           return error;
  //         });
  //       }
  //       this.message.add({
  //         severity:'error',
  //         summary: 'Niepowodzenie',
  //         detail: 'Coś poszło nie tak. Przeraszamy za utrudnienia.'
  //       });
  //       return throwError(() => {return error;});
  //     }
  //   }
  // }

}

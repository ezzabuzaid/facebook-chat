import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, retryWhen, catchError } from 'rxjs/operators';
import { TokenService, ApplicationConstants, RoutingConstants } from '@core/helpers';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';


export class ErrorInterceptor implements HttpInterceptor {

  // constructor(private router: Router,
  //   private tokenService: TokenService,
  //   private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
      // .pipe(
      //   // retry(3),
      //   catchError((event: HttpErrorResponse) => {
      //     log.debug('an error was caught', event);

      //     if (event instanceof HttpErrorResponse) {
      //       switch (event.status) {
      //         case 401:
      //           if (this.tokenService.isLogged) {
      //             this.userService.logout()
      //               .subscribe(() => {
      //                 this.router.navigate(['/', RoutingConstants.LOGIN]);
      //               }, () => location.reload());
      //           }
      //           break;
      //         case 500:
      //           this.router.navigate(['/', RoutingConstants.SERVER_ERROR]);
      //           break;
      //         case 404:
      //           this.router.navigate(['/', RoutingConstants.NOT_FOUND]);
      //           break;
      //         case 403:
      //           this.router.navigate(['/', RoutingConstants.FOEBIDDEN]);
      //           break;
      //         default:
      //           break;
      //       }
      //     }
      //     return throwError(event.error);
      //   })
      // );
  }
}

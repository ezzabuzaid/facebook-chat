import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '@shared/user';
import { Constants } from '@core/constants';
import { MatSnackBar } from '@angular/material';


export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        // retry(3),
        catchError((event: HttpErrorResponse) => {
          if (event instanceof HttpErrorResponse) {
            switch (event.status) {
              case 401:
                this.userService.logout();
                break;
              case 500:
                this.snackbar.open(`An error occurred to the server, please contact the maintenance`);
                break;
              case 404:
                // NOTE: as development this shouldn't return
                return throwError('ENDPOINT NOT FOUND');
              case 403:
                this.router.navigate(['/', Constants.Routing.FOEBIDDEN]);
                break;
              default:
                break;
            }
          }
          return throwError(event.error);
        })
      );
  }
}

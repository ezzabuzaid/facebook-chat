import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBarRef } from '@angular/material';
import { _extract } from '@shared/common';
import { CustomHttpHeaders } from '@core/helpers';
import { FormWidgetService } from '@widget/form';
import { SnackbarService, SnackbarViewComponent } from '@widget/snackbar';

@Injectable()
export class UiInterceptor implements HttpInterceptor {
  message;
  showSnackbar = true;
  formUi = false;
  constructor(
    private snackbar: SnackbarService,
    private translateService: TranslateService,
    private formWidgetService: FormWidgetService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO add a progress bar on top of `toolbar`

    if (JSON.parse(req.headers.get(CustomHttpHeaders.DISABLE_SNACKBAR))) {
      this.showSnackbar = false;
    }

    if (JSON.parse(req.headers.get(CustomHttpHeaders.ENABLE_FORM_UI))) {
      this.formUi = true;
      this.formWidgetService.progressBar = true;
    }

    const method = req.method;
    let snackbarRef: MatSnackBarRef<SnackbarViewComponent> = null;
    if (this.showSnackbar && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
      const translated = this.translateService.instant(_extract('request_is_proccessing'));
      Promise.resolve(null).then(() => snackbarRef = this.snackbar.open(translated, { duration: 500000 }));
    }
    return next.handle(req.clone())
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          event => {
            if (event instanceof HttpErrorResponse) {
              this.message = event.error;
            }
          }),
        finalize(() => {
          if (this.showSnackbar && snackbarRef) {
            this.snackbar.modifyInstance({ message: req.urlWithParams });
            setTimeout(() => {
              snackbarRef.dismiss();
            }, 3000);
          }
          if (this.formUi) {
            this.formWidgetService.progressBar = false;
            this.formUi = false;
          }
        }),
      );
  }
}

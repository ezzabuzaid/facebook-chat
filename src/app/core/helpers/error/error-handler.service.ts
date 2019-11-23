import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '../logger/logger.service';

const log = new Logger('GlobalErrorHandler');

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {
        // const notifier = this.injector.get(NotificationService);

        if (error instanceof HttpErrorResponse) {

        } else {

        }
        // log.info('Error reporter', error);
        // log.error(error);
        throw error;
    }
}

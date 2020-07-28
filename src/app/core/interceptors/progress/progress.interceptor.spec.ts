import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUtils } from '@core/helpers/utils';
import { ProgressBarManager } from '@widget/progress-bar';
import { assertGet, assertPost, apiUrl } from 'test/fixture';
import { ProgressInterceptor } from './progress.interceptor';

describe(`ProgressInterceptor`, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ProgressBarManager,
                    useValue: jasmine.createSpyObj('ProgressBarManager', {
                        show: jasmine.createSpy(),
                        hide: jasmine.createSpy(),
                    })
                },
                {
                    provide: MatSnackBar,
                    useValue: jasmine.createSpyObj('MatSnackBar', {
                        open: jasmine.createSpy(),
                    })
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ProgressInterceptor,
                    multi: true
                },
            ],
        });

    });

    it('should show the progress bar when PROGRESS_BAR flag is true and the request is not GET', fakeAsync(() => {
        // Arrange
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        TestBed.inject(HttpClient)
            .configure({ PROGRESS_BAR: true })
            .post(apiUrl(urlPortion), null)
            .subscribe();

        flush();

        // Assert
        assertPost(urlPortion, null);
        expect(TestBed.inject(ProgressBarManager).show).toHaveBeenCalled();
    }));


    it('should not show the progress bar if the method is GET', fakeAsync(() => {
        // Arrange
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        TestBed
            .inject(HttpClient)
            .get(apiUrl(urlPortion))
            .subscribe();
        flush();

        // Assert
        assertGet(urlPortion, null);
        expect(TestBed.inject(ProgressBarManager).show).toHaveBeenCalledTimes(0);
    }));

    it('should hide the progress bar after resolving the response regardless of it is nature', fakeAsync(() => {
        // Arrange
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        TestBed
            .inject(HttpClient)
            .get(apiUrl(urlPortion))
            .subscribe();
        flush();

        // Assert
        assertGet(urlPortion, null);
        expect(TestBed.inject(ProgressBarManager).hide).toHaveBeenCalled();
    }));

    it('should show the snackbar if request returned as an exception', fakeAsync(() => {
        // Arrange
        const urlPortion = AppUtils.generateAlphabeticString();

        const message = AppUtils.generateAlphabeticString();

        // Act
        TestBed.inject(HttpClient)
            .get(urlPortion)
            .subscribe(() => { }, () => { });
        flush();

        // Assert
        TestBed.inject(HttpTestingController)
            .expectOne(urlPortion)
            .flush({ message: message }, new HttpErrorResponse({ status: 400, statusText: 'Bad Request', }));
        expect(TestBed.inject(MatSnackBar).open).toHaveBeenCalledWith(message);
    }));

    afterAll(() => {
        TestBed.inject(HttpTestingController).verify();
    });

});

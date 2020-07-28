import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AppUtils } from '@core/helpers/utils';
import { environment } from '@environments/environment';
import { apiUrl } from 'test/fixture';
import { UrlInterceptor } from './url.interceptor';

describe(`UrlInterceptor`, () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: UrlInterceptor,
                    multi: true
                },
            ],
        });
    });


    it('should prefix the incoming url with the url from the environment when DEFAULT_URL flag is true', fakeAsync(() => {
        // Arrange
        const http = TestBed.inject(HttpClient);
        const httpMock = TestBed.inject(HttpTestingController);
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        http.configure({ DEFAULT_URL: true }).get(urlPortion).subscribe();
        flush();

        // Assert
        const { request } = httpMock.expectOne(environment.endpointUrl + urlPortion);
        expect(request.url).toMatch(apiUrl(urlPortion));
    }));

    it('should send the request as it is without any modification when DEFAULT_URL flag is false', fakeAsync(() => {
        // Arrange
        const http = TestBed.inject(HttpClient);
        const httpMock = TestBed.inject(HttpTestingController);
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        http.configure({ DEFAULT_URL: false }).get(urlPortion).subscribe();
        flush();

        // Assert
        const { request } = httpMock.expectOne(urlPortion);
        expect(request.url).toMatch(urlPortion);
    }));

    afterAll(() => {
        TestBed.inject(HttpTestingController).verify();
    });

});

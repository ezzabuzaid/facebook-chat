import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppUtils } from '@core/helpers/utils';
import { environment } from '@environments/environment';
import { RequestOptionsModule } from '@ezzabuzaid/ngx-request-options';
import { IRequestOptions } from '@shared/common';
import { UrlInterceptor } from './url.interceptor';

describe(`UrlInterceptor`, () => {
    // let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RequestOptionsModule.forRoot<IRequestOptions>(),
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: UrlInterceptor,
                    multi: true
                },
            ],
        });


    });


    it('should prefix the incoming url with the url from the environment when DEFAULT_URL flag is true', () => {
        // Arrange
        const http = TestBed.inject(HttpClient);
        const httpMock = TestBed.inject(HttpTestingController);
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        http.configure({ DEFAULT_URL: true }).get(urlPortion).subscribe();

        // Assert
        httpMock.expectOne(environment.endpointUrl + urlPortion);
    });

    it('should send the request as it is without any modification when DEFAULT_URL flag is false', () => {
        // Arrange
        const http = TestBed.inject(HttpClient);
        const httpMock = TestBed.inject(HttpTestingController);
        const urlPortion = AppUtils.generateAlphabeticString();

        // Act
        http.configure({ DEFAULT_URL: false }).get(urlPortion).subscribe();

        // Assert
        httpMock.expectOne(urlPortion);
    });

});

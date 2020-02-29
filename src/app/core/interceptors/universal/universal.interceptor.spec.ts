
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { UniversalInterceptor } from './universal.interceptor';

const configureTestModule = (request: Request) => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, HttpClientTestingModule],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: UniversalInterceptor,
                multi: true
            },
            {
                provide: REQUEST,
                useValue: request
            }
        ]
    });
};

describe(`UniversalInterceptor`, () => {
    const protocol = 'testProtocol';
    const host = 'testHost';

    describe('absolute and protocol-relative url', () => {

        beforeEach(() => {
            configureTestModule({} as Request);
        });

        it('should not change absolute or protocol-relative url', () => {
            const httpClient = TestBed.inject(HttpClient);

            const httpMock = TestBed.inject(HttpTestingController);
            const httpURL = 'http://test.com/api/users';
            httpClient.get(httpURL).subscribe();
            httpMock.expectOne(httpURL);

            const secureURL = 'https://test.com/api/users';
            httpClient.get(secureURL).subscribe();
            httpMock.expectOne(secureURL);

            const protocolRelativeURL = '//test.com/api/users';
            httpClient.get(protocolRelativeURL).subscribe();
            httpMock.expectOne(protocolRelativeURL);
        });
    });

    describe('relative url', () => {
        beforeEach(() => {
            configureTestModule({ protocol, host } as Request);
        });

        it('should update relative URL to absolute', () => {
            const httpClient = TestBed.inject(HttpClient);

            const httpMock = TestBed.inject(HttpTestingController);
            const relative_1 = 'api/users';
            httpClient.get(relative_1).subscribe();
            const absolute_1 = `${protocol}://${host}/${relative_1}`;
            httpMock.expectOne(absolute_1);

            const relative_2 = '/api/accounts';
            httpClient.get(relative_2).subscribe();
            const absolute_2 = `${protocol}://${host}${relative_2}`;
            httpMock.expectOne(absolute_2);
        });


    });
});